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
        // Only run on client side after component mounts
        if (container) {
            rootElementRef.current = container as HTMLElement;
        } else {
            const themeContainer = themeContext?.portalRootRef.current
                || document.querySelector('[data-rad-ui-portal-root]') as HTMLElement
                || themeContext?.containerRef.current
                || document.querySelector('#rad-ui-theme-container') as HTMLElement;
            const fallback = document.body;
            const selectedRoot = themeContainer || fallback;
            rootElementRef.current = selectedRoot;
        }
        setIsMounted(true);
    }, [container, themeContext]);

    // Don't render anything until mounted (SSR safety)
    if (!isMounted) {
        return null;
    }

    // If forceMount is true, always render
    if (forceMount) {
        return (
            <Floater.Portal
                root={rootElementRef.current}
                {...props}
            >
                {children}
            </Floater.Portal>
        );
    }

    // If keepMounted is true, keep the portal container but children follow their own mounting logic
    if (keepMounted) {
        return (
            <Floater.Portal
                root={rootElementRef.current}
                {...props}
            >
                {children}
            </Floater.Portal>
        );
    }

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
