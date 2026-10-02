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
    dismiss: (id?: string) => void;
    /** @deprecated Use `close()` with no args. */
    dismissAll: () => void;
    /** Sonner-like helpers */
    success?: (data: CreateToastInput | string, options?: CreateToastInput) => string;
    error?: (data: CreateToastInput | string, options?: CreateToastInput) => string;
    warning?: (data: CreateToastInput | string, options?: CreateToastInput) => string;
    info?: (data: CreateToastInput | string, options?: CreateToastInput) => string;
    loading?: (data: CreateToastInput | string, options?: CreateToastInput) => string;
}

/**
 * Must be called inside a `<Toast.Provider>`.
 * Returns the live toast list and the same imperative API as Base UI’s manager.
 */
export function useToastManager(): ToastManagerReturn {
    const ctx = useContext(ToastProviderContext);
    const manager = ctx.toastManager ?? ToastState;

    const add = (data: CreateToastInput | string, options?: CreateToastInput) => {
        if (typeof data === 'string') {
            return manager.create({ title: data, ...options });
        }
        return manager.create(data);
    };
    const variant = (v: string) => (data: CreateToastInput | string, options?: CreateToastInput) => {
        if (typeof data === 'string') {
            return manager.create({ title: data, variant: v, ...options });
        }
        return manager.create({ variant: v, ...data });
    };

    return {
        toasts: [...ctx.toasts].reverse(),
        add,
        close: (id) => manager.close(id),
        update: (id, opts) => manager.update(id, opts),
        promise: (p, messages, options) => promiseToast(p, messages, options, manager),
        dismiss: (id?: string) => (id === undefined ? manager.dismissAll() : manager.dismiss(id)),
        dismissAll: () => manager.dismissAll(),
        success: variant('success'),
        error: variant('error'),
        warning: variant('warning'),
        info: variant('info'),
        loading: variant('loading'),
    };
}
