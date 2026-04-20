'use client';
import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import { DrawerContext } from '../context/DrawerContext';
import DialogPrimitive from '~/core/primitives/Dialog';

const COMPONENT_NAME = 'DrawerV2';

type DrawerRootElement = React.ElementRef<typeof DialogPrimitive.Root>;
type DialogPrimitiveRootProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root>;

export type DrawerRootProps = DialogPrimitiveRootProps & {
    customRootClass?: string;
    className?: string;
    swipeDirection?: 'left' | 'right' | 'top' | 'bottom';
};

const DrawerRoot = forwardRef<DrawerRootElement, DrawerRootProps>(({
    children,
    customRootClass = '',
    className = '',
    swipeDirection = 'right',
    ...props
}, ref) => {
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);

    const contextProps = { rootClass, swipeDirection };

    return (
        <DialogPrimitive.Root
            ref={ref}
            className={clsx(rootClass, className)}
            {...props}
        >
            <DrawerContext.Provider value={contextProps}>
                {children}
            </DrawerContext.Provider>
        </DialogPrimitive.Root>
    );
});

DrawerRoot.displayName = COMPONENT_NAME;

export default DrawerRoot;
