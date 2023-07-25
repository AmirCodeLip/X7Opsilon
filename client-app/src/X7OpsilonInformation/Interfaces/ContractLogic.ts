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

    async getDirectoriesByPath(path: string) {
        // let result = await this.contract.getDirectoriesByPath(path);
        // let isNull: boolean = result[0];
        // let count: number = result[2];
        // let data: any = result[1];
        // if (isNull)
        //     return null;
        // let directories: Array<Directory> = [];
        // for (let i = 0; i < count; i++) {
        //     let item = data[i];
        //     directories.push({
        //         Id: item.Id as string,
        //         ParentId: item.ParentId as string,
        //         Directory: item.Directory as string,
        //         DirectoryCount: item.DirectoryCount as number,
        //         DirectoryLength: item.DirectoryLength as number,
        //     });
        // }
        return null;
    }

    async createDirectory(path: string) {
        // let createDirectory = await this.contract.createDirectory(path);
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