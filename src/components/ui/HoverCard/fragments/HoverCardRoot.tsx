import React, { useState, useRef, useEffect, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';

import HoverCardContext from '../contexts/HoverCardContext';
import Floater from '~/core/primitives/Floater';
import { customClassSwitcher } from '~/core';
import { useControllableState } from '~/core/hooks/useControllableState';
import clsx from 'clsx';
const COMPONENT_NAME = 'HoverCard';

export type HoverCardRootElement = ElementRef<'div'>;
export type HoverCardRootProps = ComponentPropsWithoutRef<'div'> & {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    customRootClass?: string;
    openDelay?: number;
    closeDelay?: number;
};

const HoverCardRoot = forwardRef<HoverCardRootElement, HoverCardRootProps>(({ children, open: controlledOpen = undefined, onOpenChange, customRootClass = '', openDelay = 100, closeDelay = 200, ...props }, ref) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    const rootTriggerClass = customClassSwitcher(customRootClass, `${COMPONENT_NAME}-trigger`);
    const arrowRef = useRef<SVGSVGElement | null>(null);
    const ARROW_HEIGHT = 8;
    const SPACING_GAP = 2;

    const { refs: floatingRefs, floatingStyles, context: floatingContext } = Floater.useFloating({
        placement: 'bottom',
        strategy: 'fixed',
        middleware: [
            Floater.arrow({
                element: arrowRef
            }),
            Floater.offset(ARROW_HEIGHT + SPACING_GAP),
            Floater.flip({
                mainAxis: true
            })
        ]
    });

    const [open, setOpen] = useControllableState(controlledOpen, false, onOpenChange);

    // when hovered out, we set this to true, after delay we check if it's still true and then we set open to false
    // eslint-disable-next-line no-unused-vars
    const [mouseIsExiting, setMouseIsExiting] = useState(false);
    const openTimeoutRef = useRef<number | null>(null);
    const closeTimeoutRef = useRef<number | null>(null);

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
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
        setMouseIsExiting(true);
    };

    const markMouseIsEntering = () => {
        setMouseIsExiting(false);
    };

    const openWithDelay = () => {
        markMouseIsEntering();
        if (openTimeoutRef.current) {
            clearTimeout(openTimeoutRef.current);
        }
        openTimeoutRef.current = setTimeout(() => {
            handleOpenChange(true);
        }, openDelay) as unknown as number;
    };

    const closeWithDelay = () => {
        markMouseIsExiting();
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
        }
        closeTimeoutRef.current = setTimeout(() => {
            setMouseIsExiting(prevState => {
                if (prevState) {
                    handleOpenChange(false);
                }
                return prevState;
            });
        }, closeDelay) as unknown as number;
    };

    const closeWithoutDelay = () => {
        handleOpenChange(false);
    };

    useEffect(() => {
        return () => {
            if (openTimeoutRef.current) {
                clearTimeout(openTimeoutRef.current);
            }
            if (closeTimeoutRef.current) {
                clearTimeout(closeTimeoutRef.current);
            }
        };
    }, []);

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
        rootTriggerClass,
        closeWithDelay,
        closeWithoutDelay,
        openWithDelay
    };

    return <HoverCardContext.Provider value={sendValues}>
        <div ref={ref} className={clsx(rootClass)} {...props}>{children}</div>
    </HoverCardContext.Provider>;
});

HoverCardRoot.displayName = COMPONENT_NAME;

export default HoverCardRoot;
