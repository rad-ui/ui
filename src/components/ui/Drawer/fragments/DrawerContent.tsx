'use client';

import React, { forwardRef, useContext } from 'react';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';
import { DrawerContext } from '../context/DrawerContext';
import { getDrawerRenderChild, resolveDrawerDynamicValue, type DrawerDynamicValue, type DrawerRenderProp } from '../utils/presentation';

type DrawerContentElement = React.ElementRef<typeof Primitive.div>;
type PrimitiveDivProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;

export type DrawerContentProps = Omit<PrimitiveDivProps, 'className' | 'style'> & {
    className?: DrawerDynamicValue<Record<string, never>, string>;
    style?: DrawerDynamicValue<Record<string, never>, React.CSSProperties>;
    render?: DrawerRenderProp<PrimitiveDivProps, Record<string, never>>;
};

const DrawerContent = forwardRef<DrawerContentElement, DrawerContentProps>(({ children, className, style, render, ...props }, ref) => {
    const { rootClass, swipeDirection, open } = useContext(DrawerContext);
    const state = {};
    const resolvedClassName = clsx(rootClass && `${rootClass}-content`, resolveDrawerDynamicValue(className, state));
    const resolvedStyle = resolveDrawerDynamicValue(style, state);
    const renderProps = { ...props, children, className: resolvedClassName, style: resolvedStyle } as PrimitiveDivProps;
    const renderConfig = getDrawerRenderChild(render, renderProps, state);

    return (
        <Primitive.div
            ref={ref}
            asChild={renderConfig.asChild}
            className={resolvedClassName}
            style={resolvedStyle}
            data-swipe-direction={swipeDirection}
            data-open={open ? '' : undefined}
            data-closed={!open ? '' : undefined}
            {...props}
        >
            {renderConfig.children}
        </Primitive.div>
    );
});

DrawerContent.displayName = 'DrawerContent';

export default DrawerContent;
