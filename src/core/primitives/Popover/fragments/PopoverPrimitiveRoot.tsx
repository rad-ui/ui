'use client';

import React, { forwardRef } from 'react';
import Floater from '~/core/primitives/Floater';
import Primitive from '~/core/primitives/Primitive';
import { useControllableState } from '~/core/hooks/useControllableState';
import {
    defaultPopoverPositioning,
    PopoverPrimitiveContext
} from '../context/PopoverPrimitiveContext';

export type PopoverPrimitiveRootProps = React.ComponentPropsWithoutRef<typeof Primitive.div> & {
    children: React.ReactNode;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    modal?: boolean;
};

const COMPONENT_NAME = 'PopoverPrimitive';

const getPlacement = (side: 'top' | 'right' | 'bottom' | 'left', align: 'start' | 'center' | 'end') => {
    if (align === 'center') {
        return side;
    }

    return `${side}-${align}` as const;
};

const PopoverPrimitiveRootInner = forwardRef<HTMLDivElement, PopoverPrimitiveRootProps>(({
    children,
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    modal = false,
    ...props
}, ref) => {
    const [isOpen, setIsOpen] = useControllableState(controlledOpen, defaultOpen, onOpenChange);
    const [triggerNode, setTriggerNode] = React.useState<HTMLElement | null>(null);
    const [anchorNode, setAnchorNode] = React.useState<HTMLElement | null>(null);
    const [arrowNode, setArrowNode] = React.useState<SVGSVGElement | null>(null);
    const [positioning, setPositioningState] = React.useState(defaultPopoverPositioning);
    const nodeId = Floater.useFloatingNodeId();

    const placement = React.useMemo(
        () => getPlacement(positioning.side, positioning.align),
        [positioning.align, positioning.side]
    );

    const collisionBoundary = React.useMemo(() => {
        const boundary = Array.isArray(positioning.collisionBoundary)
            ? positioning.collisionBoundary
            : [positioning.collisionBoundary];

        return boundary.filter((item): item is Element => item != null);
    }, [positioning.collisionBoundary]);

    const detectOverflowOptions = React.useMemo(() => ({
        padding: positioning.collisionPadding,
        boundary: collisionBoundary,
        altBoundary: collisionBoundary.length > 0
    }), [collisionBoundary, positioning.collisionPadding]);

    const { context: floatingContext, refs, floatingStyles } = Floater.useFloating({
        open: isOpen,
        nodeId,
        onOpenChange: setIsOpen,
        placement,
        strategy: 'fixed',
        middleware: [
            Floater.offset({
                mainAxis: positioning.sideOffset + (arrowNode ? 5 : 0),
                crossAxis: positioning.alignOffset
            }),
            positioning.avoidCollisions
                ? Floater.flip({
                    crossAxis: placement.includes('-'),
                    fallbackAxisSideDirection: 'start',
                    ...detectOverflowOptions
                })
                : null,
            positioning.avoidCollisions
                ? Floater.shift({
                    ...detectOverflowOptions,
                    limiter: positioning.sticky === 'partial' ? Floater.limitShift() : undefined
                })
                : null,
            arrowNode
                ? Floater.arrow({
                    element: arrowNode,
                    padding: positioning.arrowPadding
                })
                : null,
            positioning.hideWhenDetached
                ? Floater.hide({ strategy: 'referenceHidden' })
                : null
        ].filter(Boolean),
        whileElementsMounted: Floater.autoUpdate
    });

    React.useEffect(() => {
        refs.setReference(anchorNode ?? triggerNode);
    }, [anchorNode, refs, triggerNode]);

    const contentId = Floater.useId() ?? '';

    const setPositioning = React.useCallback((value: Partial<typeof defaultPopoverPositioning>) => {
        setPositioningState(prev => ({ ...prev, ...value }));
    }, []);

    const handleOpenChange = React.useCallback((nextOpen: boolean) => {
        setIsOpen(nextOpen);
    }, [setIsOpen]);

    const contextValue = React.useMemo(() => ({
        isOpen,
        modal,
        contentId,
        triggerNode,
        anchorNode,
        handleOpenChange,
        setTriggerNode,
        setAnchorNode,
        setArrowNode,
        positioning,
        setPositioning,
        refs,
        floatingStyles,
        floatingContext
    }), [
        anchorNode,
        contentId,
        floatingContext,
        floatingStyles,
        handleOpenChange,
        isOpen,
        modal,
        positioning,
        refs,
        setPositioning,
        triggerNode
    ]);

    return (
        <PopoverPrimitiveContext.Provider value={contextValue}>
            <Floater.FloatingNode id={nodeId}>
                <Primitive.div ref={ref} data-state={isOpen ? 'open' : 'closed'} {...props}>
                    {children}
                </Primitive.div>
            </Floater.FloatingNode>
        </PopoverPrimitiveContext.Provider>
    );
});

PopoverPrimitiveRootInner.displayName = `${COMPONENT_NAME}Inner`;

const PopoverPrimitiveRoot = forwardRef<HTMLDivElement, PopoverPrimitiveRootProps>((props, ref) => {
    const floatingTree = Floater.useFloatingTree();

    if (floatingTree) {
        return <PopoverPrimitiveRootInner ref={ref} {...props} />;
    }

    return (
        <Floater.FloatingTree>
            <PopoverPrimitiveRootInner ref={ref} {...props} />
        </Floater.FloatingTree>
    );
});

PopoverPrimitiveRoot.displayName = COMPONENT_NAME;

export default PopoverPrimitiveRoot;
