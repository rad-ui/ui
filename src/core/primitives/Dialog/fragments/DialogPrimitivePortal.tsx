'use client';
import React, { useEffect, useRef, useState } from 'react';
import Floater from '~/core/primitives/Floater';

export type DialogPrimitivePortalProps = {
  children: React.ReactNode;
};

const DialogPrimitivePortal = ({ children }: DialogPrimitivePortalProps) => {
    const rootElementRef = useRef<HTMLElement | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // Only run on client side after component mounts
        const themeContainer = document.querySelector('#rad-ui-theme-container') as HTMLElement;
        const fallback = document.body;
        const selectedRoot = themeContainer || fallback;

        rootElementRef.current = selectedRoot;
        setIsMounted(true);
    }, []);

    // Don't render anything until mounted (SSR safety)
    if (!isMounted) {
        return null;
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
