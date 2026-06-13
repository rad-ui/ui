'use client';
import React, { useContext, useEffect, useState } from 'react';
import Floater from '~/core/primitives/Floater';
import ThemeContext from '~/components/ui/Theme/ThemeContext';
import { ComboboxPrimitiveContext } from '../contexts/ComboboxPrimitiveContext';
import { ComboboxPrimitivePortalContext } from '../contexts/ComboboxPrimitivePortalContext';

export type ComboboxPrimitivePortalProps = Omit<React.ComponentPropsWithoutRef<typeof Floater.Portal>, 'root'> & {
    children: React.ReactNode;
    container?: HTMLElement | null;
    forceMount?: boolean;
    /** @deprecated Use `container` instead. */
    root?: HTMLElement | null;
};

const ComboboxPrimitivePortal = React.forwardRef<
    React.ElementRef<typeof Floater.Portal>,
    ComboboxPrimitivePortalProps
>(({ children, container, forceMount = false, root, ...props }, _forwardedRef) => {
    const { isOpen } = useContext(ComboboxPrimitiveContext);
    const themeContext = useContext(ThemeContext);
    const [rootElementFound, setRootElementFound] = useState(false);
    const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

    useEffect(() => {
        const resolvedRoot = container
            ?? root
            ?? themeContext?.portalRootRef.current
            ?? document.querySelector('[data-rad-ui-portal-root]') as HTMLElement | null
            ?? themeContext?.containerRef.current
            ?? document.querySelector('#rad-ui-theme-container') as HTMLElement | null
            ?? document.body;

        setRootElement(resolvedRoot);

        if (resolvedRoot) {
            setRootElementFound(true);
        }
    }, [container, root, themeContext]);

    if ((!isOpen && !forceMount) || !rootElementFound || !rootElement) return null;

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
