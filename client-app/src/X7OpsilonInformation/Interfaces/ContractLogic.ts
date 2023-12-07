import { debug } from "console";
import { ethers } from "ethers";
import { v4 as uuidv4 } from 'uuid';

import {
    DirectoryBlock, FileBlock, DirectoryInfo, DirectoryDataType, TransactionResponse, X7FileProcess,
    CreationStatus, UploadResult
} from "./ContractLogicTypes";

export default class ContractLogic {
    contract: ethers.Contract;
    constructor(contract: ethers.Contract) {
        this.contract = contract;
    }

    // async testGet() {
    //     var file = new Blob(['hello from outside']);
    //     let dataBytes = await this.fileToBytes(file);
    //     let data = await this.contract.testGet(dataBytes);

    //     console.log(await this.bytesToFile(data).text());
    // }

    async getRoot() {
        let result = await this.contract.getRoot();
        if (result[0]) {
            console.log(null);
            return null;
        }
        else {
            return {
                Id: result[1][0],
                ParentId: result[1][1],
                Name: result[1][2],
                Creator: result[1][3],
                DateCreated: result[1][4],
            } as DirectoryBlock;
        }
    }

    async getDirectoryData(id: string) {
        let directoryData = await this.contract.getDirectoryData(id);
        let files: Array<FileBlock> = [];
        let directories: Array<DirectoryBlock> = [];
        for (let directory of directoryData[0]) {
            directories.push({
                Id: directory[0],
                ParentId: directory[1],
                Name: directory[2],
                Creator: directory[3],
                DateCreated: directory[4],
            } as DirectoryBlock);
        }
        for (let file of directoryData[1]) {
            files.push({
                Id: file[0],
                Name: file[1],
                Extension: file[2],
            } as FileBlock);
        }
        let directoryInfo: DirectoryInfo = {
            DirectoryId: directoryData[2][0],
            FilesCount: directoryData[2][1],
            DirectoriesCount: directoryData[2][2],
            Size: directoryData[2][3]
        } as DirectoryInfo;
        return {
            Files: files,
            Directories: directories,
            DirectoryInfo: directoryInfo,

        } as DirectoryDataType;
    }

    async createDirectory(name: string, parentId: string): Promise<TransactionResponse> {
        return new Promise<TransactionResponse>(async (resolve, reject) => {
            try {
                let response = await this.contract.createDirectory(name, parentId);
                resolve({
                    success: true,
                });
            } catch (ex) {
                resolve({ success: false });
            }
        });
    }

    async uploadFile(directoryId: string | null, file: File) {
        // directoryId = directoryId == null ? "" : directoryId;
        var addFile = async (fileHash: string) => {
            let fileId = uuidv4();
            await this.contract.uploadFile(directoryId, fileId, file.name, fileHash)
        }

        return new Promise<X7FileProcess>(async (resolve, reject) => {
            let formdata = new FormData();
            let uploadProcess: X7FileProcess = { uploadPercent: 0.1, status: CreationStatus.notSending };
            let request = new XMLHttpRequest();
            formdata.append("file", file);
            request.upload.onprogress = function (e) {
                let percentComplete = Math.ceil((e.loaded / e.total) * 100);
                uploadProcess.uploadPercent = percentComplete;
            };
            request.onreadystatechange = function (oEvent) {
                if (request.readyState === 2) {
                    uploadProcess.status = CreationStatus.uploading;
                }
                if (request.readyState === 4) {
                    if (request.status === 200) {
                        let uploadResult = JSON.parse(request.responseText) as UploadResult;
                        uploadProcess.status = CreationStatus.signContract;
                        addFile(uploadResult.Hash);
                    } else {
                        console.log("Error", request.statusText);
                    }
                }
            };
            request.open("POST", "http://168.119.58.0:8090/upload", true);
            request.send(formdata);
            resolve(uploadProcess);
        });
    }

    fileToBytes(file: File) {
        return new Promise<string>((resolve, reject) => {
            var fr = new FileReader();
            fr.addEventListener('load', function (this: any) {
                let u: Uint8Array = new Uint8Array(this.result),
                    i = u.length, result = "0x";
                for (i = 0; i < u.length; i++) {
                    result += (u[i] < 16 ? '0' : '') + u[i].toString(16);
                }
                resolve(result);
            });
            fr.readAsArrayBuffer(file);
        });
    }

    bytesToFile(str_bytes: string) {
        str_bytes = str_bytes.substring(2);
        let j = 0;
        const uint8 = new Uint8Array(str_bytes.length / 2);
        for (let i = 0; i < str_bytes.length; i += 2) {
            let cellData = str_bytes[i] + str_bytes[i + 1];
            uint8[j++] = parseInt(cellData, 16);
        }
        return new Blob([(uint8).buffer]);
    }
}