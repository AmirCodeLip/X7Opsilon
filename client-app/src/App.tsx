import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ethers } from "ethers";
import { X7OpsilonAbi, X7OpsilonAddress } from "./X7OpsilonInformation/ContractData";
import X7OpsilonInterface from "./X7OpsilonInformation/Interfaces/X7OpsilonInterface";



declare global {
  interface Window {
    ethereum?: ethers.Eip1193Provider;
  }
}
enum ApplicationStates {
  started, metamaskConnecting, metamaskConnected
}
enum StatusType {
  Valid, Error
}
class StatusInfo {

  constructor(status?: StatusType, msg?: string) {
    this.status = status ? status : this.status;
    this.msg = msg;
  }
  status: StatusType = StatusType.Valid;
  msg?: string;
}

function App() {
  const [applicationState, setApplicationState] = React.useState(ApplicationStates.started);
  const [statusInfo, setStatusInfo] = React.useState(new StatusInfo());
  const [provider, setProvider] = React.useState<ethers.BrowserProvider | null>(null);
  const [account, setAccounts] = React.useState<string | null>(null);
  const [contract, setContract] = React.useState<ethers.Contract | null>(null);
  async function connectMetamask() {
    if (applicationState == ApplicationStates.metamaskConnecting) {
      return;
    }

    if (window.ethereum == null) {
      setStatusInfo(new StatusInfo(StatusType.Error, "please install metamask"));
    } else {
      if (provider == null) {
        setProvider(new ethers.BrowserProvider(window.ethereum!));
      }
    }
  }
  async function checkConnection() {
    try {
      let accountsPromise = provider!.send("eth_requestAccounts", []);
      setApplicationState(ApplicationStates.metamaskConnecting);
      let accounts = await accountsPromise;
      setAccounts(accounts[0]);
      const signer = await provider!.getSigner();
      let _contract = new ethers.Contract(X7OpsilonAddress, X7OpsilonAbi, signer);
      setContract(_contract);
      setApplicationState(ApplicationStates.metamaskConnected);
    } catch (ex: any) {
      if (ex.error && ex.error.code == -32002) {
        setApplicationState(ApplicationStates.metamaskConnecting);
        setTimeout(checkConnection, 5000);
      } else {
        throw ex;
      }
    }
  }
  React.useEffect(() => {
    if (provider !== null) {
      checkConnection();
    }
  }, [provider]);
  //go to the connect page for authentication
  if (applicationState == ApplicationStates.started || applicationState == ApplicationStates.metamaskConnecting) {
    return (<div>
      <div onClick={connectMetamask}>
        connect with metamask
        {applicationState == ApplicationStates.metamaskConnecting && (<div>connecting</div>)}
      </div>
    </div>)
  }
  ///check if application have any error
  if (statusInfo.status == StatusType.Error) {
    return (<div>
      {statusInfo.msg}
    </div>)
  }
  const fileManager = new X7OpsilonInterface(contract!);
  const folderRef = React.createRef<HTMLInputElement>();
  fileManager.getDirectoriesByPath("/").then(x => {
    console.log(x);
  });
  const createFolder = async () => {
    await fileManager.createDirectory(folderRef.current?.value!);
    await fileManager.getDirectoriesByPath("/");
  };
  return (
    <div className="App">
      <input ref={folderRef} type='text'></input>
      <a onClick={createFolder}>create folder</a>
    </div>
  );
}
export default App;
