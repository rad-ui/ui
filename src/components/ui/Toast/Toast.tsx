'use client';

/**
 * Toast — headless, composable notification system.
 *
 * ## Anatomy
 * ```tsx
 * <Toast.Provider>          // wrap your app — owns state & stacking engine
 *   <Toast.Portal>          // portals into the theme root
 *     <Toast.Viewport>      // the <ol>, handles hover expand
 *       {toasts.map(t => (
 *         <Toast.Root key={t.id} toast={t}>   // <li>, owns timer & swipe
 *           <Toast.Content>                   // card wrapper, clips height
 *             <Toast.Title>{t.title}</Toast.Title>
 *             <Toast.Description>{t.description}</Toast.Description>
 *             <Toast.Close />
 *           </Toast.Content>
 *         </Toast.Root>
 *       ))}
 *     </Toast.Viewport>
 *   </Toast.Portal>
 * </Toast.Provider>
 * ```
 *
 * ## Adding toasts
 * ```tsx
 * const manager = Toast.useToastManager();
 * manager.add({ title: 'Saved!', variant: 'success' });
 * manager.dismiss(id);
 * manager.dismissAll();
 * manager.promise(fetch('/api'), { loading: '…', success: (d) => 'Done', error: (e) => 'Failed' });
 * ```
 */

import ToastProvider from './fragments/ToastProvider';
import ToastPortal from './fragments/ToastPortal';
import ToastViewport from './fragments/ToastViewport';
import ToastRoot from './fragments/ToastRoot';
import ToastContent from './fragments/ToastContent';
import ToastTitle from './fragments/ToastTitle';
import ToastDescription from './fragments/ToastDescription';
import ToastClose from './fragments/ToastClose';
import { useToastManager } from './useToastManager';

export type { ToastProviderProps } from './fragments/ToastProvider';
export type { ToastPortalProps } from './fragments/ToastPortal';
export type { ToastViewportProps } from './fragments/ToastViewport';
export type { ToastRootProps } from './fragments/ToastRoot';
export type { ToastContentProps } from './fragments/ToastContent';
export type { ToastTitleProps } from './fragments/ToastTitle';
export type { ToastDescriptionProps } from './fragments/ToastDescription';
export type { ToastCloseProps } from './fragments/ToastClose';
export type { ToastData, ToastVariant, ToastPosition } from './contexts/ToastContext';
export type { ToastManagerReturn } from './useToastManager';
export type { ToastPromiseMessages } from './ToastState';

// Named exports for tree-shaking
export { useToastManager };
export { ToastState, toast, promiseToast } from './ToastState';

interface ToastNamespace {
    Provider: typeof ToastProvider;
    Portal: typeof ToastPortal;
    Viewport: typeof ToastViewport;
    Root: typeof ToastRoot;
    Content: typeof ToastContent;
    Title: typeof ToastTitle;
    Description: typeof ToastDescription;
    Close: typeof ToastClose;
    useToastManager: typeof useToastManager;
}

const Toast: ToastNamespace = {
    Provider: ToastProvider,
    Portal: ToastPortal,
    Viewport: ToastViewport,
    Root: ToastRoot,
    Content: ToastContent,
    Title: ToastTitle,
    Description: ToastDescription,
    Close: ToastClose,
    useToastManager,
};

export default Toast;
