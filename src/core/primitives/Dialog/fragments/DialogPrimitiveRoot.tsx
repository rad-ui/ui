'use client';
import React, { useState } from 'react';
import { customClassSwitcher } from '~/core';
import { DialogPrimitiveContext } from '../context/DialogPrimitiveContext';
import { clsx } from 'clsx';
import Floater from '~/core/primitives/Floater';

export type AlertDialogRootProps = {
    children: React.ReactNode;
    customRootClass?: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onClickOutside?: () => void;
    className?: string;
}

const COMPONENT_NAME = 'DialogPrimitive';

const DialogPrimitiveRoot = ({ children, className = '', customRootClass = '', open, onOpenChange = () => {}, onClickOutside = () => {} } : DialogPrimitiveRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
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

    const props = { isOpen, handleOpenChange, floaterContext, rootClass, handleOverlayClick, getReferenceProps, getFloatingProps, getItemProps, refs, floatingStyles };
    return (
        <DialogPrimitiveContext.Provider value={props}>
            <div className={clsx(rootClass, className)} >
                {children}
            </div>
        </DialogPrimitiveContext.Provider>
    );
};

DialogPrimitiveRoot.displayName = COMPONENT_NAME;
export default DialogPrimitiveRoot;
