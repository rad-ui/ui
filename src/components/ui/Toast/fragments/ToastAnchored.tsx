'use client';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Floater from '~/core/primitives/Floater';
import { useFloatingAnchor, useStableAnchor } from '~/core/hooks/useFloatingAnchor';
import { useTransitionStatus, getTransitionAttributes } from '~/core/hooks/useTransitionStatus';
import { collisionMiddleware, placementAlign, placementSide, toPlacement } from '~/core/utils/placement';
import { stateData } from '~/core/utils/stateAttributes';
import { ToastItemContext, ToastProviderContext } from '../contexts/ToastContext';
import type { ToastData } from '../contexts/ToastContext';
import ToastPortal from './ToastPortal';
import ToastContent from './ToastContent';
import ToastTitle from './ToastTitle';
import ToastDescription from './ToastDescription';
import ToastAction from './ToastAction';
import ToastClose from './ToastClose';

export type ToastAnchoredProps = {
    toast: ToastData;
    className?: string;
    /** Content; defaults to the toast's title, description, action and close button. */
    children?: React.ReactNode;
};

/**
 * One toast shown beside its `anchor` instead of in the stack. It announces like a stacked
 * toast, closes on its timer (paused while hovered or focused), and on Escape or `close(id)`.
 */
export const ToastAnchored: React.FC<ToastAnchoredProps> = ({ toast, className, children }) => {
    const { rootClass, removeToast, defaultToastTimeout, toastManager, closeButton } = useContext(ToastProviderContext);
    const [open, setOpen] = useState(true);
    const elementRef = useRef<HTMLDivElement | null>(null);

    const { refs, floatingStyles, placement } = Floater.useFloating({
        open,
        strategy: 'fixed',
        // Position with top/left so theme animations are free to use `transform`.
        transform: false,
        placement: toPlacement(toast.side ?? 'top', toast.align ?? 'center'),
        middleware: [
            Floater.offset({ mainAxis: toast.sideOffset ?? 8, crossAxis: toast.alignOffset ?? 0 }),
            ...collisionMiddleware({ padding: 5 })
        ],
        whileElementsMounted: Floater.autoUpdate
    });
    useFloatingAnchor(useStableAnchor(toast.anchor), refs.setPositionReference, open);
    const setElement = useCallback((node: HTMLDivElement | null) => {
        elementRef.current = node;
        refs.setFloating(node);
    }, [refs]);

    const openRef = useRef(true);
    const dismiss = useCallback(() => {
        if (!openRef.current) return;
        openRef.current = false;
        setOpen(false);
        toast.onClose?.();
        toast.onDismiss?.();
    }, [toast]);

    const transition = useTransitionStatus(open, () => elementRef.current);
    useEffect(() => {
        if (!open && !transition.mounted) removeToast(toast.id);
    }, [open, transition.mounted, removeToast, toast.id]);

    // `close(id)` from the manager closes it like the timer does.
    useEffect(() => {
        if (!toastManager) return;
        return toastManager.subscribeDismiss((id) => {
            if (id === toast.id) dismiss();
        });
    }, [toastManager, toast.id, dismiss]);

    // Auto-close, paused while the pointer or focus is on the toast.
    const [paused, setPaused] = useState(false);
    const duration = toast.duration ?? toast.timeout ?? defaultToastTimeout;
    useEffect(() => {
        if (!open || paused || toast.persistent || !Number.isFinite(duration)) return;
        const timer = setTimeout(dismiss, duration);
        return () => clearTimeout(timer);
    }, [open, paused, toast.persistent, duration, dismiss, toast.updateKey]);

    return (
        <ToastPortal>
            <ToastItemContext.Provider value={{ toast, index: 0, isExpanded: false, isFront: true, isBehind: false, dismiss }}>
                <div
                    ref={setElement}
                    role="status"
                    aria-live={toast.priority === 'high' ? 'assertive' : 'polite'}
                    aria-atomic="true"
                    className={clsx(rootClass && `${rootClass}-anchored`, toast.className, className)}
                    data-toast-id={toast.id}
                    data-anchored=""
                    data-variant={toast.variant ?? undefined}
                    data-type={toast.type ?? undefined}
                    data-side={placementSide(placement)}
                    data-align={placementAlign(placement)}
                    {...stateData(open ? 'open' : 'closed')}
                    {...getTransitionAttributes(transition.status)}
                    style={{ ...floatingStyles, ...toast.style }}
                    onPointerEnter={() => setPaused(true)}
                    onPointerLeave={() => setPaused(false)}
                    onFocus={() => setPaused(true)}
                    onBlur={() => setPaused(false)}
                    onKeyDown={(event) => {
                        if (event.key !== 'Escape' || event.defaultPrevented) return;
                        event.stopPropagation();
                        dismiss();
                    }}
                >
                    {toast.render
                        ? toast.render({ id: toast.id, toast, onDismiss: dismiss })
                        : children ?? (
                            <ToastContent>
                                {toast.icon}
                                {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
                                {toast.description && <ToastDescription>{toast.description}</ToastDescription>}
                                {toast.actionProps && <ToastAction />}
                                {closeButton && <ToastClose />}
                            </ToastContent>
                        )}
                </div>
            </ToastItemContext.Provider>
        </ToastPortal>
    );
};

/** Renders every anchored toast. `Toaster` includes it; with your own `Toast.Provider`, render it once inside. */
export const ToastAnchoredToasts: React.FC = () => {
    const { anchoredToasts } = useContext(ToastProviderContext);
    return <>{(anchoredToasts ?? []).map((toast) => <ToastAnchored key={toast.id} toast={toast} />)}</>;
};

ToastAnchored.displayName = 'ToastAnchored';
ToastAnchoredToasts.displayName = 'ToastAnchoredToasts';

export default ToastAnchored;
