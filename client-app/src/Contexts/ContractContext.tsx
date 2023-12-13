import React from "react";
import { ContractContextType, ApplicationStates, StatusInfo, SideModalState } from "../Types";
import { ethers } from "ethers";
import { ContractLogicAddress, ContractLogicAbi } from "./../X7OpsilonInformation/ContractData";
import ContractLogic from "../X7OpsilonInformation/Implementations/ContractLogic";
import { X7FileProcess } from "./../X7OpsilonInformation/Implementations/ContractLogicTypes";

const { ethereum } = window;
export const ContractContext = React.createContext<ContractContextType | null>(null)
export const ContractContextProvider = (params: { children: JSX.Element }) => {
    const [applicationState, setApplicationState] = React.useState(ApplicationStates.started);
    const [statusInfo, setStatusInfo] = React.useState(new StatusInfo());
    const [provider, setProvider] = React.useState<ethers.BrowserProvider | null>(null);
    const [account, setAccounts] = React.useState<string | null>(null);
    const [contract, contractAccounts] = React.useState<ethers.Contract | null>(null);
    const [uploadList, setUploadList] = React.useState<X7FileProcess[]>([]);
    const [modalState, setModalState] = React.useState<SideModalState>(SideModalState.close);
    async function metamaskConnection(fromTimeout: boolean = true) {
        let state = ApplicationStates.metamaskConnecting;
        try {
            if ((fromTimeout && window.connectionCancellation === "MetamaskCanceled"))
                return;
            let accountsPromise = provider!.send("eth_requestAccounts", []);
            let accounts = await accountsPromise;
            setAccounts(accounts[0]);
            const signer = await provider!.getSigner();
            const address = await signer.getAddress();
            contractAccounts(new ethers.Contract(ContractLogicAddress, ContractLogicAbi, signer));
            state = ApplicationStates.metamaskConnected;
        } catch (ex: any) {
            if (ex.error && ex.error.code == -32002) {
                setTimeout(metamaskConnection, 5000);
            } else {
                throw ex;
            }
        } finally {
            setApplicationState(state);
        }
    }
    React.useEffect(() => {
        if (provider !== null) {
            metamaskConnection(false);
        }
    }, [provider]);
    let fileManager: ContractLogic | null = null;
    const context: ContractContextType = {
        applicationState: applicationState,
        statusInfo: statusInfo,
        provider: provider,
        uploadProsses: uploadList,
        rightModalState: modalState,
        get fileManager() {
            if (fileManager == null) {
                fileManager = new ContractLogic(contract!);
            }
            return fileManager!;
        },
        setRightModalState: setModalState,
        setStatusInfo: setStatusInfo,
        setProvider: setProvider,
        setApplicationState: setApplicationState,
        addUploadProsses: (uploadProcess) => {
            setUploadList([...uploadList, uploadProcess]);
        }
    };
    return (<ContractContext.Provider value={context} >
        {params.children}
    </ContractContext.Provider >)
}