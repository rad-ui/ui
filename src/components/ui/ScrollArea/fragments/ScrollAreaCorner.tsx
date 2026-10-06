'use client';

import React, { forwardRef, ElementRef, ComponentPropsWithoutRef, useContext } from 'react';
import { ScrollAreaContext } from '../context/ScrollAreaContext';
import clsx from 'clsx';

type ScrollAreaCornerElement = ElementRef<'div'>;
export type ScrollAreaCornerProps = ComponentPropsWithoutRef<'div'>;

const ScrollAreaCorner = forwardRef<ScrollAreaCornerElement, ScrollAreaCornerProps>(({ children, className, style, ...props }, ref) => {
    const { rootClass, scrollbarsMounted, overflow, type } = useContext(ScrollAreaContext);
    // The corner only exists where both a vertical and a horizontal track are laid out.
    const isActive = scrollbarsMounted.x && scrollbarsMounted.y && (type === 'always' || (overflow.x && overflow.y));
    return (
        <div
            {...props}
            ref={ref}
            className={clsx(rootClass && `${rootClass}-corner`, className)}
            data-state={isActive ? 'visible' : 'hidden'}
            style={{ ...style, ...(isActive ? null : { display: 'none' }) }}
        >
            {children}
        </div>
    );
});

ScrollAreaCorner.displayName = 'ScrollAreaCorner';

export default ScrollAreaCorner;
