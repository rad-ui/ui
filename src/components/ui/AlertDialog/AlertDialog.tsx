import React, { useState } from 'react';
import AlertDialogRoot from './shards/AlertDialogRoot';
import AlertDialogContent from './shards/AlertDialogContent';
import AlertDialogTrigger from './shards/AlertDialogTrigger';
import AlertDialogPortal from './shards/AlertDialogPortal';
import AlertDialogOverlay from './shards/AlertDialogOverlay';
import AlertDialogCancel from './shards/AlertDialogCancel';
export type AlertDialogProps = {
    children: React.ReactNode;
    content: React.ReactNode;
}

const AlertDialog = ({ children, open, onOpenChange, content } : AlertDialogProps) => {
    const [isOpen, setIsOpen] = useState(open);
    return (
        <AlertDialogRoot open={isOpen} onOpenChange={onOpenChange}>
            <AlertDialogTrigger>
                {children}
            </AlertDialogTrigger>

            <AlertDialogPortal>
                <AlertDialogOverlay/>
                <AlertDialogContent>
                    <div>
                        {content}
                    </div>
                    <AlertDialogCancel>
                        Cancel
                    </AlertDialogCancel>
                </AlertDialogContent>

            </AlertDialogPortal>

        </AlertDialogRoot>
    );
};

export default AlertDialog;
