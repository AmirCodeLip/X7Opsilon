import { themes } from "./ThemeProvider";
import { Cookie, CookieSetOptions } from 'universal-cookie';
type SetCookiesType = (name: "settingCookie", value: any, options?: CookieSetOptions | undefined) => void;
export class Setting {
    private metamaskConnected: boolean = false;
    private setCookies: SetCookiesType;
    private themeColor: themes = themes.whiteBlueTheme;
    constructor(settingCookie: any | undefined, setCookies: SetCookiesType) {
        this.setCookies = setCookies;
        if (settingCookie) {
            if (settingCookie.metamaskConnected === true)
                this.metamaskConnected = true;
            if (settingCookie.themeColor) {
                this.themeColor = settingCookie.themeColor;
            }
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
        var expires = new Date();
        expires.setDate(expires.getDate() + 360);
        let data: any = {
            metamaskConnected: this.metamaskConnected,
            themeColor: this.themeColor,
            lastUpdate: new Date()
        };
        this.setCookies("settingCookie", JSON.stringify(data), { expires: expires });
    }
}