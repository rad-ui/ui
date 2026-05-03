'use client';
import { useContext } from 'react';
import { ToastProviderContext } from './contexts/ToastContext';
import type { ToastData, CreateToastInput, ToastManagerUpdateOptions } from './contexts/ToastContext';
import { ToastState, promiseToast, type ToastPromiseMessages } from './ToastState';

type ToastOptions = Omit<ToastData, 'id' | 'variant' | 'updateKey' | 'limited'>;

/** Mirrors [Base UI `useToastManager`](https://base-ui.com/react/components/toast#useToastManager). */
export interface ToastManagerReturn {
    toasts: ToastData[];
    add: (data: CreateToastInput) => string;
    /** Base UI */
    close: (toastId?: string) => void;
    /** Base UI */
    update: <TData = unknown>(toastId: string, options: ToastManagerUpdateOptions<TData>) => void;
    promise: <T>(p: Promise<T>, messages: ToastPromiseMessages<T>, options?: ToastOptions) => Promise<T>;
    /** @deprecated Use `close(id)`. */
    dismiss: (id: string) => void;
    /** @deprecated Use `close()` with no args. */
    dismissAll: () => void;
}

/**
 * Must be called inside a `<Toast.Provider>`.
 * Returns the live toast list and the same imperative API as Base UI’s manager.
 */
export function useToastManager(): ToastManagerReturn {
    const ctx = useContext(ToastProviderContext);
    const manager = ctx.toastManager ?? ToastState;

    return {
        toasts: [...ctx.toasts].reverse(),
        add: (data) => manager.create(data),
        close: (id) => manager.close(id),
        update: (id, opts) => manager.update(id, opts),
        promise: (p, messages, options) => promiseToast(p, messages, options, manager),
        dismiss: (id) => manager.dismiss(id),
        dismissAll: () => manager.dismissAll(),
    };
}
