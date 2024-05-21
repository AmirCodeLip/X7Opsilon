// SPDX-License-Identifier: MIT
pragma solidity ^0.8;
import "@openzeppelin/contracts/utils/Strings.sol";
import "../Entities/FileFrame.sol";
import "../Entities/DirectoryInfoFrame.sol";
import "./BaseNameDeclaration.sol";
import {UniqueIdGenerator} from "../BaseImplementations/UniqueIdGenerator.sol";
import "../BaseImplementations/BaseWorks.sol";
import "../ViewModels/FileOutput.sol";

contract FileRepository is BaseNameDeclaration {
    //data of files
    FileFrame[] private data;
    uint256 private count;
    UniqueIdGenerator private _uniqueIdGenerator;

    constructor(
        address uniqueIdGeneratorAddress,
        address baseWorksAddress
    ) public {
        _uniqueIdGenerator = UniqueIdGenerator(uniqueIdGeneratorAddress);
        // _baseWorks = BaseWorks(baseWorksAddress);
        baseSetup(baseWorksAddress);
        if (initialized) return;
        initialized = true;
        count = 0;
    }

    function getSubFiles(
        DirectoryInfoFrame memory directoryInfo
    ) public view returns (FileOutput[] memory) {
        FileOutput[] memory result = new FileOutput[](directoryInfo.FilesCount);
        uint256 j = 0;
        bytes memory b_directoryId = bytes(directoryInfo.DirectoryId);
        for (uint256 i = 0; i < count; i++) {
            FileFrame memory item = data[i];
            bytes memory fileDirectoryId = bytes(item.DirectoryId);
            if (_baseWorks.bytesEquals(b_directoryId, fileDirectoryId)) {
                result[j++] = FileOutput(item.Id, item.Name, item.Extension);
            }
        }
        return (result);
    }

    function add(
        address user,
        string memory fileId,
        string memory fullName,
        string memory directoryId,
        string memory fileHash
    ) public isAllowedName(fullName, false) returns (string memory) {
        //string memory id = _uniqueIdGenerator.uniqId();
        (string memory name, string memory extension) = separateNameExe(
            fullName
        );
        FileFrame memory newFile = FileFrame(
            fileId,
            directoryId,
            name,
            extension,
            user,
            block.timestamp
        );
        data.push(newFile);
        count++;
        return fileId;
    }

    function getByIndex(
        uint256 index
    ) public payable returns (FileFrame memory) {
        FileFrame storage file = data[index];
        return file;
    }
}
