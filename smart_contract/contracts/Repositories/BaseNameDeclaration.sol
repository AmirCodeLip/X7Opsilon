// SPDX-License-Identifier: MIT
pragma solidity ^0.8;
import "../BaseImplementations/BaseWorks.sol";

contract BaseNameDeclaration {
    ///not allowed characters in filename windows
    bool initialized;
    //file which aren't allowd
    bytes notAllowed;
    bytes1 dot;
    BaseWorks public _baseWorks;

    error unsupportedName();
    error unsupportedSize();
    error notfound();
    error notfoundDirectory();

    function baseSetup(address baseWorksAddress) public {
        if (initialized) return;
        _baseWorks = BaseWorks(baseWorksAddress);
        notAllowed = bytes('"\\/]:?<>|');
        dot = bytes1(".");
    }


    // Allowed Name are file like the windows file names
    modifier isAllowedName(string memory name, bool isdirectory) {
        bytes memory b_name = bytes(name);
        bool allowd = true;
        // maximum file name can be
        if (b_name.length > 230) {
            revert unsupportedSize();
        }
        // file can't be 0 char
        if (b_name.length == 0) {
            allowd = false;
        }
        if (isdirectory) {
            // if it's been direcory can't be contains .
            for (uint256 i = 0; i < b_name.length; i++) {
                if (b_name[i] == dot) {
                    allowd = false;
                    break;
                }
            }
        } else {
            allowd = false;
            //file must be contains extension
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

    /** separate file name from it's extention 
        e.g test.jpg is test,jpg
    */
    function separateNameExe(
        string memory fileName
    ) public view returns (string memory, string memory) {
        uint256 extensionCount = 0;
        bytes memory extension = new bytes(50);
        bytes memory b_fullName = bytes(fileName);
        uint256 i = (b_fullName.length - 1);
        for (; ; i--) {
            bytes1 b_char = b_fullName[i];
            // if the char was equal to . char so it's extension
            if (b_char == 0x2E) {
                break;
            }
            // maximum char can be 49
            if (extensionCount > 49) {
                revert unsupportedName();
            }
            extension[extensionCount] = b_char;
            extensionCount++;
            if (i == 0) {
                revert unsupportedName();
            }
        }
        extension = _baseWorks.copyBytes(extension, extensionCount);
        extension = _baseWorks.reverseBytes(extension);
        uint256 nameCount = (b_fullName.length - extensionCount - 1);
        bytes memory name = _baseWorks.copyBytes(b_fullName, nameCount);
        return (string(name), string(extension));
    }
}
