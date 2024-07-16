'use client';
import React from "react";
import { customClassSwitcher} from "~/core";
const COMPONENT_NAME = 'Switch';

export type SwitchProps = {
    children?: React.ReactNode;
    className?: String;
    customRootClass?: string;
    props?: any;
}

const Switch = ({children,customRootClass='',className='',...props}:SwitchProps) => {
    const rootClass= customClassSwitcher(customRootClass,COMPONENT_NAME)
    return (
        <input className={rootClass} {...props} />     
    )
}

Switch.displayName = COMPONENT_NAME;
export default Switch