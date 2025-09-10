'use client';

import React, { useRef } from 'react';
import { useFloating, flip, shift, offset, arrow, autoUpdate, useClick, useDismiss, useRole, useInteractions, Placement } from '@floating-ui/react';
import useControllableState from '~/core/hooks/useControllableState';
import useLayoutEffect from '~/core/hooks/useLayoutEffect';
import PopoverContext from '../context/PopoverContext';
import { useCreateDataAttribute } from '~/core/hooks/createDataAttribute';

const COMPONENT_NAME = 'Popover';

export type PopoverRootProps = React.ComponentPropsWithoutRef<'div'> & {
    children: React.ReactNode;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    placement?: Placement;
}

export type PopoverRootElement = React.ElementRef<'div'>;

const PopoverRoot = React.forwardRef<PopoverRootElement, PopoverRootProps>(({ children, open, defaultOpen = false, onOpenChange, placement = 'bottom', ...props }, ref) => {
    const arrowRef = useRef<SVGSVGElement>(null);

    const [isOpen, setIsOpen] = useControllableState(open, defaultOpen, onOpenChange);

    const data = useFloating({
        placement,
        open: isOpen,
        onOpenChange: setIsOpen,
        middleware: [offset(4), flip(), shift(), arrow({ element: arrowRef })],
        whileElementsMounted: autoUpdate
    });

    const context = data.context;

    const click = useClick(context);
    const dismiss = useDismiss(context, { escapeKey: true, outsidePress: true });
    const role = useRole(context, { role: 'dialog' });

    const interactions = useInteractions([click, dismiss, role]);

    const previouslyFocused = useRef<HTMLElement | null>(null);

    useLayoutEffect(() => {
        if (isOpen) {
            previouslyFocused.current = document.activeElement as HTMLElement;
        }
    }, [isOpen]);

    useLayoutEffect(() => {
        if (!isOpen && previouslyFocused.current) {
            previouslyFocused.current.focus({ preventScroll: true });
        }
    }, [isOpen]);

    const dataAttributes = useCreateDataAttribute('popover', null);

    return (
        <PopoverContext.Provider value={{ open: isOpen, setOpen: setIsOpen, data, interactions, context, arrowRef }}>
            <div ref={ref} data-state={isOpen ? 'open' : 'closed'} {...dataAttributes()} {...props}>
                {children}
            </div>
        </PopoverContext.Provider>
    );
});

PopoverRoot.displayName = COMPONENT_NAME + 'Root';

export default PopoverRoot;
