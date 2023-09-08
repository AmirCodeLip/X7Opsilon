// SPDX-License-Identifier: MIT
pragma solidity ^0.8;
import {UniqueIdGenerator} from "./BusinessHelper/UniqueIdGenerator.sol";
import {FileRepository} from "./Repositories/FileRepository.sol";
import {DirectoryRepository} from "./Repositories/DirectoryRepository.sol";
import {DirectoryFrame} from "./Entities/DirectoryFrame.sol";
import {FileFrame} from "./Entities/FileFrame.sol";
import {DirectoryInfoFrame} from "./Entities/DirectoryInfoFrame.sol";
import {IDT2} from "./BusinessHelper/IDT2.sol";
import "./BusinessHelper/BaseWorks.sol";
import "./ViewModels/FileOutput.sol";

contract ContractLogic {
    UniqueIdGenerator private _uniqueIdGenerator;
    DirectoryRepository private directoryRepository;
    FileRepository private fileRepository;
    IDT2 private _idt;
    event RootResult(string id, address creator);
    event DirectoryCreated(string id, string directoryId);
    event FileUploaded(string id, string directoryId);

    constructor() {
        _idt = new IDT2();
        _uniqueIdGenerator = new UniqueIdGenerator(_idt);
        directoryRepository = new DirectoryRepository(_uniqueIdGenerator);
        fileRepository = new FileRepository(_uniqueIdGenerator);
    }

    function createDirectory(
        string memory name,
        string memory parentId
    ) public payable {
        (string memory id, string memory directoryId) = directoryRepository.add(
            msg.sender,
            name,
            parentId
        );
        emit DirectoryCreated(id, directoryId);
    }

    function getDirectoryData(
        string memory id
    )
        public
        view
        returns (
            DirectoryFrame[] memory,
            FileOutput[] memory,
            DirectoryInfoFrame memory
        )
    {
        (
            DirectoryFrame[] memory directories,
            DirectoryInfoFrame memory directoryInfo
        ) = directoryRepository.getSubDirectories(id);
        FileOutput[] memory files = fileRepository.getSubFiles(directoryInfo);
        return (directories, files, directoryInfo);
    }

    function getOrCreateRoot() public payable {
        DirectoryFrame memory root = directoryRepository.getOrCreateRoot(
            msg.sender
        );
        emit RootResult(root.Id, root.Creator);
    }

    function getRoot() public view returns (bool, DirectoryFrame memory) {
        return (directoryRepository.getRoot(msg.sender));
    }

    function uploadFile(
        string memory directoryId,
        string memory fileName,
        bytes memory fileData
    ) public payable {
        DirectoryFrame memory directory = directoryRepository
            .getDirectoryOrRoot(msg.sender, directoryId);
        DirectoryInfoFrame memory directoryInfo = directoryRepository
            .getOrCreateDirectoryInfo(directory.Id);
        directoryInfo.FilesCount = directoryInfo.FilesCount + 1;
        directoryRepository.updateDirectoryInfo(directory.Id, directoryInfo);
        string memory fileID = fileRepository.add(
            msg.sender,
            fileName,
            directory.Id,
            fileData
        );
        emit FileUploaded(fileID, directoryId);
    }
}
