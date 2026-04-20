'use client';

import React, { forwardRef, useContext, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';
import { DrawerContext, type DrawerSwipeDirection } from '../context/DrawerContext';
import { DialogPrimitiveContext } from '~/core/primitives/Dialog/context/DialogPrimitiveContext';
import { getDrawerRenderChild, resolveDrawerDynamicValue, type DrawerDynamicValue, type DrawerRenderProp } from '../utils/presentation';

type DrawerSwipeAreaElement = React.ElementRef<typeof Primitive.div>;
type PrimitiveDivProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;

export type DrawerSwipeAreaProps = Omit<PrimitiveDivProps, 'className' | 'style'> & {
    className?: DrawerDynamicValue<DrawerSwipeAreaState, string>;
    disabled?: boolean;
    swipeDirection?: DrawerSwipeDirection;
    style?: DrawerDynamicValue<DrawerSwipeAreaState, React.CSSProperties>;
    render?: DrawerRenderProp<PrimitiveDivProps, DrawerSwipeAreaState>;
};

type DrawerSwipeAreaState = {
    open: boolean;
    swiping: boolean;
    swipeDirection: DrawerSwipeDirection;
    disabled: boolean;
};

const ACTIVATION_THRESHOLD_PX = 42;

function getOpeningSwipeDirection(swipeDirection: DrawerSwipeDirection): DrawerSwipeDirection {
    switch (swipeDirection) {
    case 'down':
        return 'up';
    case 'up':
        return 'down';
    case 'left':
        return 'right';
    case 'right':
    default:
        return 'left';
    }
}

function getPointerPosition(event: Pick<React.PointerEvent<HTMLDivElement>, 'clientX' | 'clientY'>, direction: DrawerSwipeDirection) {
    return direction === 'left' || direction === 'right'
        ? event.clientX
        : event.clientY;
}

function getDirectionalDelta(delta: number, direction: DrawerSwipeDirection) {
    return direction === 'down' || direction === 'right'
        ? delta
        : delta * -1;
}

const DrawerSwipeArea = forwardRef<DrawerSwipeAreaElement, DrawerSwipeAreaProps>(({
    className = '',
    disabled = false,
    swipeDirection: swipeDirectionProp,
    style,
    render,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    ...props
}, ref) => {
    const drawerContext = useContext(DrawerContext);
    const { isOpen } = useContext(DialogPrimitiveContext);
    const [swiping, setSwiping] = useState(false);
    const cleanupNestedSwipingRef = useRef<(() => void) | null>(null);
    const pointerIdRef = useRef<number | null>(null);
    const startPositionRef = useRef(0);
    const swipeDirection = swipeDirectionProp ?? getOpeningSwipeDirection(drawerContext.swipeDirection);
    const state = { open: isOpen, swiping, swipeDirection, disabled };
    const resolvedClassName = clsx(drawerContext.rootClass && `${drawerContext.rootClass}-swipe-area`, resolveDrawerDynamicValue(className, state));
    const resolvedStyle = resolveDrawerDynamicValue(style, state);
    const renderProps = { ...props, children: props.children, className: resolvedClassName, style: resolvedStyle } as PrimitiveDivProps;
    const renderConfig = getDrawerRenderChild(render, renderProps, state);

    useEffect(() => {
        return () => {
            cleanupNestedSwipingRef.current?.();
        };
    }, []);

    return (
        <Primitive.div
            ref={ref}
            asChild={renderConfig.asChild}
            className={resolvedClassName}
            data-open={isOpen ? '' : undefined}
            data-closed={!isOpen ? '' : undefined}
            data-disabled={disabled ? '' : undefined}
            data-swiping={swiping ? '' : undefined}
            data-swipe-direction={swipeDirection}
            style={resolvedStyle}
            onPointerDown={(event: React.PointerEvent<HTMLDivElement>) => {
                (onPointerDown as React.PointerEventHandler<HTMLDivElement> | undefined)?.(event);

                if (disabled || isOpen) {
                    return;
                }

                pointerIdRef.current = event.pointerId;
                startPositionRef.current = getPointerPosition(event, swipeDirection);
                cleanupNestedSwipingRef.current?.();
                cleanupNestedSwipingRef.current = drawerContext.registerNestedDrawerSwiping(true);
                setSwiping(true);

                if (typeof event.currentTarget.setPointerCapture === 'function') {
                    event.currentTarget.setPointerCapture(event.pointerId);
                }
            }}
            onPointerMove={(event: React.PointerEvent<HTMLDivElement>) => {
                (onPointerMove as React.PointerEventHandler<HTMLDivElement> | undefined)?.(event);

                if (pointerIdRef.current !== event.pointerId || disabled || isOpen) {
                    return;
                }

                const delta = getPointerPosition(event, swipeDirection) - startPositionRef.current;
                const directionalDelta = getDirectionalDelta(delta, swipeDirection);

                if (directionalDelta >= ACTIVATION_THRESHOLD_PX) {
                    drawerContext.requestOpenChange(true, {
                        reason: 'swipe',
                        event: event.nativeEvent
                    });
                    cleanupNestedSwipingRef.current?.();
                    cleanupNestedSwipingRef.current = null;
                    setSwiping(false);
                    pointerIdRef.current = null;
                }
            }}
            onPointerUp={(event: React.PointerEvent<HTMLDivElement>) => {
                (onPointerUp as React.PointerEventHandler<HTMLDivElement> | undefined)?.(event);
                if (pointerIdRef.current !== event.pointerId) {
                    return;
                }

                pointerIdRef.current = null;
                cleanupNestedSwipingRef.current?.();
                cleanupNestedSwipingRef.current = null;
                setSwiping(false);
            }}
            onPointerCancel={(event: React.PointerEvent<HTMLDivElement>) => {
                (onPointerCancel as React.PointerEventHandler<HTMLDivElement> | undefined)?.(event);
                if (pointerIdRef.current !== event.pointerId) {
                    return;
                }

                pointerIdRef.current = null;
                cleanupNestedSwipingRef.current?.();
                cleanupNestedSwipingRef.current = null;
                setSwiping(false);
            }}
            {...props}
        >
            {renderConfig.children}
        </Primitive.div>
    );
});

DrawerSwipeArea.displayName = 'DrawerSwipeArea';

export default DrawerSwipeArea;
