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

    function exist(string memory id) internal view returns (bool) {
        DirectoryFrame memory directory = directoriesMap[id];
        if (bytes(directory.Id).length == 0) {
            return false;
        }
        return true;
    }

    function existRoot() public view returns (bool) {
        DirectoryFrame memory root = rootsMap[msg.sender];
        if (bytes(root.Id).length == 0) {
            return false;
        }
        return true;
    }

    function add(string memory name, string memory parentId)
        public
        payable
        isAllowedName(name, true)
        returns (string memory)
    {
        DirectoryFrame memory parent = getDirectoryOrRoot(parentId);
        string memory id = _uniqueIdGenerator.uniqId();
        DirectoryFrame memory newDirectory = DirectoryFrame(
            id,
            parent.Id,
            name,
            msg.sender,
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
    }

    function get(string memory directoryId)
        public
        view
        returns (DirectoryFrame[] memory)
    {
        if (!exist(directoryId)) {
            revert notfound();
        }
        DirectoryInfoFrame memory directoryInfo = directoryInfoListMap[
            directoryId
        ];

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
        return result;
    }

    function getRoot() public view returns (DirectoryFrame memory root) {
        root = rootsMap[msg.sender];
        return (root);
    }

    function getDirectoryInfo(string memory id)
        public
        view
        returns (DirectoryInfoFrame memory directoryInfo)
    {
        return (directoryInfoListMap[id]);
    }

    //get directiry and if it's don't have id return root
    function getDirectoryOrRoot(string memory id)
        public 
        returns (DirectoryFrame memory)
    {
        bytes memory b_parentId = bytes(id);
        if (b_parentId.length == 0) {
            return getOrCreateRoot();
        } else if (!exist(id)) {
            revert notfound();
        } else {
            return directoriesMap[id];
        }
    }

    //create {DirectoryInfo} if not exist then return
    function getOrCreateDirectoryInfo(string memory id)
        public
        payable
        returns (DirectoryInfoFrame memory directoryInfo)
    {
        directoryInfo = directoryInfoListMap[id];
        if (bytes(directoryInfo.DirectoryId).length == 0) {
            directoryInfoListMap[id] = DirectoryInfoFrame(id, 0, 0, 0);
            directoryInfo = directoryInfoListMap[id];
        }
        return (directoryInfo);
    }

    //create {DirectoryFrame} if not exist then return
    function getOrCreateRoot()
        public
        payable
        returns (DirectoryFrame memory root)
    {
        root = rootsMap[msg.sender];
        if (bytes(root.Id).length == 0) {
            string memory rootId = _uniqueIdGenerator.uniqId();
            root = DirectoryFrame(
                rootId,
                "root",
                "",
                msg.sender,
                block.timestamp
            );
            data.push(root);
            count++;
            rootsMap[msg.sender] = root;
            directoriesMap[rootId] = root;
        }
        return (root);
    }
}
