'use client';

import React from 'react';
import ThemeContext from '~/components/ui/Theme/ThemeContext';
import Floater from '~/core/primitives/Floater';
import { PopoverPrimitivePortalContext } from '../context/PopoverPrimitivePortalContext';

export type PopoverPrimitivePortalProps = {
    children: React.ReactNode;
    container?: Element | null;
    forceMount?: boolean;
};

const PopoverPrimitivePortal = ({
    children,
    container,
    forceMount = false
}: PopoverPrimitivePortalProps) => {
    const themeContext = React.useContext(ThemeContext);
    const rootElementRef = React.useRef<HTMLElement | null>(null);
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        rootElementRef.current = (container as HTMLElement | null) ||
            themeContext?.portalRootRef.current ||
            document.querySelector('[data-rad-ui-portal-root]') as HTMLElement | null ||
            themeContext?.containerRef.current ||
            document.querySelector('#rad-ui-theme-container') as HTMLElement | null ||
            document.body;
        setIsMounted(true);
    }, [container, themeContext]);

    if (!isMounted) {
        return null;
    }

    return (
        <PopoverPrimitivePortalContext.Provider value={{ forceMount }}>
            <Floater.Portal root={rootElementRef.current}>
                {children}
            </Floater.Portal>
        </PopoverPrimitivePortalContext.Provider>
    );
};

export default PopoverPrimitivePortal;
