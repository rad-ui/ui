'use client';
import { useEffect, useState } from 'react';
import { ToastState } from './ToastState';
import type { ToastData } from './contexts/ToastContext';

/**
 * Hook that gives you live access to the current toast list and the
 * same imperative API as the `toast()` helper.
 *
 * Useful when you need to render toasts in a custom viewport or
 * inspect the queue programmatically.
 *
 * @example
 * ```tsx
 * function MyToaster() {
 *   const { toasts, dismiss, dismissAll } = useToastManager();
 *   return (
 *     <ul>
 *       {toasts.map(t => (
 *         <li key={t.id}>
 *           {t.title}
 *           <button onClick={() => dismiss(t.id)}>×</button>
 *         </li>
 *       ))}
 *     </ul>
 *   );
 * }
 * ```
 */
export function useToastManager() {
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

        return () => {
            unsubAdd();
            unsubDismiss();
        };
    }, []);

    return {
        toasts,
        add: (data: Omit<ToastData, 'id'>) => ToastState.create(data),
        dismiss: (id: string) => ToastState.dismiss(id),
        dismissAll: () => ToastState.dismissAll(),
    };
}
