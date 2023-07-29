// SPDX-License-Identifier: MIT
pragma solidity ^0.8;
import "@openzeppelin/contracts/utils/Strings.sol";
import "../Entities/FileFrame.sol";
import "../Entities/DirectoryInfoFrame.sol";
import "./BaseNameDeclaration.sol";
import {UniqueIdGenerator} from "../BusinessHelper/UniqueIdGenerator.sol";
import "../BusinessHelper/Infrastructure.sol";
import "../ViewModels/FileOutput.sol";

contract FileRepository is BaseNameDeclaration {
    //data of files
    FileFrame[] private data;
    uint256 private count = 0;
    UniqueIdGenerator private _uniqueIdGenerator;

    constructor(UniqueIdGenerator uniqueIdGenerator) {
        _uniqueIdGenerator = uniqueIdGenerator;
    }

    function getSubFiles(
        string memory directoryId,
        DirectoryInfoFrame memory directoryInfo
    ) public view returns (FileOutput[] memory) {
        FileOutput[] memory result = new FileOutput[](directoryInfo.FilesCount);
        uint256 j = 0;
        bytes memory b_directoryId = bytes(directoryId);
        for (uint256 i = 0; i < count; i++) {
            FileFrame memory item = data[i];
            bytes memory fileDirectoryId = bytes(item.DirectoryId);
            if (Infrastructure.bytesEquals(b_directoryId, fileDirectoryId)) {
                result[j++] = FileOutput(item.Id, item.Name, item.Extension);
            }
        }
        return (result);
    }

    function add(
        address user,
        string memory fullName,
        string memory directoryId,
        bytes memory fileData
    ) public isAllowedName(fullName, false) returns (string memory) {
        string memory id = _uniqueIdGenerator.uniqId();
        (string memory name, string memory extension) = separateNameExe(
            fullName
        );
        FileFrame memory newFile = FileFrame(
            id,
            directoryId,
            name,
            extension,
            fileData,
            user,
            block.timestamp
        );
        data.push(newFile);
        count++;
        return id;
    }

    function separateNameExe(
        string memory fullName
    ) public pure returns (string memory, string memory) {
        uint256 extensionCount = 0;
        bytes memory extension = new bytes(50);
        bytes memory b_fullName = bytes(fullName);
        uint256 i = (b_fullName.length - 1);
        for (; ; i--) {
            bytes1 b_char = b_fullName[i];
            if (b_char == 0x2E) {
                break;
            }
            if (extensionCount > 49) {
                revert unsupportedName();
            }
            extension[extensionCount] = b_char;
            extensionCount++;
            if (i == 0) {
                revert unsupportedName();
            }
        }
        extension = Infrastructure.copyBytes(extension, extensionCount);
        extension = Infrastructure.reverseBytes(extension);
        uint256 nameCount = (b_fullName.length - extensionCount - 1);
        bytes memory fileName = Infrastructure.copyBytes(b_fullName, nameCount);
        return (string(fileName), string(extension));
    }
}
