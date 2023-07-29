
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
};