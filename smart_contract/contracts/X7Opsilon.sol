// SPDX-License-Identifier: MIT
pragma solidity ^0.8;
import "@openzeppelin/contracts/utils/Strings.sol";
import {Infrastructure} from "./BusinessHelper/Infrastructure.sol";
import {GRandom} from "./BusinessHelper/GRandom.sol";

contract X7Opsilon {

    struct FileFrame {
        string Id;
        string Name;
        string Extension;
        bytes FileData;   
    }

    struct DirectoryFrame {
        string Id;
        string ParentId;
        //directory path
        string Directory;
        //count of slash in directory
        uint256 DirectoryCount;
        //lenth of str directory
        uint256 DirectoryLength;
    }
    
    GRandom rand = new GRandom();
    //data of files
    FileFrame[] public FileFrames;
    uint256 FileFramesCount = 0;
    //data of directories
    DirectoryFrame[] public DirectoryFrames;
    uint256 DirectoryFrameCount = 0;

    //directory must be started with slash character
    //max length of each directory must be 230
    error unsupportedDirectory();
    //max length of fileName must be 230
    //max length of extension must be 49
    //can't find extension
    //can't end with dot
    error unsupportedFile();

    // function uploadFile(
    //    string calldata fullName,
    //    string calldata directory,
    //    bytes calldata fileData
    // ) public payable {
    //    string memory id = rand.uniqId();
    //    (,string memory fixDirectory, uint256 directoryCount, uint256 directoryLength) = directoryProcess(directory); 
    //    (string memory extension, string memory fileName) = fileNameProcess(fullName);
    //     FileFrames.push(FileFrame(
    //        id,         
    //        fileName,
    //        extension,
    //        fileData,
    //        fixDirectory,
    //        directoryCount,
    //        directoryLength
    //     ));
    // }

    //create new directory if not exist
    function createDirectory(string memory directory) public payable returns(string memory)
    {  
        (string[] memory directories, string memory fixDirectory, uint256 directoryCount, uint256 directoryLength) = directoryProcess(directory);  
        (bool isNull , DirectoryFrame memory directoryFrame) = getDirectory(fixDirectory,directoryCount, directoryLength);
        // DirectoryFrame(id, parentId, fixDirectory, directoryCount, directoryLength)
        //root folder    
        if(isNull) {
            if(directories.length == 0)
             return "";
            string memory id = rand.uniqId();  
            string memory parentId = "";
            if(directories.length > 1)
            {
                delete directories[directories.length - 1];
                string memory f = Infrastructure.combine(directories);
                parentId = createDirectory(f);
            }
            directoryFrame = DirectoryFrame(id, parentId, fixDirectory, directoryCount, directoryLength);
            DirectoryFrames.push(DirectoryFrame(id, parentId, fixDirectory, directoryCount, directoryLength));
            DirectoryFrameCount++;
        }
        return directoryFrame.Id;
    }

    function getDirectory(string memory fixDirectory, uint256 directoryCount, uint256 directoryLength) public view returns(bool isNull , DirectoryFrame memory)
    {
        bytes memory b_fixDirectory = bytes(fixDirectory);
        isNull = true;
        DirectoryFrame memory directoryFrame;
        DirectoryFrame memory searchFrame;
        for (uint256 i = 0;i < DirectoryFrameCount;i++){
            searchFrame = DirectoryFrames[i];
            if(searchFrame.DirectoryCount == directoryCount && searchFrame.DirectoryLength == directoryLength)
            {
                bytes memory directory = bytes(searchFrame.Directory);
                if(Infrastructure.bytesEquals(directory,b_fixDirectory)) {
                    directoryFrame = searchFrame;
                    isNull = false;
                }
            }
        }
        return (isNull,directoryFrame);
    }

    function getDirectoriesByPath(string memory directory) public view returns (bool isNull, DirectoryFrame[] memory directories, uint256 count)
    {
        (, string memory fixDirectory, uint256 directoryCount, uint256 directoryLength) = directoryProcess(directory);
        (bool d_isNull , DirectoryFrame memory d_directoryFrame) = getDirectory(fixDirectory,directoryCount, directoryLength);
        bool rootDirectory = directoryCount == 0 && directoryLength == 0;
        if(d_isNull && !rootDirectory) {
           return (true, directories,0);
        }
        bytes memory directoryId = bytes("");
        if(!rootDirectory)
            directoryId = bytes(d_directoryFrame.Id);
        DirectoryFrame memory searchFrame;
        uint256 i = 0;
        count = 4;
        directories = new DirectoryFrame[](count);
        uint256 j = 0;
        for (i = 0; i < DirectoryFrameCount;i++) {
            if(i == count)
            {
                uint256 newCount =  count + 4;
                directories = resizeDirectoryFrame(directories, count, newCount);
            }
            searchFrame = DirectoryFrames[i];
            bytes memory parentId = bytes(searchFrame.ParentId);
            if(Infrastructure.bytesEquals(directoryId,parentId)) {
                d_isNull = false;
                directories[j] = searchFrame;
                j++;
            }
        }
        return (false, directories, j);
    }
    
    function resizeDirectoryFrame(DirectoryFrame[] memory df1, uint256 oldSize,uint256 newSize) private pure returns(DirectoryFrame[] memory)
    {
        DirectoryFrame[] memory df2 = new DirectoryFrame[](newSize);
        for (uint256 i = 0;i < oldSize; i++)
        {
            df2[i] = df1[i];
        }
        return df2;
    }
    // function getFileName(uint _index) private view returns (string memory fileName) {
    //     FileFrame storage fileFrame = FileFrames[_index];
    //     return (fileFrame.Name);
    // }

    function directoryProcess(string memory directory)
    public pure returns (string[] memory, string memory, uint256, uint256) 
    { 
        uint256 count = 0;
        uint256 length = 0;
        bytes memory b_directory = bytes(directory);
        uint256 b_directoryLength = b_directory.length;
        bytes memory fixedchars_directory = new bytes(b_directory.length);
        if(b_directory[0] != 0x2f)
        {
            revert unsupportedDirectory();
        }
        for(uint i = 1; i < b_directoryLength; i++)
        {
            if(i == (b_directoryLength - 1) && b_directory[i] == 0x2f)
            {
                continue;
            }
            if(b_directory[i] == 0x2f)
            {
                count++;
            }
            fixedchars_directory[length] = b_directory[i];
            length++;
        }
        bytes memory strResult = new bytes(length);
        bytes memory resultName = new bytes(250);
        uint256 nameCount = 0;
        uint directoryIndex = 0;
        string[] memory resultDirectories = new string[](count + 1);
        for(uint i = 0; i < length; i++)
        {
            bytes1 b_char = fixedchars_directory[i];
            bool lastIndex = i == (length - 1);
            bool isSlash = (b_char == 0x2f);
            if(!isSlash) 
            {
                resultName[nameCount] = b_char;
                nameCount++;
            }  
            if(isSlash || lastIndex)
            {
                resultDirectories[directoryIndex] = (string(Infrastructure.copyBytes(resultName,nameCount)));
                directoryIndex++;
                nameCount= 0;
            }      
            if(nameCount > 230)
            {
                revert unsupportedDirectory();
            }
            strResult[i] = b_char;
        }
        return(resultDirectories,string(strResult), count, length);
    }

    function fileNameProcess(string memory fullName) public pure returns(string memory, string memory){
        bytes memory b_fullName = bytes(fullName);
        bytes memory extension = new bytes(50);
        if(b_fullName.length > 230){
            revert unsupportedFile();
        }
        uint extensionCount = 0;
        uint i = (b_fullName.length - 1);
        if(b_fullName[i] == 0x2E){
            revert unsupportedFile();
        }
        for(;;i--)
        {         
            bytes1 b_char = b_fullName[i];
            if(b_char == 0x2E)
            {
                break;
            }
            if(extensionCount > 49){
                revert unsupportedFile();
            }   
            extension[extensionCount] = b_char;
            extensionCount++;
            if(i == 0)
            {
                revert unsupportedFile();
            }
        }
        extension = Infrastructure.copyBytes(extension,extensionCount);
        extension = Infrastructure.reverseBytes(extension);
        uint256 nameCount = (b_fullName.length - extensionCount -1);
        bytes memory fileName = Infrastructure.copyBytes(b_fullName,nameCount);
        return (string(extension), string(fileName));
    }

    function getNewId() private view returns (string memory newId){
        return (Strings.toString(block.timestamp));
    } 
}