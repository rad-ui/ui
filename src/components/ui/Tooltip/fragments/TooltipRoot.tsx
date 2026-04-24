import React, { useState, useRef } from 'react';

import TooltipContext from '../context/TooltipContext';
import { useFloating, offset, flip, shift, useHover, useFocus, useDismiss, useRole, useInteractions, arrow, autoUpdate } from '@floating-ui/react';

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
}

const TooltipRoot = React.forwardRef<TooltipRootElement, TooltipRootProps>(
    ({ children, placement = 'top', collisionBoundary = null, collisionPadding = 5, ...props }, ref) => {
        const arrowRef = useRef<SVGSVGElement>(null);

        const [isOpen, setIsOpen] = useState(false);
        const boundary = Array.isArray(collisionBoundary) ? collisionBoundary : [collisionBoundary];
        const filteredBoundary = boundary.filter((item): item is Element => item != null);
        const detectOverflowOptions = {
            padding: collisionPadding,
            boundary: filteredBoundary,
            altBoundary: filteredBoundary.length > 0
        };

        const data = useFloating({
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
            move: false
            // enabled: isOpen// make this controlled open
        });

        const focus = useFocus(context, {
            // enabled: isOpen // make this controlled open
        });

        const dismiss = useDismiss(context);

        const role = useRole(context, { role: 'tooltip' });

        const interactions = useInteractions([
            hover,
            focus,
            dismiss,
            role
        ]);

        return (
            <TooltipContext.Provider value={{ isOpen, setIsOpen, data, interactions, context, arrowRef }}>
                <div ref={ref} {...props}>
                    {children}
                </div>
            </TooltipContext.Provider>
        );
    }
);

TooltipRoot.displayName = COMPONENT_NAME;

export default TooltipRoot;
