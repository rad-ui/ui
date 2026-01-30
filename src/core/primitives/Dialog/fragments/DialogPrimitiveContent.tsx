'use client';
import React, { forwardRef, useContext } from 'react';
import { DialogPrimitiveContext } from '../context/DialogPrimitiveContext';
import Floater from '~/core/primitives/Floater';
import Primitive from '~/core/primitives/Primitive';

export type DialogPrimitiveContentProps = React.ComponentPropsWithoutRef<typeof Primitive.div> & {
    children: React.ReactNode;
    asChild?: boolean;
    forceMount?: boolean;
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
    const { isOpen, getFloatingProps, refs, handleOpenChange, floaterContext } = useContext(DialogPrimitiveContext);

    const mergedRef = Floater.useMergeRefs([refs.setFloating, ref]);
    const shouldRender = isOpen || forceMount;
    const dataState = isOpen ? 'open' : 'closed';

    return (
        <>
            {shouldRender && (
                <Floater.FocusManager
                    context={floaterContext}
                    modal={Boolean(ariaModal)}
                    initialFocus={0}
                    returnFocus={true}
                >
                    <Primitive.div
                        ref={mergedRef}
                        asChild={asChild}
                        {...getFloatingProps()}
                        style={{ outline: 'none', ...props.style }}
                        role={role}
                        aria-labelledby={isOpen ? ariaLabelledBy : undefined}
                        aria-describedby={isOpen ? ariaDescribedBy : undefined}
                        data-state={dataState}
                        aria-modal={ariaModal}
                        {...props}
                    >
                        {children}
                    </Primitive.div>
                </Floater.FocusManager>
            )}
        </>
    );
});

DialogPrimitiveContent.displayName = 'DialogPrimitiveContent';

export default DialogPrimitiveContent;
