'use client';
import React, { useEffect, useRef, useState } from 'react';
import Floater from '~/core/primitives/Floater';

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
    keepMounted = false
}: DialogPrimitivePortalProps) => {
    const rootElementRef = useRef<HTMLElement | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    const [shouldRender, setShouldRender] = useState(forceMount);

    useEffect(() => {
        // Only run on client side after component mounts
        if (container) {
            rootElementRef.current = container as HTMLElement;
        } else {
            const themeContainer = document.querySelector('#rad-ui-theme-container') as HTMLElement;
            const fallback = document.body;
            const selectedRoot = themeContainer || fallback;
            rootElementRef.current = selectedRoot;
        }
        setIsMounted(true);
    }, [container]);

    // Don't render anything until mounted (SSR safety)
    if (!isMounted) {
        return null;
    }

    // If forceMount is true, always render
    if (forceMount) {
        return (
            <Floater.Portal
                root={rootElementRef.current}
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
            >
                {children}
            </Floater.Portal>
        );
    }

    return (
        <Floater.Portal
            root={rootElementRef.current}
        >
            {children}
        </Floater.Portal>
    );
};

export default DialogPrimitivePortal;
