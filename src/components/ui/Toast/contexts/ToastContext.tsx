import { createContext } from 'react';

export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info';
export type ToastPosition =
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';

export interface ToastData {
    id: string;
    title?: React.ReactNode;
    description?: React.ReactNode;
    /** Rad semantic styling — `data-variant`. */
    variant?: ToastVariant;
    /**
     * Base UI arbitrary type string — `data-type` (e.g. `loading`, custom).
     * Falls back to `variant` when omitted for `data-type`.
     */
    type?: string;
    /** Auto-dismiss delay (ms). Base UI name: prefer `timeout`; we normalize both. */
    duration?: number;
    timeout?: number;
    persistent?: boolean;
    /**
     * Base UI: `low` = polite live region, `high` = assertive.
     * @default 'low'
     */
    priority?: 'low' | 'high';
    onDismiss?: () => void;
    /** Base UI name — called when the toast begins closing. */
    onClose?: () => void;
    /** Base UI — after removal from the list (post-exit). */
    onRemove?: () => void;
    /**
     * Incremented when `add({ id })` upserts an existing toast (pulse / replay).
     */
    updateKey?: number;
    /** Base UI — toast was dropped because the stack limit was exceeded. */
    limited?: boolean;
    /** Base UI — props spread onto the action button (`Toast.Action`). */
    actionProps?: React.ButtonHTMLAttributes<HTMLButtonElement> & { children?: React.ReactNode };
    /** Base UI — custom payload for render logic. */
    data?: unknown;
}

/** Options for `toast()` / `manager.add()` — optional stable `id` for upsert. */
export type CreateToastInput = Omit<ToastData, 'id' | 'updateKey' | 'limited'> & { id?: string };

/** Base UI `update()` / per-state `promise` payloads. */
export type ToastManagerUpdateOptions<TData = unknown> = Omit<
    ToastData,
    'id' | 'updateKey' | 'limited'
> & { data?: TData };

/** Imperative API — `ToastState` singleton or `createToastManager()`. */
export interface IToastManager {
    defaultTimeout: number;
    subscribe: (fn: (toast: ToastData) => void) => () => void;
    subscribeDismiss: (fn: (id: string) => void) => () => void;
    subscribeUpdate: (fn: (id: string, partial: Partial<ToastData>) => void) => () => void;
    create: (data: CreateToastInput) => string;
    update: (id: string, partial: ToastManagerUpdateOptions) => void;
    dismiss: (id: string) => void;
    dismissAll: () => void;
    close: (id?: string) => void;
}

// ── Provider context — shared config ────────────────────────────────────────

export interface ToastProviderContextType {
    rootClass: string;
    position: ToastPosition;
    expand: boolean;
    gap: number;
    maxToasts: number;
    /** Base UI `timeout` default (ms) for new toasts. */
    defaultToastTimeout: number;
    /** Active manager — set by `<Toast.Provider>`; absent in default context. */
    toastManager?: IToastManager;
    isHovered: boolean;
    setIsHovered: (v: boolean) => void;
    heights: Map<string, number>;
    updateHeight: (id: string, h: number) => void;
    /** Remove height from stack math immediately when exit starts (Sonner-style). */
    unlinkStackHeight: (id: string) => void;
    removeToast: (id: string) => void;
    toasts: ToastData[];
    visibleToasts: ToastData[];
}

export const ToastProviderContext = createContext<ToastProviderContextType>({
    rootClass: '',
    position: 'bottom-right',
    expand: false,
    gap: 14,
    maxToasts: 3,
    defaultToastTimeout: 5000,
    toastManager: undefined,
    isHovered: false,
    setIsHovered: () => {},
    heights: new Map(),
    updateHeight: () => {},
    unlinkStackHeight: () => {},
    removeToast: () => {},
    toasts: [],
    visibleToasts: [],
});

// ── Per-toast context — stacking vars for one toast ──────────────────────────

export interface ToastItemContextType {
    toast: ToastData;
    index: number;
    isExpanded: boolean;
    isFront: boolean;
    isBehind: boolean;
    dismiss: () => void;
}

export const ToastItemContext = createContext<ToastItemContextType | null>(null);
