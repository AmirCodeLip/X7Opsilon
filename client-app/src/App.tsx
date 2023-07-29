import React from 'react';
import { ApplicationStates, StatusType } from "./Types";
import { ContractContext } from "./Contexts/ContractContext";
import ConnectPage from './Pages/ConnectPage';
import ErrorPage from './Pages/ErrorPage';
import DrivePage from './Pages/DrivePage';
import { Icons } from './ThemeProvider';


function App() {
  const contractContext = React.useContext(ContractContext)!!;
  //go to the connect page for authentication
  if (contractContext.applicationState == ApplicationStates.started || contractContext.applicationState == ApplicationStates.metamaskConnecting) {
    return (<ConnectPage></ConnectPage>);
  }
  //check if application have any error
  else if (contractContext.statusInfo.status == StatusType.Error) {
    return <ErrorPage error={contractContext.statusInfo.msg!}></ErrorPage>;
  }
  return (<>
    <nav className="border-solid border-b-2 border-A23456 bg-A12500">
      <div className="w-full flex flex-wrap items-center justify-between mx-auto py-3 px-2">
        <div className='flex rounded-t-sm'>
          <div className='flex w-12 justify-center items-center relative'>
            <div className='w-10 h-10 bg-A11221 z-0 opacity-70 absolute rounded-full'></div>
            <Icons.Folder_FILL0_wght700_GRAD200_opsz48 className='w-6 mr-3 absolute z-10 left-3'
              fill='var(--A10000)'></Icons.Folder_FILL0_wght700_GRAD200_opsz48>
          </div>
          <div className='ml-2'>
            <div className='color-A11191 text-xs font-medium'>Apps</div>
            <div className='font-roboto-regular color-A19500'>File Manager</div>
          </div>
        </div>
        <div className="flex items-center md:order-2">
          <span>Open user menu</span>
        </div>
      </div>
    </nav>
    <div className='main-body bg-A15500'>
      <DrivePage></DrivePage>
    </div>
    <footer className='border-solid border-t-2 border-A23456 p-2 relative h-16 bottom-0 w-full bg-A12500'>
      <div className='flex justify-center items-center'>
        <p className='color-A11221'>
          @copyright
        </p>
      </div>
    </footer>
  </>)
}
export default App;