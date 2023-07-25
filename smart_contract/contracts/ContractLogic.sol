// SPDX-License-Identifier: MIT
pragma solidity ^0.8;
import "@openzeppelin/contracts/utils/Strings.sol";
import {Infrastructure} from "./BusinessHelper/Infrastructure.sol";
import {UniqueIdGenerator} from "./BusinessHelper/UniqueIdGenerator.sol";
import {FileRepository} from "./Repositories/FileRepository.sol";
import {DirectoryRepository} from "./Repositories/DirectoryRepository.sol";
import {DirectoryFrame} from "./Entities/DirectoryFrame.sol";
import {DirectoryInfoFrame} from "./Entities/DirectoryInfoFrame.sol";

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
        return (directoryRepository.add(name, parentId));
    }

    function getDirectory(
        string memory id
    ) public view returns (DirectoryFrame[] memory) {
        return (directoryRepository.get(id));
    }

    function getOrCreateRoot() public returns (DirectoryFrame memory root) {
        return (directoryRepository.getOrCreateRoot());
    }

    function getRoot() public view returns (DirectoryFrame memory root) {
        return (directoryRepository.getRoot());
    }

    function uploadFile(
        string memory directoryId,
        string memory fileName,
        bytes memory fileData
    ) public payable returns (string memory) {
        DirectoryFrame memory directory = directoryRepository
            .getDirectoryOrRoot(directoryId);

        DirectoryInfoFrame memory directoryInfo = directoryRepository
            .getOrCreateDirectoryInfo(directory.Id);
        directoryInfo.FilesCount = directoryInfo.FilesCount + 1;
        string memory fileID = fileRepository.add(
            fileName,
            directoryId,
            fileData
        );
        return fileID;
    }

    function testGet(bytes memory t) public pure returns (bytes memory) {
        //0x2123229f00
        return t;
    }
}
