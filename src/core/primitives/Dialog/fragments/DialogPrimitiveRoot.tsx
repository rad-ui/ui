'use client';
import React, { useState } from 'react';
import { DialogPrimitiveContext } from '../context/DialogPrimitiveContext';
import Floater from '~/core/primitives/Floater';

export type DialogPrimitiveRootProps = {
    children: React.ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onClickOutside?: () => void;
}

const COMPONENT_NAME = 'DialogPrimitive';

const DialogPrimitiveRoot = ({ children, open, onOpenChange = () => {}, onClickOutside = () => {}, ...props } : DialogPrimitiveRootProps) => {
    const [isOpen, setIsOpen] = useState(open);
    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        onOpenChange(open);
    };
    const handleOverlayClick = () => {
        onClickOutside();
    };

    const { context: floaterContext, refs, floatingStyles } = Floater.useFloating({
        open: isOpen,
        onOpenChange: handleOpenChange
    });

    const dismiss = Floater.useDismiss(floaterContext);
    const role = Floater.useRole(floaterContext, { role: 'dialog' });

    const { getReferenceProps, getFloatingProps, getItemProps } = Floater.useInteractions([
        dismiss,
        role
    ]);

    const contextProps = { isOpen, handleOpenChange, floaterContext, handleOverlayClick, getReferenceProps, getFloatingProps, getItemProps, refs, floatingStyles };
    return (
        <DialogPrimitiveContext.Provider value={contextProps}>
            <div {...props}>
                {children}
            </div>
        </DialogPrimitiveContext.Provider>
    );
};

DialogPrimitiveRoot.displayName = COMPONENT_NAME;
export default DialogPrimitiveRoot;
