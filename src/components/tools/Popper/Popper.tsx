import React, { useState, useRef } from 'react';
import { customClassSwitcher } from '~/core';
import { clsx } from 'clsx';

import { useFloating, useInteractions, useHover, FloatingArrow, arrow, offset, flip, autoPlacement, hide, shift, autoUpdate, useRole, useDismiss } from '@floating-ui/react';

// TODO : Use Floating Portal?
// TODO : Collisions dont seem to be working as expected, need to investigate

const ARROW_HEIGHT = 7;
const GAP = 2;

/**
 *
 *
 * For Placement https://floating-ui.com/docs/computePosition#placement

 */

export type PopperProps = {
    popperName?: string;
    customRootClass?: string;
    activationStrategy?: 'hover';
    className?: string;
    placement?:
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
    children?: React.ReactNode; // TODO: fix
    open?: boolean;
    hoverDelay?: number;
    showArrow?: boolean;
    pop?: React.ReactNode;
    props?: Record<string, any>[];
}

const Popper = ({
    popperName = '',
    customRootClass = '',
    activationStrategy = 'hover',
    className = '',
    placement = 'top',
    children,
    open = false,
    hoverDelay = 10,
    showArrow = true,
    pop = <></>,
    ...props
}: PopperProps) => {
    //
    const rootClass = customClassSwitcher(customRootClass, popperName);
    const arrowRef = useRef(null);
    const [isOpen, setIsOpen] = useState(open);

    const { refs, floatingStyles, context } = useFloating({
        placement,
        whileElementsMounted: autoUpdate, // this makes sure the popup is attached to the reference on scrolling etc
        open: isOpen,
        // strategy: 'fixed',
        middleware: [
            arrow({
                element: arrowRef
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

    const role = useRole(context);
    const dismiss = useDismiss(context);

    const hover = useHover(context, {
    // delay: hoverDelay,
    });

    const { getReferenceProps, getFloatingProps } = useInteractions([
        hover,
        role,
        dismiss
    ]);

    return <span>
        <span
            className={clsx('rad-ui-popper', `${rootClass}-reference-element`, className)} ref={refs.setReference} {...getReferenceProps(
                {
                    onClick: () => {
                        console.log('click');
                    }
                }
            )}>{children}</span>
        {
            isOpen && <div className={clsx(`${rootClass}-floating-element`)} ref={refs.setFloating} style={floatingStyles} {...getFloatingProps()} >
                {showArrow && <FloatingArrow className={clsx(`rad-ui-arrow ${rootClass}-arrow`)} ref={arrowRef} context={context} />}
                {pop}</div>
        }
    </span>;
};

export default Popper;
