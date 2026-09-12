'use client';
import React, { useContext, useEffect, useState } from 'react';
import Floater from '~/core/primitives/Floater';
import { ComboboxPrimitiveContext } from '../contexts/ComboboxPrimitiveContext';
import ThemeContext from '~/components/ui/Theme/ThemeContext';

const ComboboxPrimitivePortal = React.forwardRef<
    React.ElementRef<typeof Floater.Portal>,
    { children: React.ReactNode; container?: HTMLElement | null } & React.ComponentPropsWithoutRef<typeof Floater.Portal>
>(({ children, container, ...props }, _forwardedRef) => {
    const { isOpen } = useContext(ComboboxPrimitiveContext);
    const themeContext = useContext(ThemeContext);
    const [rootElementFound, setRootElementFound] = useState(false);
    const rootElement = (
        container
        ?? themeContext?.portalRootRef.current
        ?? themeContext?.containerRef.current
        ?? document.body
    ) as HTMLElement | null;

    useEffect(() => {
        if (rootElement) {
            setRootElementFound(true);
        }
    }, [rootElement]);

    if (!isOpen || !rootElementFound) return null;

    return (
        <Floater.Portal root={rootElement} {...props}>
            {children}
        </Floater.Portal>
    );
});

ComboboxPrimitivePortal.displayName = 'ComboboxPrimitivePortal';

export default ComboboxPrimitivePortal;
