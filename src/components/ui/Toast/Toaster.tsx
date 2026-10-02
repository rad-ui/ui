'use client';
import React from 'react';
import ToastProvider from './fragments/ToastProvider';
import ToastPortal from './fragments/ToastPortal';
import ToastViewport from './fragments/ToastViewport';
import ToastRoot from './fragments/ToastRoot';
import ToastContent from './fragments/ToastContent';
import ToastTitle from './fragments/ToastTitle';
import ToastDescription from './fragments/ToastDescription';
import ToastAction from './fragments/ToastAction';
import ToastClose from './fragments/ToastClose';
import type { ToastProviderProps } from './fragments/ToastProvider';
import { ToastProviderContext } from './contexts/ToastContext';
import { useToastManager } from './useToastManager';

export type ToasterProps = Omit<ToastProviderProps, 'children'> & {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    containerClassName?: string;
    containerStyle?: React.CSSProperties;
};

function DefaultToasts() {
    const { toasts } = useToastManager();
    const { closeButton, icons, loadingIcon } = React.useContext(ToastProviderContext);

    return (
        <>
            {toasts.map((toast) => (
                <ToastRoot key={toast.id} toast={toast}>
                    <ToastContent>
                        {toast.icon ?? (toast.type === 'loading' ? loadingIcon : undefined) ?? icons?.[toast.variant ?? toast.type ?? '']}
                        <ToastTitle>{toast.title}</ToastTitle>
                        {toast.description && (
                            <ToastDescription>{toast.description}</ToastDescription>
                        )}
                        {toast.actionProps && <ToastAction />}
                        {closeButton && <ToastClose />}
                    </ToastContent>
                </ToastRoot>
            ))}
        </>
    );
}

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
        <ToastProvider {...providerProps}>
            <ToastPortal>
                <div className={containerClassName} style={containerStyle}>
                    <ToastViewport className={className} style={style}>
                        {children ?? <DefaultToasts />}
                    </ToastViewport>
                </div>
            </ToastPortal>
        </ToastProvider>
    );
}

Toaster.displayName = 'Toaster';
