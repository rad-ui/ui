'use client';

/**
 * Toast — headless, composable notification system.
 *
 * ## Quick start
 * ```tsx
 * // 1. Mount the provider once near the root of your app
 * <Toast.Provider />
 *
 * // 2. Fire toasts from anywhere — no hooks or context needed
 * import { toast } from '@/components/ui/Toast';
 * toast('Saved!');
 * toast.success('File uploaded');
 * toast.error('Something went wrong');
 * toast.promise(saveFile(), {
 *   loading: 'Saving…',
 *   success: 'Saved!',
 *   error: 'Failed to save',
 * });
 * ```
 *
 * ## Composable anatomy
 * ```
 * Toast.Provider          — mounts the viewport portal, manages state
 * ```
 *
 * ## Hooks
 * `useToastManager`       — subscribe to the live toast list inside a component
 */

import ToastProvider from './fragments/ToastProvider';

export type { ToastProviderProps } from './fragments/ToastProvider';
export type { ToastData, ToastVariant, ToastPosition } from './contexts/ToastContext';

export { toast } from './ToastState';
export { ToastState } from './ToastState';
export { useToastManager } from './useToastManager';

interface ToastComponent {
    Provider: typeof ToastProvider;
}

const Toast: ToastComponent = {
    Provider: ToastProvider,
};

export default Toast;
