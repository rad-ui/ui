import React, { useContext } from 'react';
import Floater from '~/core/primitives/Floater';
import { AlertDialogContext } from '../contexts/AlertDialogContext';

export type AlertDialogPortalProps = {
  children: React.ReactNode;
};

const AlertDialogPortal = ({ children }: AlertDialogPortalProps) => {
    const { rootClass } = useContext(AlertDialogContext);
    const rootElement = document.getElementsByClassName(rootClass)[0] as HTMLElement | null;

    return (
        <Floater.Portal
            root={rootElement || document.body}
        >
            {children}
        </Floater.Portal>
    );
};

export default AlertDialogPortal;
