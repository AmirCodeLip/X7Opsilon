import React from 'react';
import { ContractContext } from './../Contexts/ContractContext';
import { ApplicationStates, StatusInfo, StatusType } from './../Types';
import { Icons } from "./../ThemeProvider";
import { ethers } from "ethers";
import { useCookies } from 'react-cookie';
import { Cookie, CookieSetOptions } from 'universal-cookie';

type SetCookiesType = (name: "settingCookie", value: any, options?: CookieSetOptions | undefined) => void;

class Setting {
    private metamaskConnected: boolean = false;
    private setCookies: SetCookiesType;
    constructor(settingCookie: any | undefined, setCookies: SetCookiesType) {
        this.setCookies = setCookies;
        if (settingCookie) {
            if (settingCookie.metamaskConnected === true)
                this.metamaskConnected = true;
        }
    }

    public get MetamaskConnected(): boolean {
        return this.metamaskConnected;
    }

    public set MetamaskConnected(v: boolean) {
        this.metamaskConnected = v;
        this.changeCookie();
    }

    private changeCookie() {
        let data: any = { metamaskConnected: this.metamaskConnected };
        this.setCookies("settingCookie", JSON.stringify(data), {});
    }
}

export default function ConnectPage() {
    const contractContext = React.useContext(ContractContext)!!;
    const [cookies, setCookies] = useCookies(["settingCookie"]);
    let setting = new Setting(cookies.settingCookie, setCookies);
    async function connectMetamask() {
        if (contractContext.applicationState == ApplicationStates.metamaskConnecting) {
            return;
        }
        if (window.ethereum == null) {
            contractContext.setStatusInfo(new StatusInfo(StatusType.Error, "please install metamask"));
        }
        else {
            if (contractContext.provider == null) {
                setting.MetamaskConnected = true;
                contractContext.setProvider(new ethers.BrowserProvider(window.ethereum!));
            }
        }
        window.connectionCancellation = undefined;
    };
    function cancelMetamask() {
        setting.MetamaskConnected = false;
        window.connectionCancellation = "MetamaskCanceled";
        contractContext.setApplicationState(ApplicationStates.started);
    }
    let applicationState = contractContext.applicationState;
    if (setting.MetamaskConnected && applicationState != ApplicationStates.metamaskConnecting) {
        applicationState = ApplicationStates.metamaskConnecting;
    }
    React.useEffect(() => {
        if (setting.MetamaskConnected && contractContext.applicationState != ApplicationStates.metamaskConnecting) {
            connectMetamask();
        }
    }, []);
    return (<div className='h-screen justify-center items-center flex blur-box'>
        <div className='z-10 bg-A12500 w-1/2 lg:w-1/3 p-3 rounded-md'>
            <div className='h-6 mb-3'>
                <Icons.Close_FILL0_wght400_GRAD0_opsz24 className='float-right w-5' fill='var(--A19500)'></Icons.Close_FILL0_wght400_GRAD0_opsz24>
            </div>
            {applicationState == ApplicationStates.metamaskConnecting && <>
                <div className='w-full grid justify-center relative'>
                    <Icons.Metamask className="w-20"></Icons.Metamask>
                    <div className='w-full'></div>
                    <Icons.loading fill='#e2761b' stroke='#e2761b' className='ml-3 w-10 relative left-3'></Icons.loading>
                </div>
                <a className="btn btn-secondary float-right relative right-5" onClick={cancelMetamask}>
                    cancel
                </a>
            </>
            }
            {applicationState == ApplicationStates.started &&
                <div onClick={connectMetamask}>
                    <div className='font-roboto-regular justify-center items-center flex mb-4 text-3xl font-medium color-A19500'>
                        Connect a Wallet
                    </div>
                    <div className='metamask-connect flex bg-A15500 h-16 items-center cursor-pointer rounded-md'>
                        <Icons.Metamask className="w-10 ml-4"></Icons.Metamask>
                        <div className='font-roboto-regular w-5/6 text-center text-2xl font-normal color-A19500'>
                            connect with metamask
                        </div>
                    </div>
                </div>}
        </div>
    </div>);
}