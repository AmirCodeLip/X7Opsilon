import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ContractContextProvider } from "./Contexts/ContractContext";
import { getThemeColor } from "./ThemeProvider";
import { CookiesProvider } from 'react-cookie';


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
