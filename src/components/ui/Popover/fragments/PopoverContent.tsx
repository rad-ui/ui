import React, { useContext, useRef } from 'react';
import { FloatingPortal, useMergeRefs } from '@floating-ui/react';
import PopoverContext from '../context/PopoverContext';
import Primitive from '~/core/primitives/Primitive';
import composeEventHandlers from '~/core/hooks/composeEventHandlers';
import useLayoutEffect from '~/core/hooks/useLayoutEffect';

export type PopoverContentElement = React.ElementRef<typeof Primitive.div>;

export type PopoverContentProps = React.ComponentPropsWithoutRef<typeof Primitive.div> & {
    children: React.ReactNode;
    portalled?: boolean;
    container?: HTMLElement | null;
};

const PopoverContent = React.forwardRef<PopoverContentElement, PopoverContentProps>(({ children, portalled = true, container, style, onKeyDown, ...props }, ref) => {
    const popover = useContext(PopoverContext);
    if (!popover) {
        throw new Error('PopoverContent must be used within a PopoverRoot component');
    }
    const { open, data, interactions, context, setOpen } = popover;
    const mergedRef = useMergeRefs([context.refs.setFloating, ref]);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const allRefs = useMergeRefs([mergedRef, contentRef]);

    useLayoutEffect(() => {
        if (!open) return;
        const root = contentRef.current;
        if (!root) return;
        const selector = ['button:not([disabled])','[href]','input:not([disabled])','select:not([disabled])','textarea:not([disabled])','[tabindex]:not([tabindex="-1"])'].join(',');
        const first = root.querySelector<HTMLElement>(selector);
        if (first) {
            first.focus();
            root.removeAttribute('tabindex');
        } else {
            root.focus({ preventScroll: true });
        }
    }, [open]);

    if (!open) return null;

    const side = data.placement.split('-')[0];
    const align = data.placement.split('-')[1] ?? 'center';

    const element = (
        <Primitive.div
            ref={allRefs}
            tabIndex={-1}
            data-state={open ? 'open' : 'closed'}
            data-side={side}
            data-align={align}
            style={{ ...data.floatingStyles, ...style }}
            {...interactions.getFloatingProps({
                ...props,
                onKeyDown: composeEventHandlers(onKeyDown, (e: React.KeyboardEvent) => {
                    if (e.key === 'Escape') {
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
