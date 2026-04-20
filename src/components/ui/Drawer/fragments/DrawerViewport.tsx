'use client';

import React, { forwardRef, useContext } from 'react';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';
import { DrawerContext } from '../context/DrawerContext';
import { getDrawerRenderChild, resolveDrawerDynamicValue, type DrawerDynamicValue, type DrawerRenderProp } from '../utils/presentation';

type DrawerViewportElement = React.ElementRef<typeof Primitive.div>;
type PrimitiveDivProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;

export type DrawerViewportProps = Omit<PrimitiveDivProps, 'className' | 'style'> & {
    className?: DrawerDynamicValue<DrawerViewportState, string>;
    style?: DrawerDynamicValue<DrawerViewportState, React.CSSProperties>;
    render?: DrawerRenderProp<PrimitiveDivProps, DrawerViewportState>;
};

type DrawerViewportState = {
    open: boolean;
    nested: boolean;
    nestedDrawerOpen: boolean;
};

const DrawerViewport = forwardRef<DrawerViewportElement, DrawerViewportProps>(({ children, className, style, render, ...props }, ref) => {
    const { rootClass, swipeDirection, open, nested, nestedDrawerOpen } = useContext(DrawerContext);
    const state = { open, nested, nestedDrawerOpen };
    const resolvedClassName = clsx(rootClass && `${rootClass}-viewport`, resolveDrawerDynamicValue(className, state));
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
            data-nested={nested ? '' : undefined}
            data-nested-drawer-open={nestedDrawerOpen ? '' : undefined}
            {...props}
        >
            {renderConfig.children}
        </Primitive.div>
    );
});

DrawerViewport.displayName = 'DrawerViewport';

export default DrawerViewport;
