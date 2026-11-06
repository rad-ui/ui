'use client';
import React, { forwardRef } from 'react';
import { needsHostElement } from '~/core/utils/hostElement';
import { DialogPrimitiveContext } from '../context/DialogPrimitiveContext';
import { DialogNestingContext } from '../context/DialogNestingContext';
import Floater from '~/core/primitives/Floater';
import type { DialogHandle } from '../handle';
import { useControllableState } from '~/core/hooks/useControllableState';
import { useModalLayer } from '~/core/utils/modalStack';
import { useRegisterDocumentOverlayOpen } from '~/core/hooks/useRegisterDocumentOverlayOpen';
import { callOpenChange, createOpenChangeDetails, fromFloatingReason, OpenChangeDetails, OpenChangeReason } from '~/core/utils/openChangeDetails';
import { usePopupActions, PopupActions } from '~/core/hooks/usePopupActions';
import { stateData } from '~/core/utils/stateAttributes';
import { useHandleTriggerId } from '~/core/utils/popupHandle';

const noop = () => {};

export type DialogPrimitiveRootProps = {
    /** Content, or a function of the payload passed by the trigger that opened it (with `handle`). */
    children: React.ReactNode | ((state: { payload: unknown }) => React.ReactNode);
    /** Connects detached triggers made with `createHandle()`. */
    handle?: DialogHandle<any>;
    /**
     * With `handle`: the DOM `id` of the detached trigger the popup belongs to while open.
     * It is anchored to that trigger and gets its payload, also when opened from code.
     */
    triggerId?: string | null;
    /** Uncontrolled `triggerId`: the trigger used when the popup opens without one (e.g. `defaultOpen`). */
    defaultTriggerId?: string | null;
    open?: boolean;
    defaultOpen?: boolean;
    /**
     * Called with the next open state and details: `reason` (such as
     * `trigger-press`, `outside-press`, `escape-key`, `close-press`), the
     * `event`, and `cancel()` to keep it as it is.
     */
    onOpenChange?: (open: boolean, details: OpenChangeDetails) => void;
    /** @deprecated Use `onOpenChange` and check `details.reason === 'outside-press'`. Called when a press outside closes it. */
    onClickOutside?: () => void;
    className?:string;
    /** When true, outside pointer events and escape key will not close the dialog. */
    disablePointerDismissal?: boolean;
    /**
     * When false, pressing outside the content (including the overlay) does not
     * close the dialog, while Escape still does. Used by AlertDialog.
     */
    dismissOnOutsidePress?: boolean;
    /** Called after the open or close animations finish (at once when there are none). */
    onOpenChangeComplete?: (open: boolean) => void;
    /** Ref with `close()`, to close the popup from code (reason `'imperative-action'`). */
    actionsRef?: React.Ref<PopupActions>;
    /**
     * `true` (default): focus is trapped, page scroll is locked and the overlay blocks the page.
     * `'trap-focus'`: focus is trapped but the page still scrolls and takes pointer input.
     * `false`: the rest of the page stays fully usable.
     */
    modal?: boolean | 'trap-focus';
}

const COMPONENT_NAME = 'DialogPrimitive';

