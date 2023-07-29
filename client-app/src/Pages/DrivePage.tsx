import React from "react";
import { ContractContext } from "./../Contexts/ContractContext";
import { Icons } from "../ThemeProvider";
import { DirectoryBlock } from "../X7OpsilonInformation/Interfaces/ContractLogicTypes";

export default function DrivePage() {
    const contractContext = React.useContext(ContractContext)!!;
    const folderRef = React.createRef<HTMLInputElement>();
    const createFolderRef = React.createRef<HTMLButtonElement>();
    const [directories, setDirectories] = React.useState<Array<DirectoryBlock> | null>(null);
    const [modalState, setModalState] = React.useState<"none" | "showDirectoryModal">("none");
    var directoryID: string | null = null;
    var fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.multiple = true;
    fileInput.onchange = async function (this: any) {
        for (let i = 0; i < fileInput.files!.length; i++) {
            let file = fileInput.files?.item(i);
            let response = await contractContext.fileManager.uploadFile(directoryID, file!);
            if (response.success) {
                await refresh();
            }
        }
    }
    async function setup() {
        var directory = await contractContext.fileManager.getRoot();
        if (directory !== null) {
            directoryID = directory.Id;
            refresh();
        }
        else {
            setDirectories(null);
        }
    }
    async function refresh() {
        if (directoryID != null) {
            let directoryData = await contractContext.fileManager.getDirectoryData(directoryID!);
            setDirectories(directoryData.Directories);
            console.log(directoryData);
        }
    }
    function closeModal() {
        setModalState("none");
    }
    async function createFolder() {
        createFolderRef.current!.disabled = true;
        closeModal();
        let response = await contractContext.fileManager.createDirectory(folderRef.current?.value!, "");
        if (response.success) {
            await refresh();
        }
    }
    function showDirectoryModal() {
        if (folderRef.current !== null)
            folderRef.current.value = "";
        if (createFolderRef.current !== null)
            createFolderRef.current.disabled = false;
        setModalState("showDirectoryModal");
    }
    React.useEffect(() => {
        setup();
    }, []);
    return (
        <>
            <div className="border-solid border-b-2 border-A23456 py-2 bg-A12500">
                <div className="w-full block h-10">
                    <a className="btn btn-primary float-right relative right-5 ml-3" onClick={() => fileInput.click()}>
                        <span>Upload</span>
                    </a>
                    <a className="btn btn-secondary float-right relative right-5" onClick={showDirectoryModal}>
                        <span>Create</span>
                    </a>
                </div>
            </div>
            {(directories == null) &&
                <div className="absolute top-2/4 w-full color-A19500">
                    <div className="flex flex-wrap items-center justify-center">
                        <div className="border-solid border-2 px-2 border-A23456 bg-A12500 rounded-sm w-1/4 p-6">
                            <div className="basis-full font-roboto-regular font-medium text-lg">
                                no item does not exist for showing.
                            </div>
                            <div>
                                create folder or upload directory
                            </div>
                        </div>
                    </div>
                </div>
            }
            {directories != null &&
                <div className="grid mt-3 mx-2
                    lg:grid-cols-6 gap-2
                    md:grid-cols-4 md:gap-2
                    sm:grid-cols-1 sm:gap-2">
                    {directories!.map(directory =>
                        <div key={directory.Id} className="border-solid border-2 px-2 rounded-lg
                         border-A99999 bg-A12500 hover-color-A21221">
                            <div className="py-4 px-2">
                                <div className="flex justify-center"><Icons.Folder className="w-28"></Icons.Folder></div>
                                <div className="w-full h-8 mt-3 text-center cursor-default">{directory.Name}</div>
                            </div>
                        </div>
                    )}
                </div>
            }
            {modalState == "showDirectoryModal" &&
                <div className="h-screen justify-center items-center flex blur-box absolute top-0 w-full">
                    <div className="z-10 bg-A12500 w-1/3 h-full p-3 rounded-md absolute right-0 top-0">
                        <div className="h-6 mb-3">
                            <Icons.Close_FILL0_wght400_GRAD0_opsz24 onClick={closeModal} className="float-right w-5" fill="var(--A19500)"></Icons.Close_FILL0_wght400_GRAD0_opsz24>
                        </div>
                        <div className="w-full justify-center relative">
                            <div className="color-A11221">Folder Name</div>
                            <input type="text" ref={folderRef} className="border-A11221 color-A11221"></input>
                        </div>
                        <button onClick={createFolder} ref={createFolderRef} className="btn btn-primary float-right relative mt-5">
                            Create Directory
                        </button>
                    </div>
                </div >
            }
        </>
    );
}