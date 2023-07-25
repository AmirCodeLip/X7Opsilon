import React from 'react';
import { ContractContext } from "./../Contexts/ContractContext";
import { Icons } from '../ThemeProvider';
import { Directory } from '../X7OpsilonInformation/Interfaces/ContractLogic';

export default function DrivePage() {
    const contractContext = React.useContext(ContractContext)!!;
    const folderRef = React.createRef<HTMLInputElement>();
    const createFolderRef = React.createRef<HTMLButtonElement>();
    let [directories, setDirectories] = React.useState<Array<Directory> | null>(null);
    let [modalState, setModalState] = React.useState<"none" | "showDirectoryModal">("none");
    let paths = ['/'];
    function getRoot() {
        let root = "/" + paths.filter(x => x != '/').join("/");
        if (root[root.length - 1] != "/")
            root = root += "/";
        return root;
    }
    async function refresh() {
        var directory = await contractContext.fileManager.getRoot();
        if (directory !== null) {

        }
    }
    function closeModal() {
        setModalState("none");
    }
    async function createFolder() {
        createFolderRef.current!.disabled = true;
        closeModal();
        await contractContext.fileManager.createDirectory(folderRef.current?.value!, "");
        await refresh();
    }
    function showDirectoryModal() {
        if (folderRef.current !== null)
            folderRef.current.value = "";
        if (createFolderRef.current !== null)
            createFolderRef.current.disabled = false;
        setModalState("showDirectoryModal");
    }
    React.useEffect(() => {
        refresh();
    }, []);

    return (
        <>
            <div className='border-solid border-b-2 border-A23456 my-2 pb-2'>
                <div className="w-full block h-10">
                    <a className="btn btn-primary float-right relative right-5 ml-3">
                        <span>Upload</span>
                    </a>
                    <a className="btn btn-secondary float-right relative right-5" onClick={showDirectoryModal}>
                        <span>Create</span>
                    </a>
                </div>
            </div>
            {(directories == null) &&
                <div className='absolute top-2/4 w-full'>
                    <div className='flex flex-wrap items-center justify-center'>
                        <div className='border-solid border-2 px-2 border-A23456 rounded-sm w-1/4 p-6'>
                            <div className='basis-full font-roboto-regular font-medium text-lg'>
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
                    lg:grid-cols-8 gap-2
                    md:grid-cols-4 md:gap-2
                    sm:grid-cols-1 sm:gap-2">
                    {directories!.map(directory =>
                        <div key={directory.Id} className='border-solid border-2 px-2 border-A23456 rounded-sm'>
                            <div className='flex justify-center'><Icons.Folder className='w-28'></Icons.Folder></div>
                            <div className='flex items-center h-8'>{directory.Directory}</div>
                        </div>
                    )}
                </div>
            }
            {modalState == "showDirectoryModal" &&
                <div className='h-screen justify-center items-center flex blur-box absolute top-0 w-full'>
                    <div className='z-10 bg-A12500 w-1/3 h-full p-3 rounded-md absolute right-0 top-0'>
                        <div className='h-6 mb-3'>
                            <Icons.Close_FILL0_wght400_GRAD0_opsz24 onClick={closeModal} className='float-right w-5' fill='var(--A19500)'></Icons.Close_FILL0_wght400_GRAD0_opsz24>
                        </div>
                        <div className='w-full justify-center relative'>
                            <div className='color-A11221'>Folder Name</div>
                            <input type='text' ref={folderRef} className='border-A11221 color-A11221'></input>
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