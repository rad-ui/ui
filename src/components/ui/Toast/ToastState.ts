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

    create(data: Omit<ToastData, 'id'>): string {
        const id = generateId();
        const toast: ToastData = { id, duration: 4000, variant: 'default', ...data };
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

type ToastOptions = Omit<ToastData, 'id' | 'variant'>;

function createToast(options: ToastOptions): string;
function createToast(title: string, options?: ToastOptions): string;
function createToast(titleOrOptions: string | ToastOptions, options?: ToastOptions): string {
    if (typeof titleOrOptions === 'string') {
        return ToastState.create({ title: titleOrOptions, ...options });
    }
    return ToastState.create(titleOrOptions);
}

function createVariantToast(variant: ToastVariant) {
    return (titleOrOptions: string | ToastOptions, options?: ToastOptions): string => {
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
    /** Promise helper — shows loading → success/error */
    promise<T>(
        promise: Promise<T>,
        messages: {
            loading: string;
            success: string | ((data: T) => string);
            error: string | ((err: unknown) => string);
        },
        options?: ToastOptions
    ): Promise<T> {
        const id = ToastState.create({ title: messages.loading, persistent: true, variant: 'default', ...options });
        promise
            .then((data) => {
                ToastState.dismiss(id);
                const title = typeof messages.success === 'function' ? messages.success(data) : messages.success;
                ToastState.create({ title, variant: 'success', ...options });
            })
            .catch((err) => {
                ToastState.dismiss(id);
                const title = typeof messages.error === 'function' ? messages.error(err) : messages.error;
                ToastState.create({ title, variant: 'error', ...options });
            });
        return promise;
    },
});
