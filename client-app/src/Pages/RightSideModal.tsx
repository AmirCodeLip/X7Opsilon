import { Icons } from "../ThemeProvider";
import { ContractContextType, SideModalState } from "./../Types";

export default function rightSideModal(props: { children: React.ReactNode, contractContext: ContractContextType }) {
    function closeModal() {
        props.contractContext.setRightModalState(SideModalState.close);
    }
    return (
        <div className="h-screen justify-center items-center flex blur-box absolute top-0 w-full">
            <div className="z-10 bg-A12500 w-1/3 h-full p-3 rounded-tl-md absolute right-0 top-0">
                <div className="h-6 mb-3">
                    <Icons.Close_FILL0_wght400_GRAD0_opsz24 onClick={closeModal} className="float-right w-5" fill="var(--A19500)"></Icons.Close_FILL0_wght400_GRAD0_opsz24>
                </div>
                {props.children}
            </div>
        </div>
    );
}