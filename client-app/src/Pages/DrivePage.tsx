import React from 'react';
import { ContractContext } from "./../Contexts/ContractContext";
import { Icons } from '../ThemeProvider';

export default function DrivePage() {
    const contractContext = React.useContext(ContractContext)!!;
    const folderRef = React.createRef<HTMLInputElement>();

    contractContext.fileManager.getDirectoriesByPath("/").then(x => {
        console.log(x);
    });
    const createFolder = async () => {
        await contractContext.fileManager.createDirectory(folderRef.current?.value!);
        await contractContext.fileManager.getDirectoriesByPath("/");
    };
    return (
        <div className="App">
            <input ref={folderRef} type='text'></input>
            <a onClick={createFolder}>create folder</a>
        </div>
    );
}