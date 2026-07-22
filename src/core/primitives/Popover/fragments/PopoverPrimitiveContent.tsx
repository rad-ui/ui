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
        setPositioning
    } = useContext(PopoverPrimitiveContext);

    const previousFocusedElementRef = React.useRef<HTMLElement | null>(null);
    const mergedRef = Floater.useMergeRefs([refs.setFloating, ref]);
    const shouldRender = isOpen || forceMount || portalForceMount;

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

    const floatingProps = getFloatingProps({
        ...props,
        id: contentId,
        role,
        'data-state': isOpen ? 'open' : 'closed',
        'data-side': side,
        'data-align': align,
        'aria-hidden': !isOpen ? 'true' : undefined,
        style: {
            ...floatingStyles,
            outline: 'none',
            visibility: isOpen && !isPositioned ? 'hidden' : undefined,
            pointerEvents: isOpen && !isPositioned ? 'none' : undefined,
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

    if (isOpen) {
        return (
            <Floater.FocusManager
                context={floatingContext}
                modal={modal}
                initialFocus={modal ? 0 : -1}
                returnFocus={!onCloseAutoFocus}
                restoreFocus={true}
                outsideElementsInert={modal}
                closeOnFocusOut={!modal}
            >
                {content}
            </Floater.FocusManager>
        );
    }

    return content;
});

PopoverPrimitiveContent.displayName = 'PopoverPrimitiveContent';

export default PopoverPrimitiveContent;
