'use client';

import React, { forwardRef, useContext } from 'react';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';
import { DrawerContext } from '../context/DrawerContext';

type DrawerContentElement = React.ElementRef<typeof Primitive.div>;
type PrimitiveDivProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;

export type DrawerContentProps = PrimitiveDivProps & {
    className?: string;
};

const DrawerContent = forwardRef<DrawerContentElement, DrawerContentProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass, swipeDirection } = useContext(DrawerContext);

    return (
        <Primitive.div
            ref={ref}
            className={clsx(rootClass && `${rootClass}-content`, className)}
            data-swipe-direction={swipeDirection}
            {...props}
        >
            {children}
        </Primitive.div>
    );
});

DrawerContent.displayName = 'DrawerContent';

export default DrawerContent;
