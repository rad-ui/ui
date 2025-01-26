import React, { useState, useRef } from 'react';
import PopperContext from '../context/PopperContext';
import { customClassSwitcher } from '~/core';
import { useFloating, useInteractions, useHover, FloatingArrow, arrow, offset, flip, hide, shift, autoUpdate, useRole, useDismiss, Placement } from '@floating-ui/react';

export type PopperRootProps = {
  children: React.ReactNode;
  popperName?: string;
  customRootClass?: string;
  placement?: Placement;
  open?: boolean;
};

const ARROW_HEIGHT = 7;
const GAP = 2;

export default function PopperRoot({
    children,
    popperName = '',
    customRootClass = '',
    placement = 'top',
    open = false,
    ...props
}: PopperRootProps) {
    const rootClass = customClassSwitcher(customRootClass, popperName);
    const arrowRef = useRef<null>(null);
    const [isOpen, setIsOpen] = useState(open);

    const floating = useFloating({
        placement,
        whileElementsMounted: autoUpdate, // this makes sure the popup is attached to the reference on scrolling etc
        open: isOpen,
        // strategy: 'fixed',
        middleware: [
            arrow({
                element: arrowRef,
                padding: 4
            }),
            offset(ARROW_HEIGHT + GAP),
            flip({
                mainAxis: true,
                fallbackStrategy: 'initialPlacement'
            }
            ),
            shift({
                crossAxis: false
            }),
            hide({
                strategy: 'referenceHidden' // 'referenceHidden' by default
            })

        ],
        onOpenChange: setIsOpen
    });
    const context = floating.context;

    const role = useRole(context);
    const dismiss = useDismiss(context);

    const hover = useHover(context, {
    });

    const interactions = useInteractions([
        hover,
        role,
        dismiss
    ]);
    return (
        <PopperContext.Provider value={{ floatingArrowRef: arrowRef, dismiss, hover, role, interactions, floating, isOpen, setIsOpen, rootClass }}>
            {children}
        </PopperContext.Provider>
    );
}
