'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ToastProviderContext, ToastPosition } from '../contexts/ToastContext';
import type { ToastData } from '../contexts/ToastContext';
import { ToastState } from '../ToastState';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';

const COMPONENT_NAME = 'Toast';

export type ToastProviderProps = {
    children: React.ReactNode;
    customRootClass?: string;
    position?: ToastPosition;
    expand?: boolean;
    gap?: number;
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
        const unsubAdd = ToastState.subscribe((incoming) => {
            setToasts((prev) => {
                const idx = prev.findIndex((t) => t.id === incoming.id);
                if (idx !== -1) {
                    const old = prev[idx];
                    const next = [...prev];
                    next[idx] = {
                        ...incoming,
                        updateKey: (old.updateKey ?? 0) + 1,
                    };
                    return next;
                }
                return [{ ...incoming, updateKey: 0 }, ...prev].slice(0, maxToasts * 2);
            });
        });
        const unsubDismiss = ToastState.subscribeDismiss((id) => {
            if (id === '__all__') {
                setToasts([]);
            } else {
                // Don't remove immediately — let the toast animate out first.
                // ToastRoot calls removeToast() after its exit transition ends.
                // We just mark it for dismissal by calling dismiss() on it via ToastState.
                // The actual array removal happens in removeToast below.
            }
        });
        return () => { unsubAdd(); unsubDismiss(); };
    }, [maxToasts]);

    // Called by ToastRoot after exit animation completes
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

    const unlinkStackHeight = useCallback((id: string) => {
        setHeights((prev) => {
            if (!prev.has(id)) return prev;
            const next = new Map(prev);
            next.delete(id);
            return next;
        });
    }, []);

    // visibleToasts: only non-leaving toasts count toward the stack index
    // We pass ALL toasts so leaving ones can still render their exit animation
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
            unlinkStackHeight,
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
