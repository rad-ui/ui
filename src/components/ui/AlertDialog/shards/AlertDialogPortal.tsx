import React from 'react';
import Floater from '~/core/primitives/Floater';

export type AlertDialogPortalProps = {
    children: React.ReactNode;
}

const AlertDialogPortal = ({ children } : AlertDialogPortalProps) => {
    return (
        <Floater.Portal>
            {children}
        </Floater.Portal>
    );
};

export default AlertDialogPortal;
