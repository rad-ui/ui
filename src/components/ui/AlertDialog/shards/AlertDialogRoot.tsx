import React, { useState } from 'react';
import { customClassSwitcher } from '~/core';
import { AlertDialogContext } from '../contexts/AlertDialogContext';

import Floater from '~/core/primitives/Floater';

export type AlertDialogRootProps = {
    children: React.ReactNode;
    customRootClass?: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onClickOutside: () => void;
}

const COMPONENT_NAME = 'AlertDialog';

const AlertDialogRoot = ({ children, customRootClass = '', open, onOpenChange, onClickOutside=()=>{} } : AlertDialogRootProps) => {
    const { context: floaterContext } = Floater.useFloating();
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    const [isOpen, setIsOpen] = useState(open);

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        onOpenChange(open);
    };

    const handleOverlayClick = () => {
        onClickOutside();
    };

    const props = { isOpen, handleOpenChange, floaterContext, rootClass, handleOverlayClick };
    return (
        <AlertDialogContext.Provider value={props}>
            <div className={rootClass} >
                {children}
            </div>
        </AlertDialogContext.Provider>
    );
};

AlertDialogRoot.displayName = COMPONENT_NAME;
export default AlertDialogRoot;
