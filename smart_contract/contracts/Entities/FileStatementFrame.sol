// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import {FileFrame} from "./FileFrame.sol";

struct FileStatementFrame {
    string Id;
    string DirectoryId;
    string Name;
    string Extension;
    address Creator;
    bool Confirmed;
}