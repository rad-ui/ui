'use client';

import React, { forwardRef, useContext } from 'react';
import Primitive from '~/core/primitives/Primitive';
import Floater from '~/core/primitives/Floater';
import {
    PopoverAlign,
    PopoverPrimitiveContext,
    PopoverSide,
    PopoverSticky
} from '../context/PopoverPrimitiveContext';
import { PopoverPrimitivePortalContext } from '../context/PopoverPrimitivePortalContext';
import { useTransitionStatus, getTransitionAttributes } from '~/core/hooks/useTransitionStatus';

export type PopoverFocusTarget = boolean | React.RefObject<HTMLElement | null> | (() => boolean | void | HTMLElement | null);

export type PopoverPrimitiveContentProps = React.ComponentPropsWithoutRef<typeof Primitive.div> & {
    asChild?: boolean;
    forceMount?: boolean;
    side?: PopoverSide;
    sideOffset?: number;
    align?: PopoverAlign;
    alignOffset?: number;
    avoidCollisions?: boolean;
    collisionBoundary?: Element | null | Array<Element | null>;
    collisionPadding?: number | Partial<Record<PopoverSide, number>>;
    arrowPadding?: number;
    sticky?: PopoverSticky;
    hideWhenDetached?: boolean;
    onOpenAutoFocus?: (event: { defaultPrevented: boolean; preventDefault: () => void }) => void;
    onCloseAutoFocus?: (event: { defaultPrevented: boolean; preventDefault: () => void }) => void;
    /**
     * Where focus goes on open: `true` the first tabbable element, `false` stay on the trigger,
     * a ref to an element, or a function returning one of those. Defaults to the first tabbable
     * element when `modal`, otherwise the trigger keeps focus.
     */
    initialFocus?: PopoverFocusTarget;
    /**
     * Where focus goes on close: `true` the trigger, `false` nowhere, a ref, or a function
     * returning one of those. Defaults to the trigger.
     */
    finalFocus?: PopoverFocusTarget;
    onEscapeKeyDown?: (event: KeyboardEvent) => void;
    onPointerDownOutside?: (event: import('../context/PopoverPrimitiveContext').PopoverOutsideInteractionEvent<PointerEvent>) => void;
    onFocusOutside?: (event: import('../context/PopoverPrimitiveContext').PopoverOutsideInteractionEvent<FocusEvent>) => void;
    onInteractOutside?: (event: import('../context/PopoverPrimitiveContext').PopoverOutsideInteractionEvent<PointerEvent | FocusEvent>) => void;
};

