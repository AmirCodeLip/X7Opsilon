// SPDX-License-Identifier: MIT
pragma solidity ^0.8;
import "@openzeppelin/contracts/utils/Strings.sol";
import {DirectoryFrame} from "../Entities/DirectoryFrame.sol";
import {DirectoryInfoFrame} from "../Entities/DirectoryInfoFrame.sol";
import "./BaseNameDeclaration.sol";
import "../BusinessHelper/Infrastructure.sol";
import {UniqueIdGenerator} from "../BusinessHelper/UniqueIdGenerator.sol";

contract DirectoryRepository is BaseNameDeclaration {
    //data of files
    DirectoryFrame[] private data;
    uint256 private count = 0;
    UniqueIdGenerator private _uniqueIdGenerator;
    //get root by sender
    mapping(address => DirectoryFrame) private rootsMap;
    //get {DirectoryInfo} by directory id
    mapping(string => DirectoryInfoFrame) private directoryInfoListMap;
    //get {DirectoryFrame} by directory id
    mapping(string => DirectoryFrame) private directoriesMap;

    constructor(UniqueIdGenerator uniqueIdGenerator) {
        _uniqueIdGenerator = uniqueIdGenerator;
    }

    function add(
        address user,
        string memory name,
        string memory parentId
    ) public payable isAllowedName(name, true) returns (string memory) {
        DirectoryFrame memory parent = getDirectoryOrRoot(user, parentId);
        string memory id = _uniqueIdGenerator.uniqId();
        DirectoryFrame memory newDirectory = DirectoryFrame(
            id,
            parent.Id,
            name,
            user,
            block.timestamp
        );
        data.push(newDirectory);
        count++;
        directoriesMap[id] = newDirectory;
        getOrCreateDirectoryInfo(id);
        DirectoryInfoFrame
            memory directoryInfoParent = getOrCreateDirectoryInfo(parent.Id);
        directoryInfoParent.DirectoriesCount =
            directoryInfoParent.DirectoriesCount +
            1;
        updateDirectoryInfo(parent.Id, directoryInfoParent);
        return id;
    }

    function updateDirectoryInfo(
        string memory id,
        DirectoryInfoFrame memory newModel
    ) public payable {
        DirectoryInfoFrame storage directoryInfoParent = directoryInfoListMap[
            id
        ];
        directoryInfoParent.DirectoriesCount = newModel.DirectoriesCount;
        directoryInfoParent.FilesCount = newModel.FilesCount;
    }

    function getSubDirectories(string memory directoryId)
        public
        view
        returns (DirectoryFrame[] memory, DirectoryInfoFrame memory)
    {
        (bool directoryNull,) = getDirectory(
            directoryId
        );
        if (directoryNull) {
            revert notfound();
        }
        (
            bool isNull,
            DirectoryInfoFrame memory directoryInfo
        ) = getDirectoryInfo(directoryId);
        if (isNull) {
            revert notfoundDirectory();
        }
        DirectoryFrame[] memory result = new DirectoryFrame[](
            directoryInfo.DirectoriesCount
        );
        uint256 j = 0;
        bytes memory b_directoryId = bytes(directoryId);
        for (uint256 i = 0; i < count; i++) {
            DirectoryFrame memory item = data[i];
            bytes memory b_parentId = bytes(item.ParentId);
            if (Infrastructure.bytesEquals(b_directoryId, b_parentId)) {
                result[j++] = item;
            }
        }
        return (result, directoryInfo);
    }

    function getRoot(address user)
        public
        view
        returns (bool isNull, DirectoryFrame memory root)
    {
        DirectoryFrame memory _root = rootsMap[user];
        if (bytes(_root.Id).length == 0 || _root.Creator != user) {
            isNull = true;
        } else {
            root = _root;
            isNull = false;
        }
        return (isNull, root);
    }

    function getDirectory(string memory id)
        internal
        view
        returns (bool isNull, DirectoryFrame memory directory)
    {
        DirectoryFrame memory _directory = directoriesMap[id];
        bytes memory b_directoryId = bytes(_directory.Id);
        bytes memory b_id = bytes(_directory.Id);
        if (
            b_id.length == 0 || !Infrastructure.bytesEquals(b_id, b_directoryId)
        ) {
            isNull = true;
        } else {
            directory = _directory;
            isNull = false;
        }
        return (isNull, directory);
    }

    function getDirectoryInfo(string memory id)
        public
        view
        returns (bool isNull, DirectoryInfoFrame memory directoryInfo)
    {
        DirectoryInfoFrame memory _directoryInfo = directoryInfoListMap[id];
        bytes memory b_directoryInfoId = bytes(_directoryInfo.DirectoryId);
        if (
            b_directoryInfoId.length == 0 ||
            !Infrastructure.bytesEquals(b_directoryInfoId, bytes(id))
        ) {
            isNull = true;
        } else {
            directoryInfo = _directoryInfo;
            isNull = false;
        }
        return (isNull, directoryInfo);
    }

    //get directiry and if it's don't have id return root
    function getDirectoryOrRoot(address user, string memory id)
        public
        returns (DirectoryFrame memory)
    {
        bytes memory b_Id = bytes(id);
        if (b_Id.length == 0) {
            return getOrCreateRoot(user);
        }
        (bool directoryNull, DirectoryFrame memory directory) = getDirectory(
            id
        );
        if (directoryNull) {
            revert notfound();
        } else {
            return directory;
        }
    }

    //create {DirectoryInfo} if not exist then return
    function getOrCreateDirectoryInfo(string memory id)
        public
        payable
        returns (DirectoryInfoFrame memory)
    {
        (
            bool isNull,
            DirectoryInfoFrame memory directoryInfo
        ) = getDirectoryInfo(id);
        if (isNull) {
            directoryInfo = DirectoryInfoFrame(id, 0, 0, 0);
            directoryInfoListMap[id] = directoryInfo;
        }
        return (directoryInfo);
    }

    //create {DirectoryFrame} if not exist then return
    function getOrCreateRoot(address user)
        public
        payable
        returns (DirectoryFrame memory)
    {
        (bool isNull, DirectoryFrame memory root) = getRoot(user);
        if (isNull) {
            string memory rootId = _uniqueIdGenerator.uniqId();
            root = DirectoryFrame(rootId, "root", "", user, block.timestamp);
            data.push(root);
            count++;
            rootsMap[user] = root;
            directoriesMap[rootId] = root;
        }
        return (root);
    }
}
