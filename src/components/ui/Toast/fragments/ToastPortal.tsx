'use client';
import React, { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import ThemeContext from '~/components/ui/Theme/ThemeContext';

export type ToastPortalProps = {
    children: React.ReactNode;
    /** Override the portal container. Defaults to the Theme portal root, then document.body. */
    container?: HTMLElement | null;
};

const ToastPortal: React.FC<ToastPortalProps> = ({ children, container }) => {
    const themeContext = useContext(ThemeContext);
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    if (!mounted) return null;

    const target = container
        ?? themeContext?.portalRootRef.current
        ?? document.body;

    return createPortal(children, target);
};

ToastPortal.displayName = 'ToastPortal';
export default ToastPortal;
