'use client';

import React, { forwardRef, ElementRef, ComponentPropsWithoutRef, useContext } from 'react';
import { ScrollAreaContext } from '../context/ScrollAreaContext';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';

type ScrollAreaCornerElement = ElementRef<typeof Primitive.div>;
export type ScrollAreaCornerProps = ComponentPropsWithoutRef<typeof Primitive.div>;

const ScrollAreaCorner = forwardRef<ScrollAreaCornerElement, ScrollAreaCornerProps>(({ children, className, style, ...props }, ref) => {
    const { rootClass, scrollbarsMounted, overflow, type } = useContext(ScrollAreaContext);
    // The corner only exists where both a vertical and a horizontal track are laid out.
    const isActive = scrollbarsMounted.x && scrollbarsMounted.y && (type === 'always' || (overflow.x && overflow.y));
    return (
        <Primitive.div
            {...props}
            ref={ref}
            className={clsx(rootClass && `${rootClass}-corner`, className)}
            data-state={isActive ? 'visible' : 'hidden'}
            style={{ ...style, ...(isActive ? null : { display: 'none' }) }}
        >
            {children}
        </Primitive.div>
    );
});

ScrollAreaCorner.displayName = 'ScrollAreaCorner';

export default ScrollAreaCorner;
