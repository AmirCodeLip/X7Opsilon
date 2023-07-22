import { ethers } from "ethers";

export interface Directory {
    Id: string,
    ParentId: string,
    Directory: string,
    DirectoryCount: number,
    DirectoryLength: number,
}

export default class X7OpsilonInterface {
    contract: ethers.Contract;
    constructor(contract: ethers.Contract) {
        this.contract = contract;
    }

    async getDirectoriesByPath(path: string) {
        let result = await this.contract.getDirectoriesByPath(path);
        let isNull: boolean = result[0];
        let count: number = result[2];
        let data: any = result[1];
        if (isNull)
            return null;
        let directories: Array<Directory> = [];
        for (let i = 0; i < count; i++) {
            let item = data[i];
            directories.push({
                Id: item.Id as string,
                ParentId: item.ParentId as string,
                Directory: item.Directory as string,
                DirectoryCount: item.DirectoryCount as number,
                DirectoryLength: item.DirectoryLength as number,
            });
        }
        return directories;
    }

    async createDirectory(path: string) {
        let createDirectory = await this.contract.createDirectory(path);
    }
}