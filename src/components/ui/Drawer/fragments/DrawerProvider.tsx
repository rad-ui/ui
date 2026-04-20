'use client';

import React, { forwardRef, useMemo, useState } from 'react';
import Primitive from '~/core/primitives/Primitive';
import DrawerProviderContext from '../context/DrawerProviderContext';

type DrawerProviderElement = React.ElementRef<typeof Primitive.div>;
type PrimitiveDivProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;

export type DrawerProviderProps = PrimitiveDivProps & {
    asChild?: boolean;
};

const DrawerProvider = forwardRef<DrawerProviderElement, DrawerProviderProps>(({
    children,
    asChild = false,
    ...props
}, ref) => {
    const [openDrawerCount, setOpenDrawerCount] = useState(0);

    const contextValue = useMemo(() => ({
        active: openDrawerCount > 0,
        registerOpenDrawer: () => {
            setOpenDrawerCount((current) => current + 1);
            return () => {
                setOpenDrawerCount((current) => Math.max(0, current - 1));
            };
        }
    }), [openDrawerCount]);

    return (
        <DrawerProviderContext.Provider value={contextValue}>
            <Primitive.div ref={ref} asChild={asChild} {...props}>
                {children}
            </Primitive.div>
        </DrawerProviderContext.Provider>
    );
});

DrawerProvider.displayName = 'DrawerProvider';

export default DrawerProvider;
