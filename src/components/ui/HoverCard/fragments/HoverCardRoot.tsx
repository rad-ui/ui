import React, { useState, useRef, useEffect, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';

import HoverCardContext from '../contexts/HoverCardContext';
import Floater from '~/core/primitives/Floater';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
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
    collisionBoundary?: Element | null | Array<Element | null>;
    collisionPadding?: number;
};

const HoverCardRoot = forwardRef<HoverCardRootElement, HoverCardRootProps>(({ children, open: controlledOpen = undefined, onOpenChange, customRootClass = '', className = '', openDelay = 100, closeDelay = 200, collisionBoundary = null, collisionPadding = 4, ...props }, ref) => {
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);
    const rootTriggerClass = useComponentClass(customRootClass, `${COMPONENT_NAME}-trigger`);
    const arrowRef = useRef<SVGSVGElement | null>(null);
    const ARROW_HEIGHT = 8;
    const SPACING_GAP = 2;
    const boundary = Array.isArray(collisionBoundary) ? collisionBoundary : [collisionBoundary];
    const filteredBoundary = boundary.filter((item): item is Element => item != null);
    const detectOverflowOptions = {
        padding: collisionPadding,
        boundary: filteredBoundary,
        altBoundary: filteredBoundary.length > 0
    };

    const [open, setOpen] = useControllableState(controlledOpen, false, onOpenChange);

    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    const { refs: floatingRefs, floatingStyles, context: floatingContext } = Floater.useFloating({
        open,
        onOpenChange: handleOpenChange,
        placement: 'bottom',
        strategy: 'fixed',
        middleware: [
            Floater.arrow({
                element: arrowRef
            }),
            Floater.offset(ARROW_HEIGHT + SPACING_GAP),
            Floater.flip({
                mainAxis: true,
                ...detectOverflowOptions
            }),
            Floater.shift({
                ...detectOverflowOptions
            })
        ],
        whileElementsMounted: Floater.autoUpdate
    });

    // When the pointer leaves the trigger/content, delay closing and confirm
    // the pointer has not re-entered before committing the state change.
    const [mouseIsExiting, setMouseIsExiting] = useState(false);
    const openTimeoutRef = useRef<number | null>(null);
    const closeTimeoutRef = useRef<number | null>(null);

    const role = Floater.useRole(floatingContext, { role: 'dialog' });
    const dismiss = Floater.useDismiss(floatingContext);

    const { getReferenceProps, getFloatingProps } = Floater.useInteractions([
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
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
        }
        if (openTimeoutRef.current) {
            clearTimeout(openTimeoutRef.current);
        }

        if (openDelay <= 0) {
            handleOpenChange(true);
            return;
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

        if (closeDelay <= 0) {
            handleOpenChange(false);
            return;
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
        <div ref={ref} className={clsx(rootClass && `${rootClass}-root`, className)} {...props}>{children}</div>
    </HoverCardContext.Provider>;
});

HoverCardRoot.displayName = COMPONENT_NAME;

export default HoverCardRoot;
