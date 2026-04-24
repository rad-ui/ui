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
    variant?: ToastVariant;
    duration?: number;
    persistent?: boolean;
    onDismiss?: () => void;
    /**
     * Incremented when `add({ id })` targets an existing toast (Base UI–style replay / pulse).
     * `0` or missing = first show; `>= 1` = duplicate updates.
     */
    updateKey?: number;
}

// ── Provider context — shared config ────────────────────────────────────────

export interface ToastProviderContextType {
    rootClass: string;
    position: ToastPosition;
    expand: boolean;
    gap: number;
    maxToasts: number;
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
