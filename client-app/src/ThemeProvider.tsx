import React from "react";
interface IconProps {
    height?: string,
    width?: string,
    className?: string | undefined,
    fill?: string,
    stroke?: string,
    onClick?: React.MouseEventHandler<SVGSVGElement> | undefined
}

export enum themes {
    whiteBlueTheme, darkBlueTheme
}

export const Icons = {
    Close_FILL0_wght400_GRAD0_opsz24(props: IconProps) {
        return (<svg xmlns="http://www.w3.org/2000/svg" onClick={props.onClick} className={props.className} fill={props.fill} viewBox="0 -960 960 960">
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>);
    },
    Metamask(props: IconProps) {
        return (<svg xmlns="http://www.w3.org/2000/svg" className={props.className} viewBox="0 0 507.83 470.86">
            <defs>
                <style>{".a{fill:#e2761b;stroke:#e2761b;}.a,.b,.c,.d,.e,.f,.g,.h,.i,.j{stroke-linecap:round;stroke-linejoin:round;}.b{fill:#e4761b;stroke:#e4761b;}.c{fill:#d7c1b3;stroke:#d7c1b3;}.d{fill:#233447;stroke:#233447;}.e{fill:#cd6116;stroke:#cd6116;}.f{fill:#e4751f;stroke:#e4751f;}.g{fill:#f6851b;stroke:#f6851b;}.h{fill:#c0ad9e;stroke:#c0ad9e;}.i{fill:#161616;stroke:#161616;}.j{fill:#763d16;stroke:#763d16;}"}</style>
            </defs><title>metamask</title><polygon className="a" points="482.09 0.5 284.32 147.38 320.9 60.72 482.09 0.5" /><polygon className="b" points="25.54 0.5 221.72 148.77 186.93 60.72 25.54 0.5" /><polygon className="b" points="410.93 340.97 358.26 421.67 470.96 452.67 503.36 342.76 410.93 340.97" /><polygon className="b" points="4.67 342.76 36.87 452.67 149.57 421.67 96.9 340.97 4.67 342.76" /><polygon className="b" points="143.21 204.62 111.8 252.13 223.7 257.1 219.73 136.85 143.21 204.62" /><polygon className="b" points="364.42 204.62 286.91 135.46 284.32 257.1 396.03 252.13 364.42 204.62" /><polygon className="b" points="149.57 421.67 216.75 388.87 158.71 343.55 149.57 421.67" /><polygon className="b" points="290.88 388.87 358.26 421.67 348.92 343.55 290.88 388.87" /><polygon className="c" points="358.26 421.67 290.88 388.87 296.25 432.8 295.65 451.28 358.26 421.67" /><polygon className="c" points="149.57 421.67 212.18 451.28 211.78 432.8 216.75 388.87 149.57 421.67" /><polygon className="d" points="213.17 314.54 157.12 298.04 196.67 279.95 213.17 314.54" /><polygon className="d" points="294.46 314.54 310.96 279.95 350.71 298.04 294.46 314.54" /><polygon className="e" points="149.57 421.67 159.11 340.97 96.9 342.76 149.57 421.67" /><polygon className="e" points="348.72 340.97 358.26 421.67 410.93 342.76 348.72 340.97" /><polygon className="e" points="396.03 252.13 284.32 257.1 294.66 314.54 311.16 279.95 350.91 298.04 396.03 252.13" /><polygon className="e" points="157.12 298.04 196.87 279.95 213.17 314.54 223.7 257.1 111.8 252.13 157.12 298.04" /><polygon className="f" points="111.8 252.13 158.71 343.55 157.12 298.04 111.8 252.13" /><polygon className="f" points="350.91 298.04 348.92 343.55 396.03 252.13 350.91 298.04" /><polygon className="f" points="223.7 257.1 213.17 314.54 226.29 382.31 229.27 293.07 223.7 257.1" /><polygon className="f" points="284.32 257.1 278.96 292.87 281.34 382.31 294.66 314.54 284.32 257.1" /><polygon className="g" points="294.66 314.54 281.34 382.31 290.88 388.87 348.92 343.55 350.91 298.04 294.66 314.54" /><polygon className="g" points="157.12 298.04 158.71 343.55 216.75 388.87 226.29 382.31 213.17 314.54 157.12 298.04" /><polygon className="h" points="295.65 451.28 296.25 432.8 291.28 428.42 216.35 428.42 211.78 432.8 212.18 451.28 149.57 421.67 171.43 439.55 215.75 470.36 291.88 470.36 336.4 439.55 358.26 421.67 295.65 451.28" /><polygon className="i" points="290.88 388.87 281.34 382.31 226.29 382.31 216.75 388.87 211.78 432.8 216.35 428.42 291.28 428.42 296.25 432.8 290.88 388.87" /><polygon className="j" points="490.44 156.92 507.33 75.83 482.09 0.5 290.88 142.41 364.42 204.62 468.37 235.03 491.43 208.2 481.49 201.05 497.39 186.54 485.07 177 500.97 164.87 490.44 156.92" /><polygon className="j" points="0.5 75.83 17.39 156.92 6.66 164.87 22.56 177 10.44 186.54 26.34 201.05 16.4 208.2 39.26 235.03 143.21 204.62 216.75 142.41 25.54 0.5 0.5 75.83" /><polygon className="g" points="468.37 235.03 364.42 204.62 396.03 252.13 348.92 343.55 410.93 342.76 503.36 342.76 468.37 235.03" /><polygon className="g" points="143.21 204.62 39.26 235.03 4.67 342.76 96.9 342.76 158.71 343.55 111.8 252.13 143.21 204.62" /><polygon className="g" points="284.32 257.1 290.88 142.41 321.1 60.72 186.93 60.72 216.75 142.41 223.7 257.1 226.09 293.27 226.29 382.31 281.34 382.31 281.74 293.27 284.32 257.1" /></svg>)
    },
    loading(props: IconProps) {
        return (<svg xmlns="http://www.w3.org/2000/svg" className={props.className} viewBox="0 0 24 24">
            <style>{`.color{fill:${(props.fill ? props.fill : "")};stroke:${(props.stroke ? props.stroke : "")};}.spinner_S1WN{animation:spinner_MGfb .8s linear infinite;animation-delay:-.8s}.spinner_Km9P{animation-delay:-.65s}.spinner_JApP{animation-delay:-.5s}@keyframes spinner_MGfb{93.75%,100%{opacity:.2}}`}</style>
            <circle className="spinner_S1WN color" cx="4" cy="12" r="3" />
            <circle className="spinner_S1WN color spinner_Km9P" cx="12" cy="12" r="3" />
            <circle className="spinner_S1WN color spinner_JApP" cx="20" cy="12" r="3" />
        </svg>)
    },
    Folder_FILL0_wght700_GRAD200_opsz48(props: IconProps) {
        return (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"
            fill={props.fill} stroke={props.stroke} className={props.className}>
            <path xmlns="http://www.w3.org/2000/svg" d="M150-139q-37.175 0-64.088-27.094Q59-193.188 59-230v-500q0-37.225 26.912-64.613Q112.825-822 150-822h263l68 69h329q37.225 0 64.613 27.094Q902-698.812 902-662v432q0 36.812-27.387 63.906Q847.225-139 810-139H150Zm0-91h660v-432H444l-68-68H150v500Zm0 0v-500 500Z" />
        </svg>);
    },
    Unknown_document_FILL0_wght700_GRAD200_opsz48(props: IconProps) {
        return (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill={props.fill} stroke={props.stroke} className={props.className}>
            <path d="M189-810v286-4 378-660 182-182Zm92 391h166q12.524-20.342 29.401-37.008Q493.277-472.675 514-487H281v68Zm0 169h123q-2-18-2-34t3-35H281v69ZM189-59q-35.775 0-63.388-26.912Q98-112.825 98-150v-660q0-37.588 27.612-64.794Q153.225-902 189-902h364l230 228v178q-23.78-12-46.39-18.5T691-524v-104H505v-182H189v660h249q15 30 37.5 53T525-59H189Zm463.905-409q78.605 0 134.35 56.15Q843-355.701 843-277.095q0 78.605-55.846 134.35Q731.309-87 653.134-87q-78.589 0-134.862-55.846Q462-198.691 462-276.866q0-78.589 56.15-134.862Q574.299-468 652.905-468Zm.473 330q14.271 0 23.946-8.784 9.676-8.784 9.676-25T677.27-197q-9.729-9-24-9-14.27 0-23.77 9.273-9.5 9.274-9.5 23.808Q620-156 629.554-147t23.824 9ZM628-234h51v-11.704q0-10.875 6-20.085 6-9.211 14.545-18.011 15.988-11.141 26.222-25.337Q736-323.333 736-346.857q0-35.502-23.802-56.323Q688.396-424 653.077-424 626-424 603-407q-23 17-32 45.486L617.343-341q2.066-16 11.862-26 9.795-10 24.287-10 13 0 22.754 8.5Q686-360 686-347q0 9.535-6.923 18.217-6.923 8.683-14.154 15.454Q659-309 649.048-300.615q-9.953 8.384-14.762 18.046-3.786 7.592-5.036 14.544-1.25 6.952-1.25 16.464V-234Z" />
        </svg>);
    },
    Folder(props: IconProps) {
        return (<svg xmlns="http://www.w3.org/2000/svg" className={props.className} x="0px" y="0px" viewBox="0 0 72 72">
            <path fill="var(--A11221)" d="M57.5,31h-23c-1.4,0-2.5-1.1-2.5-2.5v-10c0-1.4,1.1-2.5,2.5-2.5h23c1.4,0,2.5,1.1,2.5,2.5v10	C60,29.9,58.9,31,57.5,31z"></path>
            <path fill="var(--A21221)" d="M59.8,61H12.2C8.8,61,6,58,6,54.4V17.6C6,14,8.8,11,12.2,11h18.5c1.7,0,3.3,1,4.1,2.6L38,24h21.8	c3.4,0,6.2,2.4,6.2,6v24.4C66,58,63.2,61,59.8,61z"></path>
            <path fill="var(--A31221)" d="M7.7,59c2.2,2.4,4.7,2,6.3,2h45c1.1,0,3.2,0.1,5.3-2H7.7z"></path>
        </svg>);
    },
    Rainy_FILL0_wght400_GRAD0_opsz24(props: IconProps) {
        return (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className={props.className} height={props.height} width={props.width}>
            <path fill={props.fill} stroke={props.stroke} d="M558-84q-15 8-30.5 2.5T504-102l-60-120q-8-15-2.5-30.5T462-276q15-8 30.5-2.5T516-258l60 120q8 15 2.5 30.5T558-84Zm240 0q-15 8-30.5 2.5T744-102l-60-120q-8-15-2.5-30.5T702-276q15-8 30.5-2.5T756-258l60 120q8 15 2.5 30.5T798-84Zm-480 0q-15 8-30.5 2.5T264-102l-60-120q-8-15-2.5-30.5T222-276q15-8 30.5-2.5T276-258l60 120q8 15 2.5 30.5T318-84Zm-18-236q-91 0-155.5-64.5T80-540q0-83 55-145t136-73q32-57 87.5-89.5T480-880q90 0 156.5 57.5T717-679q69 6 116 57t47 122q0 75-52.5 127.5T700-320H300Zm0-80h400q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-40q0-66-47-113t-113-47q-48 0-87.5 26T333-704l-10 24h-25q-57 2-97.5 42.5T160-540q0 58 41 99t99 41Zm180-200Z" />
        </svg>)
    }
}

