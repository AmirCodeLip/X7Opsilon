// SPDX-License-Identifier: MIT
pragma solidity ^0.8;
import "@openzeppelin/contracts/utils/Strings.sol";
import "../Entities/FileStatementFrame.sol";
import "../Entities/DirectoryInfoFrame.sol";
import "./BaseNameDeclaration.sol";
import {UniqueIdGenerator} from "../BaseImplementations/UniqueIdGenerator.sol";
import "../BaseImplementations/BaseWorks.sol";
import "../ViewModels/FileOutput.sol";

contract FileStatementRepository is BaseNameDeclaration {
    //list of all FileStatementFrame
    FileStatementFrame[] private data;
    uint256 private count;
    mapping(string => FileStatementFrame) public idMapping;

    constructor(address baseWorksAddress) public {
        baseSetup(baseWorksAddress);
        if (initialized) return;
        initialized = true;
        count = 0;
    }

    function add(
        address creatorId,
        string memory fileId,
        string memory fullName,
        string memory directoryId
    ) public isAllowedName(fullName, false) returns (string memory) {
        //string memory id = _uniqueIdGenerator.uniqId();
        (string memory name, string memory extension) = separateNameExe(
            fullName
        );
        FileStatementFrame memory newFile = FileStatementFrame(
            fileId,
            directoryId,
            name,
            extension,
            creatorId,
            false
        );
        idMapping[fileId] = newFile;
        data.push(newFile);
        count++;
        return fileId;
    }

    function getByIndex(
        uint256 index
    ) public payable returns (FileStatementFrame memory) {
        FileStatementFrame storage file = data[index];
        return file;
    }

    function getById(
        string memory id
    ) public view returns (FileStatementFrame memory) {
        FileStatementFrame memory fileStatementFrame = idMapping[id];
        return (fileStatementFrame);
    }
}
