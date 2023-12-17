import { ethers } from "ethers";
import ContractLogic from "./X7OpsilonInformation/Implementations/ContractLogic";
import { X7FileProcess } from "./X7OpsilonInformation/Implementations/ContractLogicTypes";

export interface ContractContextType {
    applicationState: ApplicationStates;
    statusInfo: StatusInfo;
    fileManager: ContractLogic;
    provider: ethers.BrowserProvider | null;
    uploadProsses: X7FileProcess[],
    rightModalState: SideModalState,
    setRightModalState: React.Dispatch<React.SetStateAction<SideModalState>>,
    setStatusInfo: React.Dispatch<React.SetStateAction<StatusInfo>>;
    setProvider: React.Dispatch<React.SetStateAction<ethers.BrowserProvider | null>>;
    setApplicationState: React.Dispatch<React.SetStateAction<ApplicationStates>>;
    addUploadProsses: (uploadProcess: X7FileProcess) => void;
}

declare global {
    interface Window {
        ethereum?: ethers.Eip1193Provider;
        changeTheme(themeName: string): void,
        connectionCancellation: undefined | "MetamaskCanceled"
    }
}

export enum ApplicationStates {
    started, metamaskConnecting, metamaskConnected
}

export enum StatusType {
    valid, error
}

export enum SideModalState {
    close, showDirectory, showUploads
}

export class StatusInfo {

    constructor(status?: StatusType, msg?: string) {
        this.status = status ? status : this.status;
        this.msg = msg;
    }
    status: StatusType = StatusType.valid;
    msg?: string;
}
