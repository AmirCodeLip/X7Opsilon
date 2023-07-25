// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

struct FileFrame {
    string Id;
    string DirectoryId;
    string Name;
    string Extension;
    bytes FileData;
    address Creator;
    uint256 DateCreated;
}
