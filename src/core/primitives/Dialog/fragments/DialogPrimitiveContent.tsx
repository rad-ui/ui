'use client';
import React, { forwardRef, useContext } from 'react';
import { DialogPrimitiveContext } from '../context/DialogPrimitiveContext';
import Floater from '~/core/primitives/Floater';

export type DialogPrimitiveContentProps = {
    children: React.ReactNode;
    className?: string;
    asChild?: boolean;
    forceMount?: boolean;
    role?: string;
    'aria-modal'?: boolean;
    'aria-labelledby'?: string;
    'aria-describedby'?: string;
}

const DialogPrimitiveContent = forwardRef<HTMLDivElement, DialogPrimitiveContentProps>(({
    children,
    asChild = false,
    forceMount = false,
    role = 'dialog',
    'aria-modal': ariaModal = true,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    ...props
}, ref) => {
    const { isOpen, getFloatingProps, floaterContext, refs } = useContext(DialogPrimitiveContext);

    const mergedRef = Floater.useMergeRefs([refs.setFloating, ref]);
    const shouldRender = isOpen || forceMount;
    const dataState = isOpen ? 'open' : 'closed';

    return (
        <>
            {shouldRender && (
                <Floater.FocusManager context={floaterContext} returnFocus={true}>
                    <div
                        ref={mergedRef}
                        {...getFloatingProps()}
                        role={role}
                        aria-modal={ariaModal}
                        aria-labelledby={ariaLabelledBy}
                        aria-describedby={ariaDescribedBy}
                        data-state={dataState}
                        {...props}
                    >
                        {children}
                    </div>
                </Floater.FocusManager>
            )}
        </>
    );
});

DialogPrimitiveContent.displayName = 'DialogPrimitiveContent';

export default DialogPrimitiveContent;
