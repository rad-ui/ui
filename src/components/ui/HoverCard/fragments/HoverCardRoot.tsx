import React, { useState, useRef } from 'react';

import HoverCardContext from '../contexts/HoverCardContext';
import Floater from '~/core/primitives/Floater';
import { customClassSwitcher } from '~/core';

const COMPONENT_NAME = 'HoverCard';
const HoverCardRoot = ({ children, open: controlledOpen = undefined, onOpenChange, customRootClass = '', ...props }: { children: React.ReactNode, open: boolean | undefined, onOpenChange: (open: boolean) => void, customRootClass: string, props: React.HTMLAttributes<HTMLElement> }) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    const arrowRef = useRef(null);
    const { refs: floatingRefs, floatingStyles, context: floatingContext } = Floater.useFloating({
        placement: 'bottom',
        strategy: 'fixed',
        middleware: [
            Floater.arrow({
                element: arrowRef
            }),
            Floater.flip({
                mainAxis: true,
                fallbackStrategy: 'initialPlacement'
            }
            ),
            Floater.shift({
                crossAxis: false
            }),
            Floater.hide({
                strategy: 'referenceHidden' // 'referenceHidden' by default
            })
        ]
    });

    const [uncontrolledOpen, setUncontrolledOpen] = useState(false);

    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : uncontrolledOpen;

    const handleOpenChange = (newOpen: boolean) => {
        if (!isControlled) {
            setUncontrolledOpen(newOpen);
        }
        onOpenChange?.(newOpen);
    };

    const role = Floater.useRole(floatingContext);
    const dismiss = Floater.useDismiss(floatingContext);

    const hover = Floater.useHover(floatingContext, {
        delay: 100
    });

    const { getReferenceProps, getFloatingProps } = Floater.useInteractions([
        hover,
        role,
        dismiss
    ]);

    const sendValues = {
        isOpen: open,
        handleOpenChange,
        floatingRefs,
        floatingStyles,
        floatingContext,
        arrowRef,
        getReferenceProps,
        getFloatingProps
    };

    return <HoverCardContext.Provider value={sendValues}>
        <div className={rootClass} {...props}>{children}</div>
    </HoverCardContext.Provider>;
};

export default HoverCardRoot;
