'use client';
import React, { forwardRef, useState, useEffect } from 'react';
import { DialogPrimitiveContext } from '../context/DialogPrimitiveContext';
import Floater from '~/core/primitives/Floater';

export type DialogPrimitiveRootProps = {
    children: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    onClickOutside?: () => void;
    className?:string;
    /** When true, outside pointer events and escape key will not close the dialog. */
    disablePointerDismissal?: boolean;
}

const COMPONENT_NAME = 'DialogPrimitive';

const DialogPrimitiveRootInner = forwardRef<HTMLDivElement, DialogPrimitiveRootProps>(({ children, open = false, onOpenChange = () => {}, onClickOutside = () => {}, className, disablePointerDismissal = false, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(open);
    const nodeId = Floater.useFloatingNodeId();

    // Sync internal state with the open prop
    useEffect(() => {
        setIsOpen(open);
    }, [open]);

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        onOpenChange(open);
    };
    const handleOverlayClick = () => {
        if (disablePointerDismissal) return;
        onClickOutside();
        handleOpenChange(false);
    };

    const { context: floaterContext, refs, floatingStyles } = Floater.useFloating({
        open: isOpen,
        nodeId,
        onOpenChange: handleOpenChange
    });

    const dismiss = Floater.useDismiss(floaterContext, {
        bubbles: false,
        escapeKey: !disablePointerDismissal,
        outsidePress: !disablePointerDismissal,
    });
    const role = Floater.useRole(floaterContext, { role: 'dialog' });

    const { getReferenceProps, getFloatingProps, getItemProps } = Floater.useInteractions([
        dismiss,
        role
    ]);

    const contextProps = { isOpen, handleOpenChange, floaterContext, handleOverlayClick, getReferenceProps, getFloatingProps, getItemProps, refs, floatingStyles };
    return (
        <DialogPrimitiveContext.Provider value={contextProps}>
            <Floater.FloatingNode id={nodeId}>
                <div
                    ref={ref}
                    data-state={isOpen ? 'open' : 'closed'}
                    {...props}
                    className={className}
                >
                    {children}
                </div>
            </Floater.FloatingNode>
        </DialogPrimitiveContext.Provider>
    );
});

DialogPrimitiveRootInner.displayName = `${COMPONENT_NAME}Inner`;

const DialogPrimitiveRoot = forwardRef<HTMLDivElement, DialogPrimitiveRootProps>(({ disablePointerDismissal = false, ...props }, ref) => {
    const floatingTree = Floater.useFloatingTree();

    if (floatingTree) {
        return <DialogPrimitiveRootInner ref={ref} disablePointerDismissal={disablePointerDismissal} {...props} />;
    }

    return (
        <Floater.FloatingTree>
            <DialogPrimitiveRootInner ref={ref} disablePointerDismissal={disablePointerDismissal} {...props} />
        </Floater.FloatingTree>
    );
});

DialogPrimitiveRoot.displayName = COMPONENT_NAME;
export default DialogPrimitiveRoot;
