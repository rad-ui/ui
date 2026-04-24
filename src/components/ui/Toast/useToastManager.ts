'use client';
import { useContext } from 'react';
import { ToastProviderContext } from './contexts/ToastContext';
import { ToastState, promiseToast, type ToastPromiseMessages } from './ToastState';
import type { ToastData } from './contexts/ToastContext';

type ToastOptions = Omit<ToastData, 'id' | 'variant' | 'updateKey'>;

export interface ToastManagerReturn {
    toasts: ToastData[];
    add: (data: Omit<ToastData, 'id'>) => string;
    dismiss: (id: string) => void;
    dismissAll: () => void;
    /** Base UI–style: loading toast → success or error when the promise settles. */
    promise: <T>(p: Promise<T>, messages: ToastPromiseMessages<T>, options?: ToastOptions) => Promise<T>;
}

/**
 * Must be called inside a <Toast.Provider>.
 * Returns the live toast list from the provider and imperative controls.
 *
 * @example
 * ```tsx
 * function MyViewport() {
 *   const { toasts, add } = Toast.useToastManager();
 *
 *   return (
 *     <Toast.Portal>
 *       <Toast.Viewport>
 *         {toasts.map(t => (
 *           <Toast.Root key={t.id} toast={t}>
 *             <Toast.Content>
 *               <Toast.Title>{t.title}</Toast.Title>
 *               <Toast.Close />
 *             </Toast.Content>
 *           </Toast.Root>
 *         ))}
 *       </Toast.Viewport>
 *     </Toast.Portal>
 *   );
 * }
 * ```
 */
export function useToastManager(): ToastManagerReturn {
    const ctx = useContext(ToastProviderContext);

    return {
        // Reversed so oldest toast is first in the DOM — new toasts are always
        // appended rather than inserted before existing ones. This prevents the
        // browser from moving existing DOM nodes when a new toast arrives, which
        // would reset their CSS transition state and cause them to re-animate
        // from their off-screen start position instead of their current position.
        // Must map the full provider list (not only visibleToasts): queued items
        // still need ToastRoot mounted so the global-oldest FIFO timer can run
        // and silent-dismiss the backlog; ToastRoot returns null when not visible.
        toasts: [...ctx.toasts].reverse(),
        add: (data) => ToastState.create(data),
        dismiss: (id) => ToastState.dismiss(id),
        dismissAll: () => ToastState.dismissAll(),
        promise: promiseToast,
    };
}
