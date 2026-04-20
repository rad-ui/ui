'use client';

import React, { forwardRef, useContext } from 'react';
import clsx from 'clsx';
import ButtonPrimitive from '~/core/primitives/Button';
import { DrawerContext } from '../context/DrawerContext';
import { getDrawerRenderChild, resolveDrawerDynamicValue, type DrawerDynamicValue, type DrawerRenderProp } from '../utils/presentation';

type DrawerCloseElement = React.ElementRef<typeof ButtonPrimitive>;
type ButtonPrimitiveProps = React.ComponentPropsWithoutRef<typeof ButtonPrimitive>;

type DrawerCloseState = {
    disabled: boolean;
};

export type DrawerCloseProps = Omit<ButtonPrimitiveProps, 'className' | 'style'> & {
    className?: DrawerDynamicValue<DrawerCloseState, string>;
    style?: DrawerDynamicValue<DrawerCloseState, React.CSSProperties>;
    render?: DrawerRenderProp<ButtonPrimitiveProps, DrawerCloseState>;
};

const DrawerClose = forwardRef<DrawerCloseElement, DrawerCloseProps>(({
    children,
    asChild,
    className,
    style,
    render,
    disabled = false,
    onClick,
    ...props
}, ref) => {
    const drawerContext = useContext(DrawerContext);
    const state = { disabled };
    const resolvedClassName = clsx(
        drawerContext.rootClass && `${drawerContext.rootClass}-close`,
        resolveDrawerDynamicValue(className, state)
    );
    const resolvedStyle = resolveDrawerDynamicValue(style, state);
    const renderProps = {
        ...props,
        children,
        disabled,
        className: resolvedClassName,
        style: resolvedStyle
    } as ButtonPrimitiveProps;
    const renderConfig = getDrawerRenderChild(render, renderProps, state);

    return (
        <ButtonPrimitive
            ref={ref}
            asChild={asChild || renderConfig.asChild}
            className={resolvedClassName}
            style={resolvedStyle}
            disabled={disabled}
            onClick={(event) => {
                onClick?.(event);

                if (event.defaultPrevented || disabled) {
                    return;
                }

                drawerContext.requestOpenChange(false, {
                    reason: 'close-press',
                    event: event.nativeEvent,
                    trigger: event.currentTarget
                });
            }}
            {...props}
        >
            {renderConfig.children}
        </ButtonPrimitive>
    );
});

DrawerClose.displayName = 'DrawerClose';

export default DrawerClose;
