'use client';

import React, { forwardRef, ElementRef, ComponentPropsWithoutRef, useContext } from 'react';
import { ScrollAreaContext } from '../context/ScrollAreaContext';
import clsx from 'clsx';

type ScrollAreaCornerElement = ElementRef<'div'>;
type ScrollAreaCornerProps = ComponentPropsWithoutRef<'div'>;

const ScrollAreaCorner = forwardRef<ScrollAreaCornerElement, ScrollAreaCornerProps>(({ children, className, ...props }, ref) => {
    const { rootClass } = useContext(ScrollAreaContext);
    return <div ref={ref} className={clsx(rootClass + '-corner', className)} {...props}>{children}</div>;
});

ScrollAreaCorner.displayName = 'ScrollAreaCorner';

export default ScrollAreaCorner;
