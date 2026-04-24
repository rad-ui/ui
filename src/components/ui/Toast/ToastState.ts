/**
 * Toast manager — Base UI–aligned imperative API (`add`, `close`, `update`, `promise`).
 * Use `ToastState` singleton or `createToastManager()` per `<Toast.Provider toastManager={…}>`.
 */
import type {
    ToastData,
    CreateToastInput,
    ToastManagerUpdateOptions,
    IToastManager,
} from './contexts/ToastContext';

type Subscriber = (toast: ToastData) => void;
type DismissSubscriber = (id: string) => void;
type UpdateSubscriber = (id: string, partial: Partial<ToastData>) => void;

let counter = 0;

const generateId = () => `toast-${++counter}-${Math.random().toString(36).slice(2, 7)}`;

function mapUpdateToPartial(u: ToastManagerUpdateOptions): Partial<ToastData> {
    const { timeout, ...rest } = u;
    if (timeout !== undefined) {
        return { ...rest, duration: timeout, timeout };
    }
    return rest;
}

export class ToastManager implements IToastManager {
    defaultTimeout = 5000;

    private subscribers: Set<Subscriber> = new Set();
    private dismissSubscribers: Set<DismissSubscriber> = new Set();
    private updateSubscribers: Set<UpdateSubscriber> = new Set();

    subscribe(fn: Subscriber): () => void {
        this.subscribers.add(fn);
        return () => this.subscribers.delete(fn);
    }

    subscribeDismiss(fn: DismissSubscriber): () => void {
        this.dismissSubscribers.add(fn);
        return () => this.dismissSubscribers.delete(fn);
    }

    subscribeUpdate(fn: UpdateSubscriber): () => void {
        this.updateSubscribers.add(fn);
        return () => this.updateSubscribers.delete(fn);
    }

    /** `id` optional — omit for auto id; reuse `id` to upsert (provider bumps `updateKey`). */
    create(data: CreateToastInput): string {
        const { id: providedId, timeout, duration, ...rest } = data;
        const id = providedId ?? generateId();
        const ms = duration ?? timeout ?? this.defaultTimeout;
        const toast: ToastData = {
            ...rest,
            id,
            duration: ms,
        };
        this.subscribers.forEach((fn) => fn(toast));
        return id;
    }

    update(id: string, partial: ToastManagerUpdateOptions): void {
        const p = mapUpdateToPartial(partial);
        this.updateSubscribers.forEach((fn) => fn(id, p));
    }

    dismiss(id: string): void {
        this.dismissSubscribers.forEach((fn) => fn(id));
    }

    dismissAll(): void {
        this.dismissSubscribers.forEach((fn) => fn('__all__'));
    }

    /** Base UI — `close(id?)` dismisses one or all. */
    close(id?: string): void {
        if (id === undefined) this.dismissAll();
        else this.dismiss(id);
    }
}

export const ToastState = new ToastManager();

export function createToastManager(options?: { timeout?: number }): ToastManager {
    const m = new ToastManager();
    if (options?.timeout !== undefined) m.defaultTimeout = options.timeout;
    return m;
}

// ── Convenience global `toast()` API (singleton) ─────────────────────────────

type ToastOptions = Omit<ToastData, 'id' | 'variant' | 'updateKey' | 'limited'>;

/** Per-state options for `promise()` (string shortcut or full toast fields). */
export type ToastPromiseState = string | Omit<CreateToastInput, 'id' | 'updateKey'>;

export type ToastPromiseMessages<T> = {
    loading: ToastPromiseState;
    success: ToastPromiseState | ((data: T) => ToastPromiseState);
    error: ToastPromiseState | ((err: unknown) => ToastPromiseState);
};

function resolvePromiseState(s: ToastPromiseState): CreateToastInput {
    if (typeof s === 'string') return { title: s };
    return s;
}

function resolveSuccessError<T>(
    msg: ToastPromiseMessages<T>['success'],
    data: T,
): CreateToastInput {
    if (typeof msg === 'function') return resolvePromiseState(msg(data));
    return resolvePromiseState(msg);
}

function resolveError<T>(
    msg: ToastPromiseMessages<T>['error'],
    err: unknown,
): CreateToastInput {
    if (typeof msg === 'function') return resolvePromiseState(msg(err));
    return resolvePromiseState(msg);
}

/**
 * Track a promise with a persistent loading toast, then success or error.
 * Pass `manager` to target a non-default provider instance.
 */
export function promiseToast<T>(
    promiseLike: Promise<T>,
    messages: ToastPromiseMessages<T>,
    options?: ToastOptions,
    manager: IToastManager = ToastState,
): Promise<T> {
    const loadingOpts = resolvePromiseState(messages.loading);
    const id = manager.create({
        persistent: true,
        variant: 'default',
        ...options,
        ...loadingOpts,
    });
    promiseLike
        .then((data) => {
            manager.dismiss(id);
            const next = resolveSuccessError(messages.success, data);
            manager.create({ variant: 'success', ...options, ...next });
        })
        .catch((err: unknown) => {
            manager.dismiss(id);
            const next = resolveError(messages.error, err);
            manager.create({ variant: 'error', ...options, ...next });
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

function createVariantToast(variant: string) {
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
    close: (id?: string) => ToastState.close(id),
    promise: promiseToast,
});
