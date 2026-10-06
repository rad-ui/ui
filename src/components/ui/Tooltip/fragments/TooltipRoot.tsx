import React, { useRef } from 'react';

import TooltipContext from '../context/TooltipContext';
import { useFloating, offset, flip, shift, useHover, useFocus, useDismiss, useRole, useInteractions, arrow, autoUpdate, safePolygon } from '@floating-ui/react';
import { useControllableState } from '~/core/hooks/useControllableState';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';

const COMPONENT_NAME = 'Tooltip';

type Placement =
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'top-start'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-end'
    | 'left-start'
    | 'left-end'
    | 'right-start'
    | 'right-end';

export type TooltipRootElement = React.ElementRef<'div'>;

export interface TooltipRootProps extends React.ComponentPropsWithoutRef<'div'> {
    children: React.ReactNode;
    placement?: Placement;
    collisionBoundary?: Element | null | Array<Element | null>;
    collisionPadding?: number;
    /** Controlled open state. */
    open?: boolean;
    /** Initial open state when uncontrolled. */
    defaultOpen?: boolean;
    /** Called with the next open state whenever it changes. */
    onOpenChange?: (open: boolean) => void;
    /** Delay in ms before the tooltip opens on hover. Focus opens immediately. */
    openDelay?: number;
    /** Delay in ms before the tooltip closes after the pointer leaves. */
    closeDelay?: number;
    customRootClass?: string;
}

const TooltipRoot = React.forwardRef<TooltipRootElement, TooltipRootProps>(
    ({
        children,
        placement = 'top',
        collisionBoundary = null,
        collisionPadding = 5,
        open,
        defaultOpen = false,
        onOpenChange,
        openDelay = 0,
        closeDelay = 0,
        customRootClass = '',
        ...props
    }, ref) => {
        const arrowRef = useRef<SVGSVGElement>(null);
        const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);

        const [isOpen, setIsOpen] = useControllableState(open, defaultOpen, onOpenChange);
        const boundary = Array.isArray(collisionBoundary) ? collisionBoundary : [collisionBoundary];
        const filteredBoundary = boundary.filter((item): item is Element => item != null);
        const detectOverflowOptions = {
            padding: collisionPadding,
            boundary: filteredBoundary,
            altBoundary: filteredBoundary.length > 0
        };

        const data = useFloating({
            // The open state must be passed in, otherwise dismiss (Escape),
            // useRole (aria-describedby) and hover-close logic never see it.
            open: isOpen,
            placement,
            strategy: 'fixed',
            onOpenChange: setIsOpen,
            middleware: [
                arrow({
                    element: arrowRef,
                    padding: 4
                }),
                offset(5),
                flip({
                    crossAxis: true,
                    fallbackAxisSideDirection: 'start',
                    ...detectOverflowOptions
                }),
                shift(detectOverflowOptions)
            ],
            whileElementsMounted: autoUpdate
        });

        const context = data.context;

        const hover = useHover(context, {
            move: false,
            delay: { open: openDelay, close: closeDelay },
            // Lets the pointer travel from the trigger onto the tooltip without
            // it closing (WCAG 1.4.13 "hoverable").
            handleClose: safePolygon()
        });

        const focus = useFocus(context);

        const dismiss = useDismiss(context);

        const role = useRole(context, { role: 'tooltip' });

        const interactions = useInteractions([
            hover,
            focus,
            dismiss,
            role
        ]);

        return (
            <TooltipContext.Provider value={{ isOpen, setIsOpen, data, interactions, context, arrowRef, rootClass }}>
                <div ref={ref} data-slot="tooltip-root" {...props}>
                    {children}
                </div>
            </TooltipContext.Provider>
        );
    }
);

TooltipRoot.displayName = COMPONENT_NAME;

export default TooltipRoot;
