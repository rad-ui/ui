'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { ToastProviderContext, ToastPosition } from '../contexts/ToastContext';
import type { ToastData } from '../contexts/ToastContext';
import { ToastState } from '../ToastState';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';

const COMPONENT_NAME = 'Toast';

export type ToastProviderProps = {
    children: React.ReactNode;
    /** Override the generated class namespace. */
    customRootClass?: string;
    /** Where toasts appear on screen. @default "bottom-right" */
    position?: ToastPosition;
    /** Always show all toasts expanded (no stacking). @default false */
    expand?: boolean;
    /** Gap between toasts in px when collapsed. @default 14 */
    gap?: number;
    /** Max toasts visible at once. @default 3 */
    maxToasts?: number;
};

const ToastProvider: React.FC<ToastProviderProps> = ({
    children,
    customRootClass = '',
    position = 'bottom-right',
    expand = false,
    gap = 14,
    maxToasts = 3,
}) => {
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);
    const [toasts, setToasts] = useState<ToastData[]>([]);
    const [isHovered, setIsHovered] = useState(false);
    const [heights, setHeights] = useState<Map<string, number>>(new Map());

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
            if (prev.get(id) === height) return prev;
            const next = new Map(prev);
            next.set(id, height);
            return next;
        });
    }, []);

    const visibleToasts = toasts.slice(0, maxToasts);

    return (
        <ToastProviderContext.Provider value={{
            rootClass,
            position,
            expand,
            gap,
            maxToasts,
            isHovered,
            setIsHovered,
            heights,
            updateHeight,
            removeToast,
            toasts,
            visibleToasts,
        }}>
            {children}
        </ToastProviderContext.Provider>
    );
};

ToastProvider.displayName = 'ToastProvider';
export default ToastProvider;
