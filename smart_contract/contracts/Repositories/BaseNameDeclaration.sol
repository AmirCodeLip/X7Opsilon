// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

contract BaseNameDeclaration {
    ///not allowed characters in filename windows
    bytes notAllowed = bytes('"\\/]:?<>|');
    bytes1 dot = bytes1(".");
    error unsupportedName();
    error unsupportedSize();
    error notfound();

    modifier isAllowedName(string memory name, bool isdirectory) {
        bytes memory b_name = bytes(name);
        bool allowd = true;
        if (b_name.length > 230) {
            revert unsupportedSize();
        }
        if (b_name.length == 0) {
            allowd = false;
        }
        if (isdirectory) {
            for (uint256 i = 0; i < b_name.length; i++) {
                if (b_name[i] == dot) {
                    allowd = false;
                    break;
                }
            }
        } else {
            allowd = false;
            for (uint256 i = 0; i < b_name.length; i++) {
                if (b_name[i] == dot) {
                    allowd = true;
                    break;
                }
            }
            if (b_name[b_name.length - 1] == dot) {
                allowd = false;
            }
        }
        for (uint256 i = 0; i < b_name.length; i++) {
            for (uint256 j = 0; j < notAllowed.length; j++) {
                if (b_name[i] == notAllowed[j]) {
                    allowd = false;
                    break;
                }
            }
            if (!allowd) break;
        }

        if (allowd) {
            _;
        } else {
            revert unsupportedName();
        }
    }
}
