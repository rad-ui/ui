'use client';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Floater from '~/core/primitives/Floater';
import ThemeContext from '~/components/ui/Theme/ThemeContext';
import { ComboboxPrimitiveContext } from '../contexts/ComboboxPrimitiveContext';

const ComboboxPrimitivePortal = React.forwardRef<
    React.ElementRef<typeof Floater.Portal>,
    { children: React.ReactNode; container?: HTMLElement | null } & React.ComponentPropsWithoutRef<typeof Floater.Portal>
>(({ children, container, ...props }, _forwardedRef) => {
    const { isOpen } = useContext(ComboboxPrimitiveContext);
    const themeContext = useContext(ThemeContext);
    const rootElementRef = useRef<HTMLElement | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        rootElementRef.current = container
            ?? themeContext?.portalRootRef.current
            ?? themeContext?.containerRef.current
            ?? document.body;
        setIsMounted(true);
    }, [container, themeContext]);

    if (!isOpen || !isMounted) return null;

    return (
        <Floater.Portal root={rootElementRef.current} {...props}>
            {children}
        </Floater.Portal>
    );
});

ComboboxPrimitivePortal.displayName = 'ComboboxPrimitivePortal';

export default ComboboxPrimitivePortal;
