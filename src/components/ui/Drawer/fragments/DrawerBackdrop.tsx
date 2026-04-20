'use client';

import React, { forwardRef, useContext } from 'react';
import clsx from 'clsx';
import DialogPrimitive from '~/core/primitives/Dialog';
import { DrawerContext } from '../context/DrawerContext';
import { shouldIgnoreDismissFollowUpClick } from '../utils/useBottomSheetDrag';
import { resolveDrawerDynamicValue, type DrawerDynamicValue } from '../utils/presentation';

type DrawerBackdropElement = React.ElementRef<typeof DialogPrimitive.Overlay>;
type DialogPrimitiveOverlayProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>;

export type DrawerBackdropProps = Omit<DialogPrimitiveOverlayProps, 'className' | 'style'> & {
    className?: DrawerDynamicValue<DrawerBackdropState, string>;
    style?: DrawerDynamicValue<DrawerBackdropState, React.CSSProperties>;
    forceRender?: boolean;
};

type DrawerBackdropState = {
    open: boolean;
};

const DrawerBackdrop = forwardRef<DrawerBackdropElement, DrawerBackdropProps>(({
    className = '',
    style,
    forceRender = false,
    forceMount,
    onClick,
    ...props
}, ref) => {
    const { rootClass, swipeDirection, open, setPendingChangeDetails } = useContext(DrawerContext);
    const state = { open };
    const resolvedClassName = clsx(
        rootClass && `${rootClass}-backdrop`,
        resolveDrawerDynamicValue(className, state)
    );
    const resolvedStyle = resolveDrawerDynamicValue(style, state);

    return (
        <DialogPrimitive.Overlay
            ref={ref}
            className={resolvedClassName}
            style={resolvedStyle}
            data-swipe-direction={swipeDirection}
            data-open={open ? '' : undefined}
            data-closed={!open ? '' : undefined}
            forceMount={forceMount ?? forceRender}
            onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                onClick?.(event);

                if (event.defaultPrevented) {
                    return;
                }

                if (shouldIgnoreDismissFollowUpClick()) {
                    event.preventDefault();
                    event.stopPropagation();
                    return;
                }

                if (!event.defaultPrevented) {
                    setPendingChangeDetails({
                        reason: 'outside-press',
                        event: event.nativeEvent,
                        trigger: event.currentTarget
                    });
                }
            }}
            {...props}
        />
    );
});

DrawerBackdrop.displayName = 'DrawerBackdrop';

export default DrawerBackdrop;
