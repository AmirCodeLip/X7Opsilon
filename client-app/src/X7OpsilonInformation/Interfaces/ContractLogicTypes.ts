import { createExportDeclaration } from "typescript";

export interface DirectoryBlock {
    Id: string,
    ParentId: string,
    Name: string,
    Creator: string,
    DateCreated: string
}

export interface DirectoryInfo {
    DirectoryId: string;
    FilesCount: bigint;
    DirectoriesCount: bigint;
    Size: bigint;
}

export interface FileBlock {
    Id: string;
    Name: string;
    Extension: string;
}

export interface DirectoryDataType {
    Files: Array<FileBlock>;
    Directories: Array<DirectoryBlock>;
    DirectoryInfo: DirectoryInfo;
}

export interface TransactionResponse {
    success: boolean,
}


export enum CreationStatus {
    notSending, uploading, signContract
}

export interface X7FileProcess {
    uploadPercent: number,
    status: CreationStatus
}
export interface UploadResult {
    Name: string,
    Hash: string,
    Size: string
}
// { ": "Capture.JPG", "": "QmagQrzugGNjXEtZLfV3WbxEcRWcnJ4gcBSuAmTYhDGT2K", "Size": "142294" }
