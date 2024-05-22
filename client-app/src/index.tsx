import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { ContractContextProvider } from "./Contexts/ContractContext";
import { getThemeColor } from "./ThemeProvider";
import { CookiesProvider } from 'react-cookie';
import { MetaMaskSDK } from "@metamask/sdk";



window.changeTheme = function (themeName: string) {
  let themeColor = document.getElementById("themeColor");
  if (themeColor) {
    themeColor.innerHTML = getThemeColor();
  }
}
window.changeTheme("darkBlueTheme");
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

function App() {

  const MMSDK = new MetaMaskSDK({
    dappMetadata: {
      name: "JavaScript example dapp",
      url: window.location.href,
    },
    infuraAPIKey: process.env.INFURA_API_KEY,
    // Other options.
  });
  debugger;
  // You can also access via window.ethereum.
  const ethereum = MMSDK.getProvider();
  return <div>test</div>
}

root.render(
  <ContractContextProvider>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </ContractContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
