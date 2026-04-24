/**
 * Observer-pattern state manager for toasts.
 * No React context required — call `toast()` from anywhere.
 */
import type { ToastData, ToastVariant } from './contexts/ToastContext';

type Subscriber = (toast: ToastData) => void;
type DismissSubscriber = (id: string) => void;

let counter = 0;

const generateId = () => `toast-${++counter}-${Math.random().toString(36).slice(2, 7)}`;

class ToastStateManager {
    private subscribers: Set<Subscriber> = new Set();
    private dismissSubscribers: Set<DismissSubscriber> = new Set();

    subscribe(fn: Subscriber): () => void {
        this.subscribers.add(fn);
        return () => this.subscribers.delete(fn);
    }

    subscribeDismiss(fn: DismissSubscriber): () => void {
        this.dismissSubscribers.add(fn);
        return () => this.dismissSubscribers.delete(fn);
    }

    /** `id` optional — omit for auto id; reuse `id` to update an existing toast (provider bumps `updateKey`). */
    create(data: Omit<ToastData, 'id' | 'updateKey'> & { id?: string }): string {
        const { id: providedId, ...rest } = data;
        const id = providedId ?? generateId();
        const toast: ToastData = { id, duration: 4000, variant: 'default', ...rest };
        this.subscribers.forEach((fn) => fn(toast));
        return id;
    }

    dismiss(id: string): void {
        this.dismissSubscribers.forEach((fn) => fn(id));
    }

    dismissAll(): void {
        this.dismissSubscribers.forEach((fn) => fn('__all__'));
    }
}

export const ToastState = new ToastStateManager();

// ── Convenience API ──────────────────────────────────────────────────────────

type ToastOptions = Omit<ToastData, 'id' | 'variant' | 'updateKey'>;

/** Options for `toast()` / `toast.success()` / `manager.add()` — optional stable `id` for upsert + pulse. */
export type CreateToastInput = Omit<ToastData, 'id' | 'updateKey'> & { id?: string };

/** Messages for `promiseToast` / `toast.promise` / `useToastManager().promise` (Base UI–style). */
export type ToastPromiseMessages<T> = {
    loading: ToastData['title'];
    success: ToastData['title'] | ((data: T) => ToastData['title']);
    error: ToastData['title'] | ((err: unknown) => ToastData['title']);
};

/**
 * Track a promise with a persistent loading toast, then replace with success or error.
 * Returns the same promise so callers can chain `.then` / `await`.
 */
export function promiseToast<T>(
    promiseLike: Promise<T>,
    messages: ToastPromiseMessages<T>,
    options?: ToastOptions,
): Promise<T> {
    const id = ToastState.create({
        title: messages.loading,
        persistent: true,
        variant: 'default',
        ...options,
    });
    promiseLike
        .then((data) => {
            ToastState.dismiss(id);
            const title = typeof messages.success === 'function' ? messages.success(data) : messages.success;
            ToastState.create({ title, variant: 'success', ...options });
        })
        .catch((err: unknown) => {
            ToastState.dismiss(id);
            const title = typeof messages.error === 'function' ? messages.error(err) : messages.error;
            ToastState.create({ title, variant: 'error', ...options });
        });
    return promiseLike;
}

function createToast(options: CreateToastInput): string;
function createToast(title: string, options?: CreateToastInput): string;
function createToast(titleOrOptions: string | CreateToastInput, options?: CreateToastInput): string {
    if (typeof titleOrOptions === 'string') {
        return ToastState.create({ title: titleOrOptions, ...options });
    }
    return ToastState.create(titleOrOptions);
}

function createVariantToast(variant: ToastVariant) {
    return (titleOrOptions: string | CreateToastInput, options?: CreateToastInput): string => {
        if (typeof titleOrOptions === 'string') {
            return ToastState.create({ title: titleOrOptions, variant, ...options });
        }
        return ToastState.create({ variant, ...titleOrOptions });
    };
}

export const toast = Object.assign(createToast, {
    success: createVariantToast('success'),
    error: createVariantToast('error'),
    warning: createVariantToast('warning'),
    info: createVariantToast('info'),
    dismiss: (id: string) => ToastState.dismiss(id),
    dismissAll: () => ToastState.dismissAll(),
    promise: promiseToast,
});
