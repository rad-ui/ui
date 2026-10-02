'use client';
import React, { forwardRef, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import { DrawerContext } from '../context/DrawerContext';
import { DrawerPopupContext } from '../context/DrawerPopupContext';
import { CSS_VAR, NESTED_PEEK_PX } from '../constants';
import { useDrawerSnapPoints } from '../hooks/useDrawerSnapPoints';
import { useDrawerSwipe } from '../hooks/useDrawerSwipe';
import { readDrawerDurationMs, whenAnimationsFinish } from '../utils/drawerAnimation';
import { getAxisForSide } from '../utils/drawerMath';
import { DialogPrimitiveContext } from '~/core/primitives/Dialog/context/DialogPrimitiveContext';
import Floater from '~/core/primitives/Floater';
import Primitive from '~/core/primitives/Primitive';

type DrawerContentElement = React.ElementRef<typeof Primitive.div>;

export type DrawerContentProps = React.ComponentPropsWithoutRef<typeof Primitive.div> & {
    className?: string;
    asChild?: boolean;
    forceMount?: boolean;
    /**
     * Where focus lands when the drawer opens. `0` focuses the first focusable
     * element, `-1` focuses the popup itself, or pass an element / ref.
     */
    initialFocus?: number | React.RefObject<HTMLElement | null>;
    /** Element focus returns to on close. Defaults to the trigger. */
    finalFocus?: React.RefObject<HTMLElement | null>;
    /**
     * Turns off drag-to-dismiss for this popup. Equivalent to putting
     * `data-swipe-ignore` on it, but as a prop.
     */
    disableSwipeDismiss?: boolean;
};

const DrawerContent = forwardRef<DrawerContentElement, DrawerContentProps>(({
    children,
    className = '',
    asChild = false,
    forceMount = false,
    role = 'dialog',
    'aria-modal': ariaModal,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    initialFocus = 0,
    finalFocus,
    disableSwipeDismiss = false,
    style: styleProp,
    ...props
}, ref) => {
    const {
        rootClass,
        side,
        dismissDirection,
        isOpen,
        modal,
        snapPoints,
        activeSnapPoint,
        setActiveSnapPoint,
        snapToSequentialPoints,
        setPopupHeight,
        registerContentElement,
        shouldKeepMounted,
        requestClose,
        childOpenCount,
        nestedSwiping,
        setNestedSwiping,
        titleId,
        descriptionId,
    } = useContext(DrawerContext);
    const { getFloatingProps, refs, floaterContext } = useContext(DialogPrimitiveContext);

    const elementRef = useRef<HTMLDivElement | null>(null);
    const [element, setElement] = useState<HTMLDivElement | null>(null);
    const [dataState, setDataState] = useState<'open' | 'closed'>(isOpen ? 'open' : 'closed');

    const setElementNode = useCallback((node: HTMLDivElement | null) => {
        elementRef.current = node;
        setElement(node);
        registerContentElement(node);
    }, [registerContentElement]);

    const mergedRef = Floater.useMergeRefs([refs.setFloating, setElementNode, ref]);

    // ── Measurement ─────────────────────────────────────────────────────────
    // Snap points and the dismiss threshold are both measured in px, so the
    // popup reports its own height and the root stores it.
    useEffect(() => {
        if (!element) return;

        const measure = () => setPopupHeight(element.offsetHeight);
        measure();

        if (typeof ResizeObserver === 'undefined') return;
        const observer = new ResizeObserver(measure);
        observer.observe(element);
        return () => observer.disconnect();
    }, [element, setPopupHeight]);

    const popupHeight = element?.offsetHeight ?? 0;

    // ── Snap points ─────────────────────────────────────────────────────────
    const {
        resolved: resolvedSnapPoints,
        activeOffset: activeSnapPointOffset,
        expanded,
    } = useDrawerSnapPoints(snapPoints, dismissDirection, popupHeight, activeSnapPoint);

    // ── Swipe to dismiss ────────────────────────────────────────────────────
    const axis = getAxisForSide(side);

    const handleDismiss = useCallback(() => {
        requestClose('swipe');
    }, [requestClose]);

    const handleSettle = useCallback((point: { value: string | number } | null) => {
        setActiveSnapPoint(point ? point.value : null);
    }, [setActiveSnapPoint]);

    const {
        swiping,
        isSnapping,
        pointerProps,
        touchProps,
    } = useDrawerSwipe({
        elementRef,
        dismissDirection,
        axis,
        enabled: isOpen && !disableSwipeDismiss,
        // A child drawer owns the gesture while it is open, so a drag over a
        // nested surface never moves the parent underneath it.
        disabledByNestedDrawer: childOpenCount > 0,
        snapPoints: resolvedSnapPoints,
        popupHeight,
        activeSnapPointOffset,
        snapToSequentialPoints,
        onDismiss: handleDismiss,
        onSettle: handleSettle,
        onSwipingChange: setNestedSwiping,
    });

    // ── Mount / unmount ─────────────────────────────────────────────────────
    // Unmounting waits for the exit animation rather than a hand-maintained
    // millisecond constant, so a theme that overrides the duration can never
    // leave the popup stranded on screen.
    const shouldMount = isOpen || forceMount || shouldKeepMounted;
    const [mounted, setMounted] = useState(isOpen);

    useEffect(() => {
        if (shouldMount) {
            setMounted(true);
            return;
        }

        // Unmounting waits for the exit animation rather than a hand-maintained
        // millisecond constant, so a theme that overrides the duration can never
        // leave the popup stranded on screen.
        const controller = new AbortController();
        whenAnimationsFinish(element, readDrawerDurationMs(element, 'close'), controller.signal)
            .then(() => {
                if (!controller.signal.aborted) setMounted(false);
            });

        return () => controller.abort();
    }, [element, shouldMount]);

    // ── Enter transition ────────────────────────────────────────────────────
    // Mount with `closed` so the first paint is the off-screen state, then flip
    // on the next frame to play the entrance.
    useEffect(() => {
        if (!mounted) {
            setDataState('closed');
            return;
        }
        if (!isOpen) {
            setDataState('closed');
            return;
        }
        const raf = requestAnimationFrame(() => setDataState('open'));
        return () => cancelAnimationFrame(raf);
    }, [isOpen, mounted]);

    useEffect(() => {
        if (isOpen || !finalFocus?.current) return;
        const frame = requestAnimationFrame(() => {
            finalFocus.current?.focus();
        });
        return () => cancelAnimationFrame(frame);
    }, [finalFocus, isOpen]);

    // ── Derived props ───────────────────────────────────────────────────────
    // `aria-modal` follows the modal prop: `false` opts out of the dialog
    // semantics, `true` and `'trap-focus'` both present it as a modal dialog.
    const resolvedAriaModal = ariaModal ?? (modal !== false);
    const resolvedLabelledBy = ariaLabelledBy ?? titleId;
    const resolvedDescribedBy = ariaDescribedBy ?? descriptionId;

    const popupStyle = {
        outline: 'none',
        [CSS_VAR.nestedDrawers]: String(childOpenCount),
        [CSS_VAR.height]: popupHeight > 0 ? `${popupHeight}px` : undefined,
        // Snap point rest position. Kept separate from the live drag offset so
        // CSS can compose the two without either knowing about the other.
        [CSS_VAR.snapPointOffset]: `${activeSnapPointOffset}px`,
        ...(childOpenCount > 0
            ? { '--drawer-peek-offset': `${childOpenCount * NESTED_PEEK_PX}px` }
            : {}),
        ...styleProp,
    } as React.CSSProperties;

    const popupContextValue = useMemo(() => ({
        element,
        height: popupHeight,
        resolvedSnapPoints,
        activeSnapPointOffset,
        activeSnapPoint,
        setActiveSnapPoint,
        expanded,
        dismissDirection,
        pointerProps,
        touchProps,
    }), [
        activeSnapPoint, activeSnapPointOffset, dismissDirection, element, expanded,
        pointerProps, popupHeight, resolvedSnapPoints, setActiveSnapPoint, touchProps,
    ]);

    // Strip floating-ui's style injection — drawer positioning is owned by CSS
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { style: _ignored = undefined, ...floatingProps } = (getFloatingProps() ?? {}) as any;

    if (!mounted) return null;

    // modal=false: no focus trap; modal=true or 'trap-focus': trap focus
    const trapFocus = modal !== false;

    return (
        <DrawerPopupContext.Provider value={popupContextValue}>
            <Floater.FocusManager
                context={floaterContext}
                modal={trapFocus}
                initialFocus={initialFocus as any}
                returnFocus={!finalFocus}
            >
                <Primitive.div
                    ref={mergedRef}
                    asChild={asChild}
                    {...floatingProps}
                    {...pointerProps}
                    {...touchProps}
                    style={popupStyle}
                    role={role}
                    aria-modal={resolvedAriaModal}
                    aria-hidden={!isOpen ? 'true' : undefined}
                    aria-labelledby={isOpen ? resolvedLabelledBy : undefined}
                    aria-describedby={isOpen ? resolvedDescribedBy : undefined}
                    data-state={dataState}
                    data-swipe-direction={side}
                    data-swiping={swiping ? 'true' : undefined}
                    data-snapping={isSnapping ? 'true' : undefined}
                    data-swipe-dismiss={!disableSwipeDismiss ? '' : undefined}
                    data-expanded={resolvedSnapPoints.length > 0 ? (expanded ? 'true' : 'false') : undefined}
                    data-child-open={childOpenCount > 0 ? 'true' : undefined}
                    data-nested-drawer-open={childOpenCount > 0 ? 'true' : undefined}
                    data-nested-drawer-swiping={nestedSwiping ? 'true' : undefined}
                    className={clsx(rootClass && `${rootClass}-content`, className)}
                    {...props}
                >
                    <div className={clsx(rootClass && `${rootClass}-content-inner`)}>
                        {children}
                    </div>
                </Primitive.div>
            </Floater.FocusManager>
        </DrawerPopupContext.Provider>
    );
});

DrawerContent.displayName = 'DrawerContent';

export default DrawerContent;
