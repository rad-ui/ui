import { createContext } from 'react';

/**
 * Viewport corner — headless string for `data-position` (theme defines valid values).
 * Common: `bottom-right`, `bottom-left`, `bottom-center`, `top-right`, `top-left`, `top-center`.
 */
export type ToastPosition = string;

export interface ToastData {
    id: string;
    title?: React.ReactNode;
    description?: React.ReactNode;
    /** Headless semantic / styling hook — forwarded as `data-variant` when set. */
    variant?: string;
    /** Headless — forwarded as `data-type` when set (e.g. `loading`). */
    type?: string;
    /** Auto-dismiss delay (ms). Prefer `timeout`; both are accepted. */
    duration?: number;
    timeout?: number;
    persistent?: boolean;
    /**
     * Live-region urgency — headless string; we treat `high` as `aria-live="assertive"`, otherwise `polite`.
     */
    priority?: string;
    onDismiss?: () => void;
    /** Called when the toast begins closing. */
    onClose?: () => void;
    /** Called after the toast is removed from the list (after its exit animation). */
    onRemove?: () => void;
    /**
     * Incremented when `add({ id })` upserts an existing toast (pulse / replay).
     */
    updateKey?: number;
    /** The toast was dropped because the stack limit was exceeded. */
    limited?: boolean;
    /** Props spread onto the action button (`Toast.Action`). */
    actionProps?: React.ButtonHTMLAttributes<HTMLButtonElement> & { children?: React.ReactNode };
    /** Custom payload for your render logic. */
    data?: unknown;
    /** Headless custom render function (Sonner-like). Receives render props. */
    render?: (props: {
        id: string;
        toast: ToastData;
        onDismiss: () => void;
    }) => React.ReactNode;
    /** Optional icon node. */
    icon?: React.ReactNode;
    /** Optional className for the toast item/content (headless). */
    className?: string;
    /** Optional inline styles. */
    style?: React.CSSProperties;
    /** Unstyled mode hint (headless - styling left to consumer). */
    unstyled?: boolean;
}

/** Options for `toast()` / `manager.add()` — optional stable `id` for upsert. */
export type CreateToastInput = Omit<ToastData, 'id' | 'updateKey' | 'limited'> & { id?: string };

/** Payloads for `update()` and the per-state `promise` options. */
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
    /** Default `timeout` (ms) for new toasts. */
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
    viewportClassName?: string;
    viewportStyle?: React.CSSProperties;
    containerAriaLabel: string;
    /** Keys that move focus to the toasts: modifier names (`altKey`, `ctrlKey`, `metaKey`, `shiftKey`) plus a `KeyboardEvent.code`. */
    hotkey?: string[];
    offset?: number | string;
    mobileOffset?: number | string | { top?: number | string; bottom?: number | string; left?: number | string; right?: number | string };
    theme?: 'light' | 'dark' | 'system';
    dir?: 'ltr' | 'rtl' | 'auto';
    richColors: boolean;
    invert: boolean;
    pauseWhenPageIsHidden: boolean;
    closeButton: boolean;
    icons?: Record<string, React.ReactNode>;
    loadingIcon?: React.ReactNode;
    swipeDirections?: string[];
    dragThreshold?: number;
}

export const ToastProviderContext = createContext<ToastProviderContextType>({
    rootClass: '',
    position: 'bottom-right',
    expand: false,
    gap: 14,
    maxToasts: 3,
    defaultToastTimeout: 4000,
    toastManager: undefined,
    isHovered: false,
    setIsHovered: () => {},
    heights: new Map(),
    updateHeight: () => {},
    unlinkStackHeight: () => {},
    removeToast: () => {},
    toasts: [],
    visibleToasts: [],
    viewportClassName: undefined,
    viewportStyle: undefined,
    containerAriaLabel: 'Notifications',
    hotkey: ['altKey', 'KeyT'],
    offset: undefined,
    mobileOffset: undefined,
    theme: undefined,
    dir: undefined,
    richColors: false,
    invert: false,
    pauseWhenPageIsHidden: true,
    closeButton: false,
    icons: undefined,
    loadingIcon: undefined,
    swipeDirections: undefined,
    dragThreshold: undefined,
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
