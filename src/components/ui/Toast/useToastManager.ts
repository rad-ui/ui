'use client';
import { useEffect, useState } from 'react';
import { ToastState } from './ToastState';
import type { ToastData } from './contexts/ToastContext';

export interface ToastManagerReturn {
    toasts: ToastData[];
    add: (data: Omit<ToastData, 'id'>) => string;
    dismiss: (id: string) => void;
    dismissAll: () => void;
}

/**
 * Subscribe to the live toast list and get imperative controls.
 *
 * @example
 * ```tsx
 * function MyViewport() {
 *   const { toasts, add, dismiss } = Toast.useToastManager();
 *
 *   return (
 *     <Toast.Viewport>
 *       {toasts.map(t => (
 *         <Toast.Root key={t.id} toast={t}>
 *           <Toast.Content>
 *             <Toast.Title>{t.title}</Toast.Title>
 *             <Toast.Close />
 *           </Toast.Content>
 *         </Toast.Root>
 *       ))}
 *     </Toast.Viewport>
 *   );
 * }
 * ```
 */
export function useToastManager(): ToastManagerReturn {
    const [toasts, setToasts] = useState<ToastData[]>([]);

    useEffect(() => {
        const unsubAdd = ToastState.subscribe((toast) => {
            setToasts((prev) => [toast, ...prev]);
        });
        const unsubDismiss = ToastState.subscribeDismiss((id) => {
            if (id === '__all__') {
                setToasts([]);
            } else {
                setToasts((prev) => prev.filter((t) => t.id !== id));
            }
        });
        return () => { unsubAdd(); unsubDismiss(); };
    }, []);

    return {
        toasts,
        add: (data) => ToastState.create(data),
        dismiss: (id) => ToastState.dismiss(id),
        dismissAll: () => ToastState.dismissAll(),
    };
}
