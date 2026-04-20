'use client';

import React, { forwardRef, useContext } from 'react';
import clsx from 'clsx';
import Floater from '~/core/primitives/Floater';
import ButtonPrimitive from '~/core/primitives/Button';
import { DialogPrimitiveContext } from '~/core/primitives/Dialog/context/DialogPrimitiveContext';
import { DrawerContext, type DrawerHandleLike } from '../context/DrawerContext';
import { getDrawerRenderChild, resolveDrawerDynamicValue, type DrawerDynamicValue, type DrawerRenderProp } from '../utils/presentation';

type DrawerTriggerElement = React.ElementRef<typeof ButtonPrimitive>;
type ButtonPrimitiveProps = React.ComponentPropsWithoutRef<typeof ButtonPrimitive>;

export type DrawerTriggerProps = Omit<ButtonPrimitiveProps, 'onClick' | 'className' | 'style'> & {
    className?: DrawerDynamicValue<DrawerTriggerState, string>;
    id?: string;
    handle?: DrawerHandleLike;
    payload?: unknown;
    style?: DrawerDynamicValue<DrawerTriggerState, React.CSSProperties>;
    render?: DrawerRenderProp<ButtonPrimitiveProps, DrawerTriggerState>;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

type DrawerTriggerState = {
    disabled: boolean;
    open: boolean;
};

const DrawerTrigger = forwardRef<DrawerTriggerElement, DrawerTriggerProps>(({
    children,
    asChild,
    className = '',
    id,
    handle,
    payload,
    style,
    render,
    onClick,
    disabled = false,
    ...props
}, ref) => {
    const drawerContext = useContext(DrawerContext);
    const { getReferenceProps, refs } = useContext(DialogPrimitiveContext);
    const mergedRef = Floater.useMergeRefs([refs.setReference, ref]);
    const activeHandle = handle ?? drawerContext.handle;
    const state = { disabled, open: drawerContext.open };
    const resolvedClassName = clsx(
        drawerContext.rootClass && `${drawerContext.rootClass}-trigger`,
        resolveDrawerDynamicValue(className, state)
    );
    const resolvedStyle = resolveDrawerDynamicValue(style, state);
    const renderProps = {
        ...props,
        children,
        disabled,
        id,
        className: resolvedClassName,
        style: resolvedStyle
    } as ButtonPrimitiveProps;
    const renderConfig = getDrawerRenderChild(render, renderProps, state);

    return (
        <ButtonPrimitive
            ref={mergedRef}
            asChild={asChild || renderConfig.asChild}
            id={id}
            className={resolvedClassName}
            style={resolvedStyle}
            disabled={disabled}
            data-open={drawerContext.open ? '' : undefined}
            data-closed={!drawerContext.open ? '' : undefined}
            onClick={(event) => {
                onClick?.(event);

                if (event.defaultPrevented || disabled) {
                    return;
                }

                if (id) {
                    drawerContext.setActiveTriggerId(id);
                }

                if (payload !== undefined) {
                    drawerContext.setPayload(payload);
                }

                if (activeHandle) {
                    if (payload !== undefined) {
                        activeHandle.openWithPayload(payload);
                    } else {
                        activeHandle.open(id ?? null);
                    }
                    return;
                }

                drawerContext.requestOpenChange(true, {
                    reason: 'trigger-press',
                    event: event.nativeEvent,
                    trigger: event.currentTarget
                });
            }}
            {...getReferenceProps()}
            {...props}
        >
            {renderConfig.children}
        </ButtonPrimitive>
    );
});

DrawerTrigger.displayName = 'DrawerTrigger';

export default DrawerTrigger;