const DialogPrimitiveRootInner = forwardRef<HTMLDivElement, DialogPrimitiveRootProps>(({ children, handle, triggerId, defaultTriggerId, open, defaultOpen = false, onOpenChange, onClickOutside = () => {}, className, disablePointerDismissal = false, dismissOnOutsidePress = true, onOpenChangeComplete, modal = true, actionsRef, ...props }, ref) => {
    // onOpenChange is called by handleOpenChange (with details), not by the state hook.
    const [isOpen, setIsOpen] = useControllableState(open, defaultOpen, noop);
    const onOpenChangeRef = React.useRef(onOpenChange);
    onOpenChangeRef.current = onOpenChange;
    const nodeId = Floater.useFloatingNodeId();
    useRegisterDocumentOverlayOpen(isOpen);
    // A modal opened later (a dialog from a drawer) sits on top: this one stops hiding it and
    // stops treating presses in it as outside.
    const isTopModal = useModalLayer(Boolean(isOpen) && modal !== false);

    // Nested dialogs report their open state to the dialog they're inside, so
    // its content can be styled as stacked behind them.
    const parentNesting = React.useContext(DialogNestingContext);
    const [openChildCount, setOpenChildCount] = React.useState(0);
    const nesting = React.useMemo(() => ({
        onChildOpenChange: (childOpen: boolean) => setOpenChildCount((count) => Math.max(0, count + (childOpen ? 1 : -1)))
    }), []);
    const parentOnChildOpenChange = parentNesting?.onChildOpenChange;
    React.useEffect(() => {
        if (!isOpen || !parentOnChildOpenChange) return;
        parentOnChildOpenChange(true);
        return () => parentOnChildOpenChange(false);
    }, [isOpen, parentOnChildOpenChange]);
    // A handle lets triggers outside this Root open it; keep both in sync.
    const subscribeHandle = React.useCallback((listener: () => void) => handle?.subscribe(listener) ?? (() => {}), [handle]);
    const handleState = React.useSyncExternalStore(subscribeHandle, () => handle?.getState(), () => handle?.getState());
    const handleOpen = handleState?.open;
    const isOpenRef = React.useRef(isOpen);
    isOpenRef.current = isOpen;
    // Only follow changes of the handle, so `defaultOpen` isn't undone by a still-closed handle on mount.
    const lastHandleOpenRef = React.useRef(handleOpen);
    React.useEffect(() => {
        if (handleOpen === lastHandleOpenRef.current) return;
        lastHandleOpenRef.current = handleOpen;
        if (handleOpen === undefined || handleOpen === isOpenRef.current) return;
        // A detached trigger opened it (or the handle closed it): report it like any other change.
        const details = createOpenChangeDetails(handleOpen ? 'trigger-press' : 'imperative-action');
        callOpenChange(onOpenChangeRef.current, handleOpen, details);
        if (details.isCanceled) {
            if (handleOpen) handle?.close();
            return;
        }
        setIsOpen(handleOpen);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handleOpen]);

    const handleOpenChange = (open: boolean, reason: OpenChangeReason = open ? 'none' : 'close-press', event?: Event) => {
        const details = createOpenChangeDetails(reason, event);
        callOpenChange(onOpenChangeRef.current, open, details);
        if (details.isCanceled) return;
        setIsOpen(open);
        if (!open) handle?.close();
    };
    const handleOverlayClick = () => {
        if (disablePointerDismissal || !dismissOnOutsidePress) return;
        onClickOutside();
        handleOpenChange(false, 'outside-press');
    };

    const { context: floaterContext, refs, floatingStyles } = Floater.useFloating({
        elements: handleState?.trigger ? { reference: handleState.trigger } : undefined,
        open: isOpen,
        nodeId,
        onOpenChange: (nextOpen, event, reason) => handleOpenChange(nextOpen, fromFloatingReason(reason), event)
    });

    const dismiss = Floater.useDismiss(floaterContext, {
        bubbles: false,
        escapeKey: !disablePointerDismissal && isTopModal,
        outsidePress: !disablePointerDismissal && dismissOnOutsidePress && isTopModal,
    });
    const role = Floater.useRole(floaterContext, { role: 'dialog' });

    const { getReferenceProps, getFloatingProps, getItemProps } = Floater.useInteractions([
        dismiss,
        role
    ]);

    usePopupActions(actionsRef, () => handleOpenChange(false, 'imperative-action'));

    useHandleTriggerId(handle, triggerId, defaultTriggerId, Boolean(isOpen));
    const contextProps = { isOpen, handleOpenChange, floaterContext, handleOverlayClick, getReferenceProps, getFloatingProps, getItemProps, refs, floatingStyles, nested: Boolean(parentNesting), openChildCount, onOpenChangeComplete, modal, isTopModal };
    const content = typeof children === 'function' ? children({ payload: handleState?.payload }) : children;
    return (
        <DialogNestingContext.Provider value={nesting}>
        <DialogPrimitiveContext.Provider value={contextProps}>
            <Floater.FloatingNode id={nodeId}>
                {needsHostElement(ref, { ...props, className })
                    ? (
                        <div
                            ref={ref}
                            {...stateData(isOpen ? 'open' : 'closed')}
                            {...props}
                            className={className}
                        >
                            {content}
                        </div>
                    )
                    : content}
            </Floater.FloatingNode>
        </DialogPrimitiveContext.Provider>
        </DialogNestingContext.Provider>
    );
});

DialogPrimitiveRootInner.displayName = `${COMPONENT_NAME}Inner`;

const DialogPrimitiveRoot = forwardRef<HTMLDivElement, DialogPrimitiveRootProps>(({ disablePointerDismissal = false, ...props }, ref) => {
    const floatingTree = Floater.useFloatingTree();

    if (floatingTree) {
        return <DialogPrimitiveRootInner ref={ref} disablePointerDismissal={disablePointerDismissal} {...props} />;
    }

    return (
        <Floater.FloatingTree>
            <DialogPrimitiveRootInner ref={ref} disablePointerDismissal={disablePointerDismissal} {...props} />
        </Floater.FloatingTree>
    );
});

DialogPrimitiveRoot.displayName = COMPONENT_NAME;
export default DialogPrimitiveRoot;
