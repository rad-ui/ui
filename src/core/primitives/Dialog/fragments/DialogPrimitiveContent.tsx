'use client';
import React, { forwardRef, useContext } from 'react';
import { DialogPrimitiveContext } from '../context/DialogPrimitiveContext';
import Floater from '~/core/primitives/Floater';
import Primitive from '~/core/primitives/Primitive';
import { useTransitionStatus, getTransitionAttributes } from '~/core/hooks/useTransitionStatus';
import { stateData } from '~/core/utils/stateAttributes';

export type DialogPrimitiveContentProps = React.ComponentPropsWithoutRef<typeof Primitive.div> & {
    children: React.ReactNode;
    asChild?: boolean;
    forceMount?: boolean;
    initialFocus?: boolean | React.RefObject<HTMLElement | null> | (() => boolean | void | HTMLElement | null);
    finalFocus?: boolean | React.RefObject<HTMLElement | null> | (() => boolean | void | HTMLElement | null);
    trapFocus?: boolean;
}

const FIRST_FOCUSABLE = [
    'button:not([disabled])',
    '[href]',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
].join(',');

const DialogPrimitiveContent = forwardRef<HTMLDivElement, DialogPrimitiveContentProps>(({
    children,
    asChild = false,
    forceMount = false,
    initialFocus = true,
    finalFocus = true,
    trapFocus: trapFocusProp,
    role = 'dialog',
    'aria-modal': ariaModalProp,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    style: styleProp,
    ...props
}, ref) => {
    const { isOpen, getFloatingProps, refs, floaterContext, nested, openChildCount = 0, onOpenChangeComplete, modal = true, isTopModal = true } = useContext(DialogPrimitiveContext);
    // The root's modal mode sets the defaults; explicit props still win.
    const trapFocus = trapFocusProp ?? modal !== false;
    const ariaModal = ariaModalProp ?? modal !== false;
    const previousFocusedElementRef = React.useRef<HTMLElement | null>(null);
    const wasOpenRef = React.useRef(isOpen);
    const referenceElement = refs.reference?.current;

    const mergedRef = Floater.useMergeRefs([refs.setFloating, ref]);
    const transition = useTransitionStatus(isOpen, () => refs.floating?.current ?? null, onOpenChangeComplete);
    const shouldRender = transition.mounted || forceMount;
    const dataState = isOpen ? 'open' : 'closed';

    React.useEffect(() => {
        if (isOpen) {
            previousFocusedElementRef.current = document.activeElement instanceof HTMLElement
                ? document.activeElement
                : null;
            wasOpenRef.current = true;
            return;
        }

        if (!wasOpenRef.current) {
            return;
        }

        wasOpenRef.current = false;

        const resolveFinalFocus = () => {
            if (finalFocus === false) {
                return null;
            }

            if (finalFocus === true) {
                return referenceElement instanceof HTMLElement
                    ? referenceElement
                    : previousFocusedElementRef.current;
            }

            if ('current' in finalFocus) {
                return finalFocus.current;
            }

            const result = finalFocus();
            if (result === true) {
                return referenceElement instanceof HTMLElement
                    ? referenceElement
                    : previousFocusedElementRef.current;
            }

            return result instanceof HTMLElement ? result : null;
        };

        const target = resolveFinalFocus();

        if (target) {
            requestAnimationFrame(() => {
                target.focus();
            });
        }
    }, [finalFocus, isOpen, referenceElement]);

    // A specific target (a ref, or a function) is focused here with preventScroll, so a tall, scrolling
    // dialog opens at its top instead of jumping to that element (#2278). The focus manager then gets -1
    // and focuses nothing itself. `true` keeps its default: the first tabbable element.
    const ownsInitialFocus = typeof initialFocus === 'function' || (typeof initialFocus === 'object' && initialFocus !== null);
    const managerInitialFocus = initialFocus === true ? 0 : -1;

    React.useEffect(() => {
        if (!isOpen || !ownsInitialFocus) return;
        // A frame later, so the content and anything a function looks up are in the DOM.
        const frame = requestAnimationFrame(() => {
            const content = refs.floating?.current as HTMLElement | null | undefined;
            let target: HTMLElement | null = null;
            if (typeof initialFocus === 'function') {
                const result = initialFocus();
                if (result instanceof HTMLElement) target = result;
                else if (result === true) target = content?.querySelector<HTMLElement>(FIRST_FOCUSABLE) ?? null;
            } else if (typeof initialFocus === 'object' && initialFocus !== null) {
                target = initialFocus.current;
            }
            target?.focus({ preventScroll: true });
        });
        return () => cancelAnimationFrame(frame);
        // Run once per open: a new inline function on every render must not move focus again.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, ownsInitialFocus]);

    const consumerStyle = (props as React.HTMLAttributes<HTMLDivElement>).style;
    const restProps = { ...props } as Record<string, unknown>;
    delete restProps.style;
    const content = (
        <Primitive.div
            ref={mergedRef}
            asChild={asChild}
            {...(getFloatingProps as (userProps?: Record<string, unknown>) => Record<string, unknown>)({
                ...restProps,
                style: { outline: 'none', ['--nested-dialogs' as string]: openChildCount, ...styleProp, ...consumerStyle },
                'data-nested': nested ? '' : undefined,
                'data-nested-dialog-open': openChildCount > 0 ? '' : undefined,
                role,
                'aria-hidden': !isOpen ? 'true' : undefined,
                'aria-labelledby': isOpen ? ariaLabelledBy : undefined,
                'aria-describedby': isOpen ? ariaDescribedBy : undefined,
                ...stateData(dataState),
                ...getTransitionAttributes(transition.status),
                'aria-modal': ariaModal
            })}
        >
            {children}
        </Primitive.div>
    );

    return (
        <>
            {shouldRender && (
                // Always wrapped (disabled while closed) so closing keeps the same element and its exit
                // transition can play (#2290).
                <Floater.FocusManager
                    context={floaterContext}
                    disabled={!isOpen}
                    modal={trapFocus && isTopModal}
                    // Under another modal, focus moving into it must not close this one.
                    closeOnFocusOut={isTopModal ? undefined : false}
                    initialFocus={managerInitialFocus}
                    returnFocus={finalFocus !== false}
                >
                    {content}
                </Floater.FocusManager>
            )}
        </>
    );
});

DialogPrimitiveContent.displayName = 'DialogPrimitiveContent';

export default DialogPrimitiveContent;
