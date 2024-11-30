import React, { useState, useRef } from 'react';

import HoverCardContext from '../contexts/HoverCardContext';
import Floater from '~/core/primitives/Floater';
import { customClassSwitcher } from '~/core';

const COMPONENT_NAME = 'HoverCard';

type HoverCardRootProps = {
    children: React.ReactNode,
    open: boolean | undefined,
    onOpenChange: (open: boolean) => void,
    customRootClass: string,
    openDelay: number,
    closeDelay: number,
    props: React.HTMLAttributes<HTMLElement>
}

const HoverCardRoot = ({ children, open: controlledOpen = undefined, onOpenChange, customRootClass = '', openDelay = 300, closeDelay = 750, ...props }: HoverCardRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    const arrowRef = useRef(null);
    const { refs: floatingRefs, floatingStyles, context: floatingContext } = Floater.useFloating({
        placement: 'bottom',
        strategy: 'fixed',
        middleware: [
            Floater.arrow({
                element: arrowRef
            }),
            Floater.offset(7),
            Floater.flip({
                mainAxis: true
                // fallbackStrategy: 'initialPlacement'
            }
            )
            // Floater.shift({
            //     crossAxis: true
            // })
            // Floater.hide({
            //     strategy: 'referenceHidden' // 'referenceHidden' by default
            // })
        ]
    });

    const [uncontrolledOpen, setUncontrolledOpen] = useState(false);

    // when hovered out, we set this to true, after delay we check if it's still true and then we set open to false
    const [mouseIsExiting, setMouseIsExiting] = useState(false);

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

    const markMouseIsExiting = () => {
        console.log('marking mouse as exiting');
        setMouseIsExiting(true);
        console.log('\n');
    };

    const markMouseIsEntering = () => {
        console.log('marking mouse as entering');
        setMouseIsExiting(false);
        console.log('/n');
    };

    const openWithDelay = () => {
        markMouseIsEntering();
        setTimeout(() => {
            handleOpenChange(true);
        }, openDelay);
    };

    const closeWithDelay = () => {
        markMouseIsExiting();

        setTimeout(() => {
            setMouseIsExiting(prevState => {
                if (prevState) {
                    handleOpenChange(false);
                }
                return prevState;
            });
        }, closeDelay);
    };

    const closeWithoutDelay = () => {
        handleOpenChange(false);
    };

    const sendValues = {
        isOpen: open,
        handleOpenChange,
        floatingRefs,
        floatingStyles,
        floatingContext,
        arrowRef,
        getReferenceProps,
        getFloatingProps,
        rootClass,
        closeWithDelay,
        closeWithoutDelay,
        openWithDelay
    };

    return <HoverCardContext.Provider value={sendValues}>
        <div className={rootClass} {...props}>{children}</div>
    </HoverCardContext.Provider>;
};

export default HoverCardRoot;
