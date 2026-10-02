'use client';
import React from 'react';
import Toast from './Toast';
import type { ToastProviderProps } from './fragments/ToastProvider';
import type { ToastData } from './contexts/ToastContext';

export type ToasterProps = Omit<ToastProviderProps, 'children'> & {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    containerClassName?: string;
    containerStyle?: React.CSSProperties;
};

/**
 * Sonner-compatible Toaster wrapper.
 * Renders a default viewport and portal. Can be used as a drop-in replacement.
 */
export function Toaster({
    children,
    className,
    style,
    containerClassName,
    containerStyle,
    ...providerProps
}: ToasterProps) {
    return (
        <Toast.Provider {...providerProps}>
            <Toast.Portal>
                <Toast.Viewport className={className} style={style}>
                    {children}
                </Toast.Viewport>
            </Toast.Portal>
        </Toast.Provider>
    );
}

Toaster.displayName = 'Toaster';
