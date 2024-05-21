// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

/**
 * @dev Binary operations.
 */
contract BaseWorks {
    function setup() public {}

    /**
     * `string` contains special characters.
     * for example we want to see hello is contain o or not
     */
    function strContains(
        string memory text,
        bytes memory chars
    ) internal pure returns (bool) {
        bytes memory b_text = bytes(text);
        bool result = false;
        for (uint256 i = 0; i < b_text.length; i++) {
            for (uint256 j = 0; j < chars.length; j++) {
                //string is contains char
                if (b_text[i] == chars[j]) {
                    result = true;
                    break;
                }
            }
            if (result) {
                break;
            }
        }
        return result;
    }

    function copyBytes(
        bytes calldata b_data,
        uint256 strLength
    ) external pure returns (bytes memory resultData) {
        bytes memory result = new bytes(strLength);
        for (uint256 i = 0; i < strLength; i++) {
            result[i] = b_data[i];
        }
        return result;
    }

    function reverseBytes(
        bytes calldata b_data
    ) external pure returns (bytes memory) {
        bytes memory result = new bytes(b_data.length);
        uint256 length = b_data.length - 1;
        for (uint i = 0; i < b_data.length; i++) {
            result[i] = b_data[length - i];
        }
        return result;
    }

    function combine(
        string[] memory paths
    ) external pure returns (string memory) {
        uint256 count = 0;
        bytes[] memory processData = new bytes[](paths.length);
        uint256 i = 0;
        for (; i < paths.length; i++) {
            bytes memory data = bytes(paths[i]);
            count += data.length + 1;
            processData[i] = data;
        }
        bytes memory result = new bytes(count);
        i = 0;
        for (uint256 j = 0; j < processData.length; j++) {
            result[i] = 0x2f;
            i++;
            for (uint256 k = 0; k < processData[j].length; k++) {
                result[i] = processData[j][k];
                i++;
            }
        }
        return string(result);
    }

    function bytesEquals(
        bytes memory b1,
        bytes memory b2
    ) public pure returns (bool) {
        uint256 l1 = b1.length;
        if (l1 != b2.length) return false;
        for (uint256 i = 0; i < l1; i++) {
            if (b1[i] != b2[i]) return false;
        }
        return true;
    }

}
