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

    // Update local state when parent state changes
    const handleOpenChange = (newOpen: boolean) => {
        setIsOpen(newOpen);
        onOpenChange(newOpen);
    };

    return (
        <AlertDialogRoot open={isOpen} onOpenChange={handleOpenChange}>
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

AlertDialog.Root = AlertDialogRoot;
AlertDialog.Content = AlertDialogContent;
AlertDialog.Trigger = AlertDialogTrigger;
AlertDialog.Portal = AlertDialogPortal;
AlertDialog.Overlay = AlertDialogOverlay;
AlertDialog.Cancel = AlertDialogCancel;
AlertDialog.Action = AlertDialogAction;

export default AlertDialog;
