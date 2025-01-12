import React, { useState } from 'react';
import AlertDialogRoot from './fragments/AlertDialogRoot';
import AlertDialogContent from './fragments/AlertDialogContent';
import AlertDialogTrigger from './fragments/AlertDialogTrigger';
import AlertDialogPortal from './fragments/AlertDialogPortal';
import AlertDialogOverlay from './fragments/AlertDialogOverlay';
import AlertDialogCancel from './fragments/AlertDialogCancel';
import AlertDialogAction from './fragments/AlertDialogAction';

export type AlertDialogProps = {
    children: React.ReactNode;
    content: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

const AlertDialog = ({ children, open = false, onOpenChange = () => {}, content } : AlertDialogProps) => {
    const [isOpen, setIsOpen] = useState(open);  
     
    return (
        <AlertDialogRoot open={isOpen} onOpenChange={onOpenChange}>
            <AlertDialogTrigger>
                {children}
            </AlertDialogTrigger>

            <AlertDialogPortal>
                <AlertDialogOverlay/>
                <AlertDialogContent>
                    {content}
                    <AlertDialogCancel>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction>
                        Continue
                    </AlertDialogAction>
                </AlertDialogContent>

            </AlertDialogPortal>

        </AlertDialogRoot>
    );
};

export default AlertDialog;