const PopoverPrimitiveContent = forwardRef<HTMLDivElement, PopoverPrimitiveContentProps>(({
    children,
    asChild = false,
    forceMount = false,
    side = 'bottom',
    sideOffset = 0,
    align = 'center',
    alignOffset = 0,
    avoidCollisions = true,
    collisionBoundary,
    collisionPadding = 0,
    arrowPadding = 0,
    sticky = 'partial',
    hideWhenDetached = false,
    onOpenAutoFocus,
    onCloseAutoFocus,
    initialFocus,
    finalFocus,
    onEscapeKeyDown,
    onPointerDownOutside,
    onFocusOutside,
    onInteractOutside,
    role = 'dialog',
    style,
    ...props
}, ref) => {
    const { forceMount: portalForceMount } = React.useContext(PopoverPrimitivePortalContext);
    const {
        isOpen,
        modal,
        contentId,
        triggerNode,
        getFloatingProps,
        refs,
        isPositioned,
        floatingStyles,
        floatingContext,
        setContentEventHandlers,
        setPositioning,
        onOpenChangeComplete
    } = useContext(PopoverPrimitiveContext);

    const previousFocusedElementRef = React.useRef<HTMLElement | null>(null);
    const mergedRef = Floater.useMergeRefs([refs.setFloating, ref]);
    const transition = useTransitionStatus(isOpen, () => refs.floating.current, onOpenChangeComplete);
    const shouldRender = transition.mounted || forceMount || portalForceMount;

    const resolvedInitialFocus = React.useMemo((): number | React.MutableRefObject<HTMLElement | null> => {
        if (initialFocus === undefined) return modal ? 0 : -1;
        if (initialFocus === true) return 0;
        if (initialFocus === false) return -1;
        if (typeof initialFocus === 'function') {
            const result = initialFocus();
            if (result === true) return 0;
            return result instanceof HTMLElement ? { current: result } : -1;
        }
        return initialFocus as React.MutableRefObject<HTMLElement | null>;
    }, [initialFocus, modal]);

    // A function target is resolved when the popover closes, through a ref the focus manager reads then.
    const finalFocusRef = React.useRef(finalFocus);
    finalFocusRef.current = finalFocus;
    const resolvedReturnFocus = React.useMemo((): boolean | React.MutableRefObject<HTMLElement | null> => {
        if (finalFocus === undefined) return !onCloseAutoFocus;
        if (typeof finalFocus === 'boolean') return finalFocus;
        if (typeof finalFocus === 'function') {
            return {
                get current() {
                    const target = finalFocusRef.current;
                    const result = typeof target === 'function' ? target() : null;
                    if (result === true) return triggerNode ?? previousFocusedElementRef.current;
                    return result instanceof HTMLElement ? result : null;
                },
                set current(_value) {}
            } as React.MutableRefObject<HTMLElement | null>;
        }
        return finalFocus as React.MutableRefObject<HTMLElement | null>;
    }, [finalFocus, onCloseAutoFocus, triggerNode]);


    React.useEffect(() => {
        setPositioning({
            side,
            align,
            sideOffset,
            alignOffset,
            avoidCollisions,
            collisionBoundary,
            collisionPadding,
            arrowPadding,
            sticky,
            hideWhenDetached
        });
    }, [
        align,
        alignOffset,
        arrowPadding,
        avoidCollisions,
        collisionBoundary,
        collisionPadding,
        hideWhenDetached,
        setPositioning,
        side,
        sideOffset,
        sticky
    ]);

    React.useEffect(() => {
        setContentEventHandlers({
            onEscapeKeyDown,
            onPointerDownOutside,
            onFocusOutside,
            onInteractOutside
        });

        return () => {
            setContentEventHandlers({});
        };
    }, [
        onEscapeKeyDown,
        onFocusOutside,
        onInteractOutside,
        onPointerDownOutside,
        setContentEventHandlers
    ]);

    React.useEffect(() => {
        if (!isOpen || !refs.floating.current) {
            return;
        }

        previousFocusedElementRef.current = document.activeElement instanceof HTMLElement
            ? document.activeElement
            : null;

        if (!onOpenAutoFocus) {
            return;
        }

        const event = {
            defaultPrevented: false,
            preventDefault() {
                this.defaultPrevented = true;
            }
        };

        onOpenAutoFocus(event);
    }, [isOpen, onOpenAutoFocus, refs.floating]);

    React.useEffect(() => {
        if (isOpen || !onCloseAutoFocus) {
            return;
        }

        const event = {
            defaultPrevented: false,
            preventDefault() {
                this.defaultPrevented = true;
            }
        };

        onCloseAutoFocus(event);

        if (!event.defaultPrevented) {
            const focusTarget = triggerNode ?? previousFocusedElementRef.current;
            if (focusTarget) {
                requestAnimationFrame(() => {
                    focusTarget.focus();
                });
            }
        }
    }, [isOpen, onCloseAutoFocus, triggerNode]);

    if (!shouldRender) {
        return null;
    }

    // Reflect the resolved placement (after flip/shift), not the requested one,
    // so styles keyed off data-side/data-align follow collision handling.
    const resolvedPlacement: string | undefined = floatingContext?.placement;
    const [resolvedSide, resolvedAlign] = resolvedPlacement
        ? resolvedPlacement.split('-')
        : [side, align];

    const floatingProps = getFloatingProps({
        ...props,
        id: contentId,
        role,
        'data-state': isOpen ? 'open' : 'closed',
        'data-side': resolvedSide ?? side,
        'data-align': resolvedPlacement ? (resolvedAlign ?? 'center') : align,
        'aria-hidden': !isOpen ? 'true' : undefined,
        ...getTransitionAttributes(transition.status),
        style: {
            ...floatingStyles,
            outline: 'none',
            visibility: isOpen && !isPositioned ? 'hidden' : undefined,
            // Closed content still on screen (exit animation, forceMount) can't be clicked.
            pointerEvents: (isOpen && !isPositioned) || !isOpen ? 'none' : undefined,
            ...style
        }
    });

    const content = (
        <Primitive.div
            ref={mergedRef}
            asChild={asChild}
            {...floatingProps}
        >
            {children}
        </Primitive.div>
    );

    // Always wrapped (disabled while closed) so closing keeps the same element and its exit transition
    // can play (#2290).
    return (
        <Floater.FocusManager
            context={floatingContext}
            disabled={!isOpen}
            modal={modal !== false}
            initialFocus={resolvedInitialFocus}
            returnFocus={resolvedReturnFocus}
            restoreFocus={true}
            outsideElementsInert={modal === true}
            closeOnFocusOut={modal === false}
        >
            {content}
        </Floater.FocusManager>
    );
});

PopoverPrimitiveContent.displayName = 'PopoverPrimitiveContent';

export default PopoverPrimitiveContent;
