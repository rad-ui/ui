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

type OutsideInteractionEvent<T extends Event> = {
    originalEvent: T;
    defaultPrevented: boolean;
    preventDefault: () => void;
};

const createOutsideInteractionEvent = <T extends Event>(event: T): OutsideInteractionEvent<T> => {
    let defaultPrevented = false;

    return {
        originalEvent: event,
        get defaultPrevented() {
            return defaultPrevented;
        },
        preventDefault() {
            defaultPrevented = true;
        }
    };
};

const getFocusableElements = (container: HTMLElement) => {
    return Array.from(container.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )).filter(element => !element.hasAttribute('disabled') && element.getAttribute('aria-hidden') !== 'true');
};

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
    onPointerDownOutside?: (event: OutsideInteractionEvent<PointerEvent>) => void;
    onFocusOutside?: (event: OutsideInteractionEvent<FocusEvent>) => void;
    onInteractOutside?: (event: OutsideInteractionEvent<PointerEvent | FocusEvent>) => void;
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
    const {
        isOpen,
        modal,
        contentId,
        triggerNode,
        anchorNode,
        handleOpenChange,
        refs,
        floatingStyles,
        floatingContext,
        setPositioning
    } = useContext(PopoverPrimitiveContext);

    const previousFocusedElementRef = React.useRef<HTMLElement | null>(null);
    const closeReasonRef = React.useRef<'outside' | 'escape' | 'close' | 'trigger' | null>(null);
    const mergedRef = Floater.useMergeRefs([refs.setFloating, ref]);
    const shouldRender = isOpen || forceMount;

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
        if (!isOpen || !refs.floating.current) {
            return;
        }

        previousFocusedElementRef.current = document.activeElement instanceof HTMLElement
            ? document.activeElement
            : null;

        const autoFocusEvent = createOutsideInteractionEvent(new FocusEvent('focus')) as {
            defaultPrevented: boolean;
            preventDefault: () => void;
        };
        onOpenAutoFocus?.(autoFocusEvent);

        if (!autoFocusEvent.defaultPrevented) {
            requestAnimationFrame(() => {
                const container = refs.floating.current;
                if (!container) {
                    return;
                }

                const [firstFocusable] = getFocusableElements(container);
                (firstFocusable ?? container).focus();
            });
        }
    }, [isOpen, onOpenAutoFocus, refs.floating]);

    React.useEffect(() => {
        if (isOpen) {
            return;
        }

        if (closeReasonRef.current === 'outside') {
            closeReasonRef.current = null;
            return;
        }

        const closeAutoFocusEvent = createOutsideInteractionEvent(new FocusEvent('focus')) as {
            defaultPrevented: boolean;
            preventDefault: () => void;
        };
        onCloseAutoFocus?.(closeAutoFocusEvent);

        if (!closeAutoFocusEvent.defaultPrevented) {
            const focusTarget = triggerNode ?? previousFocusedElementRef.current;
            if (focusTarget) {
                requestAnimationFrame(() => {
                    focusTarget.focus();
                });
            }
        }

        closeReasonRef.current = null;
    }, [isOpen, onCloseAutoFocus, triggerNode]);

    React.useEffect(() => {
        if (!isOpen) {
            return;
        }

        const isOutsideTarget = (target: EventTarget | null) => {
            if (!(target instanceof Node)) {
                return false;
            }

            const floatingNode = refs.floating.current;
            if (floatingNode?.contains(target)) {
                return false;
            }

            if (triggerNode?.contains(target)) {
                return false;
            }

            if (anchorNode?.contains(target)) {
                return false;
            }

            return true;
        };

        const handlePointerDown = (event: PointerEvent) => {
            if (!isOutsideTarget(event.target)) {
                return;
            }

            const outsideEvent = createOutsideInteractionEvent(event);
            onPointerDownOutside?.(outsideEvent);
            onInteractOutside?.(outsideEvent);

            if (!outsideEvent.defaultPrevented) {
                closeReasonRef.current = 'outside';
                handleOpenChange(false, 'outside');
            }
        };

        const handleFocusIn = (event: FocusEvent) => {
            if (!isOutsideTarget(event.target)) {
                return;
            }

            const outsideEvent = createOutsideInteractionEvent(event);
            onFocusOutside?.(outsideEvent);
            onInteractOutside?.(outsideEvent);

            if (!outsideEvent.defaultPrevented) {
                closeReasonRef.current = 'outside';
                handleOpenChange(false, 'outside');
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key !== 'Escape') {
                return;
            }

            onEscapeKeyDown?.(event);
            if (!event.defaultPrevented) {
                closeReasonRef.current = 'escape';
                handleOpenChange(false, 'escape');
            }
        };

        document.addEventListener('pointerdown', handlePointerDown, true);
        document.addEventListener('focusin', handleFocusIn, true);
        document.addEventListener('keydown', handleKeyDown, true);

        return () => {
            document.removeEventListener('pointerdown', handlePointerDown, true);
            document.removeEventListener('focusin', handleFocusIn, true);
            document.removeEventListener('keydown', handleKeyDown, true);
        };
    }, [
        anchorNode,
        handleOpenChange,
        isOpen,
        onEscapeKeyDown,
        onFocusOutside,
        onInteractOutside,
        onPointerDownOutside,
        refs.floating,
        triggerNode
    ]);

    if (!shouldRender) {
        return null;
    }

    const content = (
        <Primitive.div
            ref={mergedRef}
            asChild={asChild}
            id={contentId}
            role={role}
            tabIndex={-1}
            data-state={isOpen ? 'open' : 'closed'}
            data-side={side}
            data-align={align}
            aria-hidden={!isOpen ? 'true' : undefined}
            style={{ ...floatingStyles, ...style }}
            {...props}
        >
            {children}
        </Primitive.div>
    );

    if (isOpen) {
        return (
            <Floater.FocusManager context={floatingContext} modal={modal} initialFocus={-1} returnFocus={false}>
                {content}
            </Floater.FocusManager>
        );
    }

    return content;
});

PopoverPrimitiveContent.displayName = 'PopoverPrimitiveContent';

export default PopoverPrimitiveContent;
