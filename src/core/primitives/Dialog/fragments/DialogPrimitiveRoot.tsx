'use client';
import React, { forwardRef, useState, useEffect } from 'react';
import { DialogPrimitiveContext } from '../context/DialogPrimitiveContext';
import Floater from '~/core/primitives/Floater';

export type DialogPrimitiveRootProps = {
    children: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    onClickOutside?: () => void;
    className?:string
}

const COMPONENT_NAME = 'DialogPrimitive';

const DialogPrimitiveRoot = forwardRef<HTMLDivElement, DialogPrimitiveRootProps>(({ children, open = false, onOpenChange = () => {}, onClickOutside = () => {}, className, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(open);

    // Sync internal state with the open prop
    useEffect(() => {
        setIsOpen(open);
    }, [open]);

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
            <div ref={ref} {...props} className={className}>
                {children}
            </div>
        </DialogPrimitiveContext.Provider>
    );
});

DialogPrimitiveRoot.displayName = COMPONENT_NAME;
export default DialogPrimitiveRoot;
