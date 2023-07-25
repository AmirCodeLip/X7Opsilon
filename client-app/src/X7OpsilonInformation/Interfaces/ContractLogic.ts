import { debug } from "console";
import { ethers } from "ethers";

export interface Directory {
    Id: string,
    ParentId: string,
    Directory: string,
    DirectoryCount: number,
    DirectoryLength: number,
}

export default class ContractLogic {
    contract: ethers.Contract;
    constructor(contract: ethers.Contract) {
        this.contract = contract;
    }

    async testGet() {
        var file = new Blob(['hello from outside']);
        let dataBytes = await this.fileToBytes(file);
        let data = await this.contract.testGet(dataBytes);

        console.log(await this.bytesToFile(data).text());
    }

    async getRoot() {
        let result = await this.contract.getRoot();
        // let ts = await this.contract.getOrCreateRoot();
        // debugger;
        if (result[0]) {
            return null;
        }
        else {
            console.log(result[1][0])
        }
    }

    async createDirectory(name: string, parentId: string) {
        try {

            let createDirectory = await this.contract.createDirectory(name, parentId);
        } catch (ex) {
        }
    }

    fileToBytes(file: Blob) {
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