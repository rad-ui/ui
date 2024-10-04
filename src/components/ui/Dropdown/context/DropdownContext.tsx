import {CSSProperties, createContext} from "react";

type TDropdownContext= {
    visible: boolean;
    toggleVisibility:()=>void;
    triggerRef?: React.LegacyRef<HTMLButtonElement> | undefined;
    floatingContentRef?: React.LegacyRef<HTMLDivElement> | undefined;
    floatingContentCss: CSSProperties
}

const DropdownContext = createContext<null | TDropdownContext>(null);

export default DropdownContext;

