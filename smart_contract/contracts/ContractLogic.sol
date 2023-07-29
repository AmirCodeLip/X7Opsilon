// SPDX-License-Identifier: MIT
pragma solidity ^0.8;
import "@openzeppelin/contracts/utils/Strings.sol";
import {Infrastructure} from "./BusinessHelper/Infrastructure.sol";
import {UniqueIdGenerator} from "./BusinessHelper/UniqueIdGenerator.sol";
import {FileRepository} from "./Repositories/FileRepository.sol";
import {DirectoryRepository} from "./Repositories/DirectoryRepository.sol";
import {DirectoryFrame} from "./Entities/DirectoryFrame.sol";
import {DirectoryInfoFrame} from "./Entities/DirectoryInfoFrame.sol";
import "./ViewModels/FileOutput.sol";

contract ContractLogic {
    UniqueIdGenerator private uniqueIdGenerator;
    DirectoryRepository private directoryRepository;
    FileRepository private fileRepository;

    constructor() {
        uniqueIdGenerator = new UniqueIdGenerator();
        directoryRepository = new DirectoryRepository(uniqueIdGenerator);
        fileRepository = new FileRepository(uniqueIdGenerator);
    }

    function createDirectory(
        string memory name,
        string memory parentId
    ) public payable returns (string memory) {
        return (directoryRepository.add(msg.sender, name, parentId));
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
        FileOutput[] memory files = fileRepository.getSubFiles(
            id,
            directoryInfo
        );
        return (directories, files, directoryInfo);
    }

    function getOrCreateRoot()
        public
        payable
        returns (DirectoryFrame memory root)
    {
        return (directoryRepository.getOrCreateRoot(msg.sender));
    }

    function getRoot() public view returns (bool, DirectoryFrame memory) {
        return (directoryRepository.getRoot(msg.sender));
    }

    function uploadFile(
        string memory directoryId,
        string memory fileName,
        bytes memory fileData
    ) public payable returns (string memory) {
        DirectoryFrame memory directory = directoryRepository
            .getDirectoryOrRoot(msg.sender, directoryId);
        DirectoryInfoFrame memory directoryInfo = directoryRepository
            .getOrCreateDirectoryInfo(directory.Id);
        directoryInfo.FilesCount = directoryInfo.FilesCount + 1;
        directoryRepository.updateDirectoryInfo(directory.Id, directoryInfo);
        string memory fileID = fileRepository.add(
            msg.sender,
            fileName,
            directoryId,
            fileData
        );
        return fileID;
    }
}
