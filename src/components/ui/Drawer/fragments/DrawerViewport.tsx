'use client';

import React, { forwardRef, useContext } from 'react';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';
import { DrawerContext } from '../context/DrawerContext';

type DrawerViewportElement = React.ElementRef<typeof Primitive.div>;
type PrimitiveDivProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;

export type DrawerViewportProps = PrimitiveDivProps & {
    className?: string;
};

const DrawerViewport = forwardRef<DrawerViewportElement, DrawerViewportProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass, swipeDirection } = useContext(DrawerContext);

    return (
        <Primitive.div
            ref={ref}
            className={clsx(rootClass && `${rootClass}-viewport`, className)}
            data-swipe-direction={swipeDirection}
            {...props}
        >
            {children}
        </Primitive.div>
    );
});

DrawerViewport.displayName = 'DrawerViewport';

export default DrawerViewport;
