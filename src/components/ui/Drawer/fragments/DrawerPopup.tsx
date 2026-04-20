'use client';

import React, { forwardRef, useContext } from 'react';
import clsx from 'clsx';
import DialogPrimitive from '~/core/primitives/Dialog';
import composeEventHandlers from '~/core/hooks/composeEventHandlers';
import Floater from '~/core/primitives/Floater';
import { DrawerContext } from '../context/DrawerContext';
import { DialogPrimitiveContext } from '~/core/primitives/Dialog/context/DialogPrimitiveContext';
import { isBottomSheetDirection, useBottomSheetDrag } from '../utils/useBottomSheetDrag';
import { getDrawerRenderChild, resolveDrawerDynamicValue, type DrawerDynamicValue, type DrawerRenderProp } from '../utils/presentation';

type DrawerPopupElement = React.ElementRef<typeof DialogPrimitive.Content>;
type DialogPrimitiveContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>;

export type DrawerPopupProps = Omit<DialogPrimitiveContentProps, 'className' | 'style'> & {
    className?: DrawerDynamicValue<DrawerPopupState, string>;
    style?: DrawerDynamicValue<DrawerPopupState, React.CSSProperties>;
    render?: DrawerRenderProp<DialogPrimitiveContentProps, DrawerPopupState>;
};

type DrawerPopupState = {
    open: boolean;
    expanded: boolean;
    nested: boolean;
    nestedDrawerOpen: boolean;
    nestedDrawerSwiping: boolean;
    swipeDirection: string;
    swiping: boolean;
};

function resolveSnapPointOffset({
    snapPoint,
    size,
    fontSize
}: {
    snapPoint: number | string | null;
    size: number;
    fontSize: number;
}) {
    if (snapPoint === null || size <= 0) {
        return 0;
    }

    let resolvedValue = size;

    if (typeof snapPoint === 'number') {
        resolvedValue = snapPoint > 1 ? snapPoint : size * snapPoint;
    } else if (snapPoint.endsWith('rem')) {
        resolvedValue = Number.parseFloat(snapPoint) * fontSize;
    } else if (snapPoint.endsWith('px')) {
        resolvedValue = Number.parseFloat(snapPoint);
    } else {
        resolvedValue = Number.parseFloat(snapPoint);
    }

    return Math.max(0, size - Math.min(size, resolvedValue));
}

const DrawerPopup = forwardRef<DrawerPopupElement, DrawerPopupProps>(({
    children,
    className,
    style,
    render,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    ...props
}, ref) => {
    const {
        rootClass,
        swipeDirection,
        modal,
        nested,
        nestingLevel,
        nestedDrawerCount,
        nestedDrawerOpen,
        nestedDrawerSwiping,
        open,
        snapPoint,
        expanded,
        registerNestedDrawerSwiping,
        requestOpenChange
    } = useContext(DrawerContext);
    const { isOpen } = useContext(DialogPrimitiveContext);
    const isBottomSheet = isBottomSheetDirection(swipeDirection);
    const {
        dragStyle,
        dragStateAttributes,
        dragEventHandlers
    } = useBottomSheetDrag({
        direction: swipeDirection,
        enabled: isBottomSheet,
        isOpen,
        onDismiss: () => {
            requestOpenChange(false, {
                reason: 'swipe',
                event: new Event('swipe')
            });
        }
    });
    const popupRef = React.useRef<HTMLDivElement | null>(null);
    const state = {
        open,
        expanded,
        nested,
        nestingLevel,
        nestedDrawerOpen,
        nestedDrawerSwiping,
        swipeDirection,
        swiping: Boolean(dragStateAttributes['data-dragging'])
    };
    const resolvedClassName = clsx(rootClass && `${rootClass}-popup`, resolveDrawerDynamicValue(className, state));
    const resolvedStyle = {
        ...(resolveDrawerDynamicValue(style, state) ?? {}),
        '--rad-ui-drawer-nesting-level': `${nestingLevel}`,
        '--rad-ui-drawer-nested-drawer-count': `${nestedDrawerCount}`,
        ...dragStyle
    };
    const renderProps = {
        ...props,
        children,
        className: resolvedClassName,
        style: resolvedStyle
    } as DialogPrimitiveContentProps;
    const renderConfig = getDrawerRenderChild(render, renderProps, state);

    React.useEffect(() => {
        if (!dragStateAttributes['data-dragging']) {
            return;
        }

        return registerNestedDrawerSwiping(true);
    }, [dragStateAttributes, registerNestedDrawerSwiping]);

    React.useEffect(() => {
        const node = popupRef.current;
        if (!node) {
            return;
        }

        const rect = node.getBoundingClientRect();
        node.style.setProperty('--drawer-height', `${rect.height}px`);
        const computedStyle = window.getComputedStyle(node);
        const fontSize = Number.parseFloat(computedStyle.fontSize) || 16;
        const isHorizontal = swipeDirection === 'left' || swipeDirection === 'right';
        const offset = resolveSnapPointOffset({
            snapPoint,
            size: isHorizontal ? rect.width : rect.height,
            fontSize
        });

        node.style.setProperty('--drawer-snap-point-offset', `${offset}px`);
    }, [isOpen, nestedDrawerOpen, nestedDrawerSwiping, open, snapPoint, swipeDirection]);

    return (
        <DialogPrimitive.Content
            ref={Floater.useMergeRefs([popupRef, ref])}
            asChild={renderConfig.asChild}
            className={resolvedClassName}
            data-swipe-direction={swipeDirection}
            data-open={open ? '' : undefined}
            data-closed={!open ? '' : undefined}
            data-nested={nested ? '' : undefined}
            data-nesting-level={nested ? `${nestingLevel}` : undefined}
            data-nested-drawer-count={nestedDrawerCount > 0 ? `${nestedDrawerCount}` : undefined}
            data-expanded={expanded ? '' : undefined}
            data-nested-drawer-open={nestedDrawerOpen ? '' : undefined}
            data-nested-drawer-swiping={nestedDrawerSwiping ? '' : undefined}
            data-swiping={state.swiping ? '' : undefined}
            style={resolvedStyle}
            aria-modal={modal === true}
            trapFocus={modal !== false}
            {...dragStateAttributes}
            onPointerDown={composeEventHandlers(onPointerDown, dragEventHandlers.onPointerDown)}
            onPointerMove={composeEventHandlers(onPointerMove, dragEventHandlers.onPointerMove)}
            onPointerUp={composeEventHandlers(onPointerUp, dragEventHandlers.onPointerUp)}
            onPointerCancel={composeEventHandlers(onPointerCancel, dragEventHandlers.onPointerCancel)}
            {...props}
        >
            {renderConfig.children}
        </DialogPrimitive.Content>
    );
});

DrawerPopup.displayName = 'DrawerPopup';

export default DrawerPopup;
