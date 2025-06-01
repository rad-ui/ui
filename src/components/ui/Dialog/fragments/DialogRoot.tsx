'use client';
import React from 'react';

import { DialogContext } from '../context/DialogContext';
import DialogPrimitive from '~/core/primitives/Dialog';
import { clsx } from 'clsx';
import { customClassSwitcher } from '~/core';

const COMPONENT_NAME = 'Dialog';

export type DialogRootProps = {
    children: React.ReactNode;
    customRootClass?: string;
    className?: string;
}

const DialogRoot = ({ children, customRootClass = '', className = '', ...props }: DialogRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const contextProps = { rootClass };

    return <DialogPrimitive.Root className={clsx(rootClass, className)} {...props}>
        <DialogContext.Provider value={contextProps}>
            {children}
        </DialogContext.Provider>
    </DialogPrimitive.Root>;
};

export default DialogRoot;
