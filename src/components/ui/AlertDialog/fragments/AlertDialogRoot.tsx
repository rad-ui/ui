'use client';
import React from 'react';
import { customClassSwitcher } from '~/core';
import { AlertDialogContext } from '../contexts/AlertDialogContext';
import { clsx } from 'clsx';

import DialogPrimitive from '~/core/primitives/Dialog';

export type AlertDialogRootProps = {
    open?: boolean;
    children: React.ReactNode;
    customRootClass?: string;
    className?: string;
}

const COMPONENT_NAME = 'AlertDialog';

const AlertDialogRoot = ({ children, className = '', customRootClass = '', open = false, ...props } : AlertDialogRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const contextProps = { rootClass };
    return (
        <DialogPrimitive.Root className={clsx(rootClass, className)} {...props}>
            <AlertDialogContext.Provider value={contextProps}>
                <div className={clsx(rootClass, className)}>
                    {children}
                </div>
            </AlertDialogContext.Provider>
        </DialogPrimitive.Root>
    );
};

AlertDialogRoot.displayName = COMPONENT_NAME;
export default AlertDialogRoot;
