import React, {useState} from 'react';
import {customClassSwitcher} from '~/core';
import {AlertDialogContext} from '../contexts/AlertDialogContext';

import Floater from '~/core/primitives/Floater';
import AlertDialogContent from './AlertDialogContent';
import AlertDialogPortal from './AlertDialogPortal';

export type AlertDialogRootProps = {
    children: React.ReactNode;
    customRootClass?: string;
}


const COMPONENT_NAME = 'AlertDialog';

const AlertDialogRoot = ({children, customRootClass=''} : AlertDialogRootProps) => {
    const {context: floaterContext} = Floater.useFloating();
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    const [open, setOpen] = useState(false);

    const props = {open, setOpen, floaterContext};
    return (
        <AlertDialogContext.Provider value={props}>
            <div className={rootClass}>
                {children}
            </div>
        </AlertDialogContext.Provider>
    );
};

AlertDialogRoot.displayName = COMPONENT_NAME;
export default AlertDialogRoot;
