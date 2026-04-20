'use client';

import React, { forwardRef, useContext } from 'react';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';
import { DrawerContext } from '../context/DrawerContext';
import { getDrawerRenderChild, resolveDrawerDynamicValue, type DrawerDynamicValue, type DrawerRenderProp } from '../utils/presentation';

type DrawerDescriptionElement = React.ElementRef<typeof Primitive.p>;
type PrimitiveParagraphProps = React.ComponentPropsWithoutRef<typeof Primitive.p>;

export type DrawerDescriptionProps = Omit<PrimitiveParagraphProps, 'className' | 'style'> & {
    className?: DrawerDynamicValue<Record<string, never>, string>;
    style?: DrawerDynamicValue<Record<string, never>, React.CSSProperties>;
    render?: DrawerRenderProp<PrimitiveParagraphProps, Record<string, never>>;
};

const DrawerDescription = forwardRef<DrawerDescriptionElement, DrawerDescriptionProps>(({ children, className, style, render, ...props }, ref) => {
    const { rootClass } = useContext(DrawerContext);
    const state = {};
    const resolvedClassName = clsx(rootClass && `${rootClass}-description`, resolveDrawerDynamicValue(className, state));
    const resolvedStyle = resolveDrawerDynamicValue(style, state);
    const renderProps = { ...props, children, className: resolvedClassName, style: resolvedStyle } as PrimitiveParagraphProps;
    const renderConfig = getDrawerRenderChild(render, renderProps, state);

    return (
        <Primitive.p
            ref={ref}
            asChild={renderConfig.asChild}
            className={resolvedClassName}
            style={resolvedStyle}
            {...props}
        >
            {renderConfig.children}
        </Primitive.p>
    );
});

DrawerDescription.displayName = 'DrawerDescription';

export default DrawerDescription;
