'use client';

import React, { forwardRef } from 'react';
import clsx from 'clsx';
import DialogPrimitive from '~/core/primitives/Dialog';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import { DrawerContext, type DrawerSwipeDirection } from '../context/DrawerContext';

const COMPONENT_NAME = 'Drawer';

type DrawerRootElement = React.ElementRef<typeof DialogPrimitive.Root>;
type DialogPrimitiveRootProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root>;

export type DrawerRootProps = DialogPrimitiveRootProps & {
    className?: string;
    customRootClass?: string;
    swipeDirection?: DrawerSwipeDirection;
};

const DrawerRoot = forwardRef<DrawerRootElement, DrawerRootProps>(({
    children,
    className = '',
    customRootClass = '',
    swipeDirection = 'down',
    ...props
}, ref) => {
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);
    const contextValue = { rootClass, swipeDirection };

    return (
        <DialogPrimitive.Root
            ref={ref}
            className={clsx(rootClass, className)}
            data-swipe-direction={swipeDirection}
            {...props}
        >
            <DrawerContext.Provider value={contextValue}>
                {children}
            </DrawerContext.Provider>
        </DialogPrimitive.Root>
    );
});

DrawerRoot.displayName = COMPONENT_NAME;

export default DrawerRoot;
