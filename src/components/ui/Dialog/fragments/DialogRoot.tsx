'use client';
import React, { forwardRef } from 'react';

import { DialogContext } from '../context/DialogContext';
import DialogPrimitive from '~/core/primitives/Dialog';
import clsx from 'clsx';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';

const COMPONENT_NAME = 'Dialog';

type DialogRootElement = React.ElementRef<typeof DialogPrimitive.Root>;
type DialogPrimitiveRootProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root>;

export type DialogRootProps = DialogPrimitiveRootProps & {
    customRootClass?: string;
    className?: string;
};

const DialogRoot = forwardRef<DialogRootElement, DialogRootProps>(({ children, customRootClass = '', className = '', ...props }, ref) => {
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);

    const contextProps = { rootClass };

    return (
        <DialogPrimitive.Root ref={ref} className={clsx(rootClass, className)} {...props}>
            <DialogContext.Provider value={contextProps}>
                {children}
            </DialogContext.Provider>
        </DialogPrimitive.Root>
    );
});

DialogRoot.displayName = COMPONENT_NAME;

export default DialogRoot;
