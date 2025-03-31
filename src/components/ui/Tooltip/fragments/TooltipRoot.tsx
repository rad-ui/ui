import React, { useState, useRef } from 'react';

import TooltipContext from '../context/TooltipContext';
import { useFloating, offset, flip, shift, useHover, useFocus, useDismiss, useRole, useInteractions, arrow } from '@floating-ui/react';

const COMPONENT_NAME = 'Tooltip';

const TooltipRoot = ({ children, placement = 'top' }: { children: React.ReactNode, placement?: Placement } & JSX.IntrinsicElements['div']) => {
    const arrowRef = useRef<HTMLDivElement>(null);

    const [isOpen, setIsOpen] = useState(false);

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
                padding: 5
            }),
            shift({ padding: 5 })
        ]
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
        <TooltipContext.Provider value={{ isOpen, setIsOpen, data, interactions, context }}>
            {children}
        </TooltipContext.Provider>
    );
};

TooltipRoot.displayName = COMPONENT_NAME;

export default TooltipRoot;