const whiteBlueTheme: any = {
    A10000: "#FFFFFF",
    A12500: "#F5F5F5",
    A19500: "#000000",
    A15500: "#EBEBEB",
    A00000: "#E4761B",
    A11111: "#919191",
    A11191: "#8094AE",
    A23456: "#E5E9F2",
    // --------folder----------
    A11221: "#6C87FE",
    A21221: "#8AA3FF",
    A31221: "#798BFF",
    // --------folder----------
    A99999: "#DBDFEA",
};

const darkBlueTheme: any = {
    A10000: "#FFFFFF",
    A12500: "#060818",
    A19500: "#E0E6Ed",
    A15500: "#212122",
    A00000: "#E4761B",
    A11111: "#B7D3E4",
    A11191: "#8094AE",
    A23456: "#555D50",
    // --------folder----------
    A11221: "#6C87FE",
    A21221: "#8AA3FF",
    A31221: "#798BFF"
    // --------folder----------

    //folder color// A11221: "#424d63",
};

//Violet theme A11193: "#973FFF",


export function getThemeColor(themeName?: themes) {
    let theme: any;
    switch (themeName) {
        case themes.darkBlueTheme:
            theme = darkBlueTheme;
            break;
        default:
            theme = whiteBlueTheme;
            break;
    }
    let colorBase = ":root {";
    let style = "";
    for (let key in theme) {
        let nkey = `--${key}`;
        colorBase += `${nkey}:${theme[key]};`;
        style += `.bg-${key}{background-color:var(${nkey})}`;
        style += `.color-${key}{color:var(${nkey})}`;
        style += `.hover-color-${key}:hover{color:var(${nkey})}`;
        style += `.hover-border-${key}:hover{border-color:var(${nkey})}`;
        style += `.border-${key}{border-color:var(${nkey})}`;
    }
    colorBase += "}";

    return colorBase + style;
}