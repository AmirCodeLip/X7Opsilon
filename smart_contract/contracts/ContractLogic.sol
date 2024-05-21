// SPDX-License-Identifier: MIT
pragma solidity ^0.8;
import {UniqueIdGenerator} from "./BaseImplementations/UniqueIdGenerator.sol";
import {FileRepository} from "./Repositories/FileRepository.sol";
import {DirectoryRepository} from "./Repositories/DirectoryRepository.sol";
import {FileStatementRepository} from "./Repositories/FileStatementRepository.sol";
import {DirectoryFrame} from "./Entities/DirectoryFrame.sol";
import {FileFrame} from "./Entities/FileFrame.sol";
import {DirectoryInfoFrame} from "./Entities/DirectoryInfoFrame.sol";
import {IDT2} from "./BaseImplementations/IDT2.sol";
import "./BaseImplementations/BaseWorks.sol";
import "./ViewModels/FileOutput.sol";

contract ContractLogic {
    DirectoryRepository private directoryRepository;
    FileRepository private fileRepository;
    FileStatementRepository private fileStatementRepository;

    bool private initialized;
    event DirectoryCreated(string id, string directoryId);
    event FileStatementInserted(string id, string directoryId);

    constructor(
        address directoryRepositoryAddress,
        address fileRepositoryAddress,
        address fileStatementRepositoryAddress
    ) {
        directoryRepository = DirectoryRepository(directoryRepositoryAddress);
        fileRepository = FileRepository(fileRepositoryAddress);
        fileStatementRepository = FileStatementRepository(
            fileStatementRepositoryAddress
        );
        initialized = true;
        if (initialized) return;
        initialized = true;
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
        directoryRepository.getOrCreateRoot(msg.sender);
    }

    function getRoot() public view returns (bool, DirectoryFrame memory) {
        return (directoryRepository.getRoot(msg.sender));
    }

    function addFileStatement(
        string memory directoryId,
        string memory fileId,
        string memory fileName
    ) public payable {
        //get directory for uploading file
        DirectoryFrame memory directory = directoryRepository
            .getDirectoryOrRoot(msg.sender, directoryId);
        // DirectoryInfoFrame memory directoryInfo = directoryRepository
        //     .getOrCreateDirectoryInfo(directory.Id);
        // directoryInfo.FilesCount = directoryInfo.FilesCount + 1;
        // directoryRepository.updateDirectoryInfo(directory.Id, directoryInfo);
        string memory fileID = fileStatementRepository.add(
            msg.sender,
            fileId,
            fileName,
            directory.Id
        );
        emit FileStatementInserted(fileID, directoryId);
    }
}
