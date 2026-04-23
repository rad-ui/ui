'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ToastContext, ToastPosition } from '../contexts/ToastContext';
import type { ToastData } from '../contexts/ToastContext';
import { ToastState } from '../ToastState';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import ThemeContext from '~/components/ui/Theme/ThemeContext';
import ToastViewport from './ToastViewport';

const COMPONENT_NAME = 'Toast';

export type ToastProviderProps = {
    children: React.ReactNode;
    customRootClass?: string;
    position?: ToastPosition;
    expand?: boolean;
    gap?: number;
    maxToasts?: number;
    portalContainer?: HTMLElement | null;
};

const ToastProvider: React.FC<ToastProviderProps> = ({
    children,
    customRootClass = '',
    position = 'bottom-right',
    expand = false,
    gap = 14,
    maxToasts = 3,
    portalContainer,
}) => {
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);
    const themeContext = React.useContext(ThemeContext);
    const [toasts, setToasts] = useState<ToastData[]>([]);
    const [isHovered, setIsHovered] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Heights in STATE so viewport re-renders when they change
    const [heights, setHeights] = useState<Map<string, number>>(new Map());

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        const unsubAdd = ToastState.subscribe((toast) => {
            setToasts((prev) => [toast, ...prev].slice(0, maxToasts * 2));
        });
        const unsubDismiss = ToastState.subscribeDismiss((id) => {
            if (id === '__all__') {
                setToasts([]);
            } else {
                setToasts((prev) => prev.filter((t) => t.id !== id));
            }
        });
        return () => { unsubAdd(); unsubDismiss(); };
    }, [maxToasts]);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
        setHeights((prev) => {
            const next = new Map(prev);
            next.delete(id);
            return next;
        });
    }, []);

    const updateHeight = useCallback((id: string, height: number) => {
        setHeights((prev) => {
            // Skip update if height hasn't changed — avoids infinite loops
            if (prev.get(id) === height) return prev;
            const next = new Map(prev);
            next.set(id, height);
            return next;
        });
    }, []);

    const container = portalContainer
        ?? themeContext?.portalRootRef.current
        ?? (mounted ? document.body : null);

    return (
        <ToastContext.Provider value={{ rootClass, position, expand, gap, maxToasts }}>
            {children}
            {container
                ? createPortal(
                    <ToastViewport
                        toasts={toasts}
                        heights={heights}
                        isHovered={isHovered}
                        onHoverChange={setIsHovered}
                        onRemove={removeToast}
                        onHeightUpdate={updateHeight}
                        rootClass={rootClass}
                        position={position}
                        expand={expand}
                        gap={gap}
                        maxToasts={maxToasts}
                    />,
                    container
                )
                : null}
        </ToastContext.Provider>
    );
};

ToastProvider.displayName = 'ToastProvider';
export default ToastProvider;
