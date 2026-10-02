'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ToastProviderContext, ToastPosition } from '../contexts/ToastContext';
import type { ToastData } from '../contexts/ToastContext';
import { ToastState, type ToastManager } from '../ToastState';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';

const COMPONENT_NAME = 'Toast';

export type ToastProviderProps = {
    children: React.ReactNode;
    customRootClass?: string;
    position?: ToastPosition;
    expand?: boolean;
    gap?: number;
    /** @deprecated Prefer Base UI name `limit`. */
    maxToasts?: number;
    /** Base UI — max visible stack size (default `3`). */
    limit?: number;
    /** Base UI — default auto-dismiss ms (default `5000`). */
    timeout?: number;
    /** Sonner alias */
    duration?: number;
    /** Base UI — isolate queue / use outside React tree (pair with `createToastManager()`). */
    toastManager?: ToastManager;
    /** Optional className passthrough for viewport region if needed (headless) */
    className?: string;
    /** Sonner-like props (headless passthroughs where applicable) */
    richColors?: boolean;
    closeButton?: boolean;
    offset?: number | string;
    mobileOffset?: number | string | { top?: number | string; bottom?: number | string; left?: number | string; right?: number | string };
    theme?: 'light' | 'dark' | 'system';
    dir?: 'ltr' | 'rtl' | 'auto';
    swipeDirections?: string[];
    visibleToasts?: number;
    toastOptions?: Record<string, any>;
    /** Sonner prop aliases/completeness */
    invert?: boolean;
    pauseWhenPageIsHidden?: boolean;
    icons?: Record<string, React.ReactNode>;
    loadingIcon?: React.ReactNode;
    rtl?: boolean;
    hotkey?: string[];
    containerAriaLabel?: string;
    dragThreshold?: number;
};

const ToastProvider: React.FC<ToastProviderProps> = ({
    children,
    customRootClass = '',
    position = 'bottom-right',
    expand = false,
    gap = 14,
    maxToasts: maxToastsProp,
    limit,
    timeout,
    duration,
    toastManager: toastManagerProp,
    className,
    richColors,
    closeButton,
    offset,
    mobileOffset,
    theme,
    dir,
    swipeDirections,
    visibleToasts: visibleToastsProp,
    toastOptions,
    invert,
    pauseWhenPageIsHidden,
    icons,
    loadingIcon,
    rtl,
    hotkey,
    containerAriaLabel,
    dragThreshold,
}) => {
    const maxToasts = limit ?? maxToastsProp ?? visibleToastsProp ?? 3;
    const manager = useMemo(
        () => toastManagerProp ?? ToastState,
        [toastManagerProp],
    );

    const defaultTimeout = timeout ?? duration ?? 4000;

    useEffect(() => {
        manager.defaultTimeout = defaultTimeout;
    }, [manager, defaultTimeout]);

    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);
    const [toasts, setToasts] = useState<ToastData[]>([]);
    const [isHovered, setIsHovered] = useState(false);
    const [heights, setHeights] = useState<Map<string, number>>(new Map());

    useEffect(() => {
        const unsubAdd = manager.subscribe((incoming) => {
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
        const unsubDismiss = manager.subscribeDismiss((id) => {
            if (id === '__all__') {
                setToasts([]);
            }
        });
        const unsubUpdate = manager.subscribeUpdate((id, partial) => {
            setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, ...partial } : t)));
        });
        return () => {
            unsubAdd();
            unsubDismiss();
            unsubUpdate();
        };
    }, [manager, maxToasts]);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => {
            const victim = prev.find((t) => t.id === id);
            victim?.onRemove?.();
            return prev.filter((t) => t.id !== id);
        });
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

    const visibleToasts = toasts.slice(0, maxToasts);

    return (
        <ToastProviderContext.Provider value={{
            rootClass,
            position,
            expand,
            gap,
            maxToasts,
            defaultToastTimeout: defaultTimeout,
            toastManager: manager,
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
