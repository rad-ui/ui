import React, { useState } from 'react';
import AlertDialogRoot from './shards/AlertDialogRoot';
import AlertDialogContent from './shards/AlertDialogContent';
import AlertDialogTrigger from './shards/AlertDialogTrigger';
import AlertDialogPortal from './shards/AlertDialogPortal';
import AlertDialogOverlay from './shards/AlertDialogOverlay';
import AlertDialogCancel from './shards/AlertDialogCancel';
import AlertDialogAction from './shards/AlertDialogAction';
export type AlertDialogProps = {
    children: React.ReactNode;
    content: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

const AlertDialog = ({ children, open = false, onOpenChange, content } : AlertDialogProps) => {
    const [isOpen, setIsOpen] = useState(open);
    return (
        <AlertDialogRoot open={isOpen} onOpenChange={onOpenChange} >
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
                        Action
                    </AlertDialogAction>
                </AlertDialogContent>

            </AlertDialogPortal>

        </AlertDialogRoot>
    );
};

export default AlertDialog;
