'use client';
import React, { useContext, useEffect, useState } from 'react';
import Floater from '~/core/primitives/Floater';
import { ComboboxPrimitiveContext } from '../contexts/ComboboxPrimitiveContext';
import { ComboboxPrimitivePortalContext } from '../contexts/ComboboxPrimitivePortalContext';
import ThemeContext from '~/components/ui/Theme/ThemeContext';

export type ComboboxPrimitivePortalProps = {
    children: React.ReactNode;
    /** Element to portal into. Defaults to the Theme's portal root, then the Theme container, then `document.body`. */
    container?: HTMLElement | null;
    /** Keep the portal (and content) mounted while closed, e.g. for exit animations. */
    forceMount?: boolean;
} & React.ComponentPropsWithoutRef<typeof Floater.Portal>;

const ComboboxPrimitivePortal = React.forwardRef<
    React.ElementRef<typeof Floater.Portal>,
    ComboboxPrimitivePortalProps
>(({ children, container, forceMount = false, ...props }, _forwardedRef) => {
    const { isOpen } = useContext(ComboboxPrimitiveContext);
    const themeContext = useContext(ThemeContext);
    const [rootElementFound, setRootElementFound] = useState(false);
    const rootElement = (
        container
        ?? themeContext?.portalRootRef.current
        ?? themeContext?.containerRef.current
        // Guarded so server rendering (no `document`) does not throw.
        ?? (typeof document !== 'undefined' ? document.body : null)
    ) as HTMLElement | null;

    useEffect(() => {
        if (rootElement) {
            setRootElementFound(true);
        }
    }, [rootElement]);

    if ((!isOpen && !forceMount) || !rootElementFound) return null;

    return (
        <ComboboxPrimitivePortalContext.Provider value={{ forceMount }}>
            <Floater.Portal root={rootElement} {...props}>
                {children}
            </Floater.Portal>
        </ComboboxPrimitivePortalContext.Provider>
    );
});

ComboboxPrimitivePortal.displayName = 'ComboboxPrimitivePortal';

export default ComboboxPrimitivePortal;
