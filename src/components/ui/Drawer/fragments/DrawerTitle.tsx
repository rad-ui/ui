'use client';

import React, { forwardRef, useContext } from 'react';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';
import { DrawerContext } from '../context/DrawerContext';
import { getDrawerRenderChild, resolveDrawerDynamicValue, type DrawerDynamicValue, type DrawerRenderProp } from '../utils/presentation';

type DrawerTitleElement = React.ElementRef<typeof Primitive.h2>;
type PrimitiveHeadingProps = React.ComponentPropsWithoutRef<typeof Primitive.h2>;

export type DrawerTitleProps = Omit<PrimitiveHeadingProps, 'className' | 'style'> & {
    className?: DrawerDynamicValue<Record<string, never>, string>;
    style?: DrawerDynamicValue<Record<string, never>, React.CSSProperties>;
    render?: DrawerRenderProp<PrimitiveHeadingProps, Record<string, never>>;
};

const DrawerTitle = forwardRef<DrawerTitleElement, DrawerTitleProps>(({ children, className, style, render, ...props }, ref) => {
    const { rootClass } = useContext(DrawerContext);
    const state = {};
    const resolvedClassName = clsx(rootClass && `${rootClass}-title`, resolveDrawerDynamicValue(className, state));
    const resolvedStyle = resolveDrawerDynamicValue(style, state);
    const renderProps = { ...props, children, className: resolvedClassName, style: resolvedStyle } as PrimitiveHeadingProps;
    const renderConfig = getDrawerRenderChild(render, renderProps, state);

    return (
        <Primitive.h2
            ref={ref}
            asChild={renderConfig.asChild}
            className={resolvedClassName}
            style={resolvedStyle}
            {...props}
        >
            {renderConfig.children}
        </Primitive.h2>
    );
});

DrawerTitle.displayName = 'DrawerTitle';

export default DrawerTitle;
