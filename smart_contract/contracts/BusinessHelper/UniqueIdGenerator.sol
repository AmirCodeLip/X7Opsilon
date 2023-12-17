// SPDX-License-Identifier: MIT
pragma solidity ^0.8;
import {IDT2} from "./IDT2.sol";

contract UniqueIdGenerator {
    IDT2 private _idt;
    uint256 counter;
    bool private initialized;

    function setup(address idtAddress) public {
        _idt = IDT2(idtAddress);
        if (initialized) return;
        initialized = true;
        counter = 1;
    }

    function fixUChar(bytes1 i) private pure returns (bytes1) {
        if (i == 0x30) return 0x41;
        else if (i == 0x31) return 0x42;
        else if (i == 0x32) return 0x43;
        else if (i == 0x33) return 0x44;
        else if (i == 0x34) return 0x45;
        else if (i == 0x35) return 0x46;
        else if (i == 0x36) return 0x47;
        else if (i == 0x37) return 0x48;
        else if (i == 0x38) return 0x49;
        else if (i == 0x39) return 0x4A;
        // else if(i==0x39)
        //     return 0x49;
        else return 0x5A;
    }

    function random(uint256 number) private returns (uint256) {
        counter++;
        return
            uint256(
                keccak256(
                    abi.encodePacked(
                        block.timestamp,
                        block.difficulty,
                        msg.sender,
                        counter
                    )
                )
            ) % number;
    }

    function randomString(uint256 length) private returns (string memory) {
        require(length <= 14, "Length cannot be greater than 14");
        require(length >= 1, "Length cannot be Zero");
        bytes memory randomWord = new bytes(length);
        // since we have 62 Characters
        bytes memory chars = new bytes(62);
        chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (uint256 i = 0; i < length; i++) {
            uint256 randomNumber = random(26);
            // Index access for string is not possible
            randomWord[i] = chars[randomNumber];
        }
        return string(randomWord);
    }

    function uniqId() public payable returns (string memory) {
        bytes memory dn = bytes(_idt.strNow());
        bytes memory result = new bytes(55);
        for (uint256 i = 0; i < result.length; i++) {
            result[i] = 0x5F;
        }
        for (uint256 i = 0; i < dn.length; i++) {
            result[i] = fixUChar(dn[i]);
        }
        // result[10] = 0x5F;
        uint256 j = 9;
        for (int256 i = 0; i < 3; i++) {
            j++;
            bytes memory step1 = bytes(randomString(14));
            for (uint256 k = 0; k < step1.length; k++) {
                j++;
                result[j] = step1[k];
            }
        }
        return string(result);
    }
}
