'use client';
import React, { forwardRef, useContext, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { DrawerContext } from '../context/DrawerContext';
import { DialogPrimitiveContext } from '~/core/primitives/Dialog/context/DialogPrimitiveContext';
import Floater from '~/core/primitives/Floater';
import Primitive from '~/core/primitives/Primitive';

type DrawerContentElement = React.ElementRef<typeof Primitive.div>;

export type DrawerContentProps = React.ComponentPropsWithoutRef<typeof Primitive.div> & {
    className?: string;
    asChild?: boolean;
    forceMount?: boolean;
};

// Must match $close-duration in drawer.clarity.scss
const EXIT_DURATION_MS = 400;

// How much extra width (px) each open child level adds so the parent peeks out
const PEEK_WIDTH_PX = 20;

const DrawerContent = forwardRef<DrawerContentElement, DrawerContentProps>(({
    children,
    className = '',
    asChild = false,
    forceMount = false,
    role = 'dialog',
    'aria-modal': ariaModal,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    style: styleProp,
    ...props
}, ref) => {
    const { rootClass, swipeDirection, modal, onOpenChangeComplete, childOpenCount } = useContext(DrawerContext);
    const { isOpen, getFloatingProps, refs, floaterContext } = useContext(DialogPrimitiveContext);

    // Derive aria-modal from the modal prop:
    // true → aria-modal=true, 'trap-focus' → aria-modal=true, false → aria-modal=false
    const resolvedAriaModal = ariaModal ?? (modal !== false);

    const [isVisible, setIsVisible] = useState(isOpen);
    const [dataState, setDataState] = useState<'open' | 'closed'>(isOpen ? 'open' : 'closed');
    const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const openCompleteTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
        if (openCompleteTimerRef.current) clearTimeout(openCompleteTimerRef.current);

        if (isOpen) {
            setIsVisible(true);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setDataState('open');
                    openCompleteTimerRef.current = setTimeout(() => onOpenChangeComplete?.(true), EXIT_DURATION_MS);
                });
            });
        } else {
            setDataState('closed');
            exitTimerRef.current = setTimeout(() => {
                setIsVisible(false);
                // onOpenChangeComplete(false) is fired by DrawerOverlay to avoid double-firing
            }, EXIT_DURATION_MS);
        }

        return () => {
            if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
            if (openCompleteTimerRef.current) clearTimeout(openCompleteTimerRef.current);
        };
    }, [isOpen, onOpenChangeComplete]);

    const mergedRef = Floater.useMergeRefs([refs.setFloating, ref]);

    // Strip floating-ui's style injection — drawer positioning is owned by CSS
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { style: _ignored = undefined, ...floatingProps } = (getFloatingProps() ?? {}) as any;

    if (!isVisible && !forceMount) return null;

    // modal=false: no focus trap; modal=true or 'trap-focus': trap focus
    const trapFocus = modal !== false;

    // When child drawers are open, expand this drawer's width so it peeks out
    // behind the child. We use a CSS variable so the SCSS can also reference it.
    const peekOffset = childOpenCount * PEEK_WIDTH_PX;
    const peekStyle: React.CSSProperties = peekOffset > 0
        ? { '--drawer-peek-offset': `${peekOffset}px` } as React.CSSProperties
        : {};

    return (
        <Floater.FocusManager
            context={floaterContext}
            modal={trapFocus}
            initialFocus={0}
            returnFocus={true}
        >
            <Primitive.div
                ref={mergedRef}
                asChild={asChild}
                {...floatingProps}
                style={{ outline: 'none', ...peekStyle, ...styleProp }}
                role={role}
                aria-modal={resolvedAriaModal}
                aria-hidden={!isOpen ? 'true' : undefined}
                aria-labelledby={isOpen ? ariaLabelledBy : undefined}
                aria-describedby={isOpen ? ariaDescribedBy : undefined}
                data-state={dataState}
                data-swipe-direction={swipeDirection}
                data-child-open={childOpenCount > 0 ? 'true' : undefined}
                className={clsx(rootClass && `${rootClass}-content`, className)}
                {...props}
            >
                {/* Separate handle children from the rest so CSS can position
                    them on the correct edge regardless of flex-direction */}
                {React.Children.map(children, (child) => {
                    if (React.isValidElement(child) && (child as any).type?.displayName === 'DrawerHandle') {
                        return child;
                    }
                    return null;
                })}
                <div className={clsx(rootClass && `${rootClass}-content-inner`)}>
                    {React.Children.map(children, (child) => {
                        if (React.isValidElement(child) && (child as any).type?.displayName === 'DrawerHandle') {
                            return null;
                        }
                        return child;
                    })}
                </div>
            </Primitive.div>
        </Floater.FocusManager>
    );
});

DrawerContent.displayName = 'DrawerContent';

export default DrawerContent;
