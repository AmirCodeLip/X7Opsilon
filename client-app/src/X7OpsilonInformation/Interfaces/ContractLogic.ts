import { debug } from "console";
import { ethers } from "ethers";
import { DirectoryBlock, FileBlock, DirectoryInfo, DirectoryDataType, TransactionResponse } from "./ContractLogicTypes";

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
        directoryId = directoryId == null ? "" : directoryId;
        return new Promise<TransactionResponse>(async (resolve, reject) => {
            let fileBytes = await this.fileToBytes(file);
            try {
                let response = await this.contract.uploadFile(directoryId, file.name, fileBytes);
                resolve({
                    success: true,
                });
            } catch (ex) {
                resolve({ success: false });
            }
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