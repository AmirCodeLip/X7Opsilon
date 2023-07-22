import { ethers } from "ethers";
import X7OpsilonInterface from "./X7OpsilonInformation/Interfaces/X7OpsilonInterface";
export interface ContractContextType {
    applicationState: ApplicationStates;
    statusInfo: StatusInfo;
    fileManager: X7OpsilonInterface;
    provider: ethers.BrowserProvider | null
    setStatusInfo: React.Dispatch<React.SetStateAction<StatusInfo>>;
    setProvider: React.Dispatch<React.SetStateAction<ethers.BrowserProvider | null>>;
    setApplicationState: React.Dispatch<React.SetStateAction<ApplicationStates>>
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
    Valid, Error
}

export class StatusInfo {

    constructor(status?: StatusType, msg?: string) {
        this.status = status ? status : this.status;
        this.msg = msg;
    }
    status: StatusType = StatusType.Valid;
    msg?: string;
}
