import React, { useEffect, useRef } from 'react';
import { FloatingPortal, useMergeRefs } from '@floating-ui/react';
import { usePopoverContext } from '../context/PopoverContext';
import Primitive from '~/core/primitives/Primitive';
import composeEventHandlers from '~/core/hooks/composeEventHandlers';
import useLayoutEffect from '~/core/hooks/useLayoutEffect';
import clsx from 'clsx';

export type PopoverContentElement = React.ElementRef<typeof Primitive.div>;

export type PopoverContentProps = React.ComponentPropsWithoutRef<typeof Primitive.div> & {
    children: React.ReactNode;
    portalled?: boolean;
    container?: HTMLElement | null;
    forceMount?: boolean;
    autoFocusOnOpen?: boolean;
};

const PopoverContent = React.forwardRef<PopoverContentElement, PopoverContentProps>(({ children, portalled = true, container, forceMount = false, autoFocusOnOpen = false, style, onKeyDown, className, ...props }, ref) => {
    const popover = usePopoverContext();
    const { open, data, interactions, context, setOpen } = popover;
    const mergedRef = useMergeRefs([context.refs.setFloating, ref]);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const allRefs = useMergeRefs([mergedRef, contentRef]);
    const shouldRender = open || forceMount;
    const dataState = open ? 'open' : 'closed';

    useEffect(() => {
        if (!autoFocusOnOpen) return;
        if (!open) return;
        const root = contentRef.current;
        if (!root) return;
        const selector = ['button:not([disabled])', '[href]', 'input:not([disabled])', 'select:not([disabled])', 'textarea:not([disabled])', '[tabindex]:not([tabindex="-1"])'].join(',');
        const timers: ReturnType<typeof setTimeout>[] = [];
        let attemptsLeft = 5;

        const run = () => {
            const first = root.querySelector<HTMLElement>(selector);
            if (first) {
                const reference = context.refs.reference.current as HTMLElement | null;
                reference?.blur();
                first.focus();
                root.removeAttribute('tabindex');
                if (document.activeElement === first) return;
            } else {
                const reference = context.refs.reference.current as HTMLElement | null;
                reference?.blur();
                root.focus({ preventScroll: true });
                if (document.activeElement === root) return;
            }

            attemptsLeft -= 1;
            if (attemptsLeft > 0) {
                timers.push(setTimeout(run, 16));
            }
        };

        timers.push(setTimeout(run, 0));

        return () => {
            timers.forEach(clearTimeout);
        };
    }, [open, autoFocusOnOpen, context.refs.reference]);

    if (!shouldRender) return null;

    const side = data.placement.split('-')[0];
    const align = data.placement.split('-')[1] ?? 'center';

    const element = (
        <Primitive.div
            ref={allRefs}
            tabIndex={-1}
            data-state={dataState}
            data-side={side}
            data-align={align}
            aria-hidden={!open ? 'true' : undefined}
            style={{
                ...data.floatingStyles,
                ...(!open ? { pointerEvents: 'none' } : undefined),
                ...style
            }}
            {...interactions.getFloatingProps({
                ...props,
                className: clsx('rad-ui-popover', className),
                onKeyDown: composeEventHandlers(onKeyDown, (e: React.KeyboardEvent) => {
                    if (open && e.key === 'Escape') {
                        setOpen(false);
                        e.stopPropagation();
                    }
                })
            })}
        >
            {children}
        </Primitive.div>
    );

    return portalled ? <FloatingPortal root={container}>{element}</FloatingPortal> : element;
});

PopoverContent.displayName = 'PopoverContent';

export default PopoverContent;
