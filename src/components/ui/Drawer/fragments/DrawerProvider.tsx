'use client';

import React from 'react';
import DrawerProviderContext from '../context/DrawerProviderContext';

export type DrawerProviderProps = { children?: React.ReactNode };

/**
 * Wrap the app to let `Drawer.Indent` and `Drawer.IndentBackground` react when any drawer
 * inside is open. Renders no element.
 */
const DrawerProvider = ({ children }: DrawerProviderProps) => {
    const [openCount, setOpenCount] = React.useState(0);
    const registerOpen = React.useCallback(() => {
        setOpenCount((count) => count + 1);
        let done = false;
        return () => {
            if (done) return;
            done = true;
            setOpenCount((count) => Math.max(0, count - 1));
        };
    }, []);
    const value = React.useMemo(() => ({ active: openCount > 0, registerOpen }), [openCount, registerOpen]);
    return <DrawerProviderContext.Provider value={value}>{children}</DrawerProviderContext.Provider>;
};

DrawerProvider.displayName = 'DrawerProvider';

export default DrawerProvider;
