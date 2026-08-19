'use client';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Floater from '~/core/primitives/Floater';
import ThemeContext from '~/components/ui/Theme/ThemeContext';

export type DialogPrimitivePortalProps = {
  children: React.ReactNode;
  container?: Element | null;
  forceMount?: boolean;
  keepMounted?: boolean;
};

const DialogPrimitivePortal = ({
    children,
    container,
    forceMount = false,
    keepMounted = false,
    ...props
}: DialogPrimitivePortalProps) => {
    const themeContext = useContext(ThemeContext);
    const rootElementRef = useRef<HTMLElement | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if (container) {
            rootElementRef.current = container as HTMLElement;
        } else {
            rootElementRef.current = themeContext?.portalRootRef.current
                ?? themeContext?.containerRef.current
                ?? document.body;
        }
        setIsMounted(true);
    }, [container, themeContext]);

    if (!isMounted) {
        return null;
    }

    void forceMount;
    void keepMounted;

    return (
        <Floater.Portal
            root={rootElementRef.current}
            {...props}
        >
            {children}
        </Floater.Portal>
    );
};

export default DialogPrimitivePortal;
