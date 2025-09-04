'use client';
import React, { forwardRef } from 'react';
import { customClassSwitcher } from '~/core';
import { AlertDialogContext } from '../contexts/AlertDialogContext';
import { clsx } from 'clsx';

import DialogPrimitive from '~/core/primitives/Dialog';

export type AlertDialogRootProps = React.ComponentPropsWithoutRef<'div'> & {
    open?: boolean;
    customRootClass?: string;
    className?: string;
};

const COMPONENT_NAME = 'AlertDialog';

const AlertDialogRoot = forwardRef<HTMLDivElement, AlertDialogRootProps>(({ children, className = '', customRootClass = '', open = false, ...props }, ref) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const contextProps = { rootClass };
    return (
        <DialogPrimitive.Root open={open} className={clsx(rootClass, className)} {...props}>
            <AlertDialogContext.Provider value={contextProps}>
                <div ref={ref} className={clsx(rootClass, className)}>
                    {children}
                </div>
            </AlertDialogContext.Provider>
        </DialogPrimitive.Root>
    );
});

AlertDialogRoot.displayName = COMPONENT_NAME;
export default AlertDialogRoot;
