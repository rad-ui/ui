'use client';

import React, { forwardRef, ElementRef, ComponentPropsWithoutRef, useContext } from 'react';
import { ScrollAreaContext } from '../context/ScrollAreaContext';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';

type ScrollAreaCornerElement = ElementRef<typeof Primitive.div>;
export type ScrollAreaCornerProps = ComponentPropsWithoutRef<typeof Primitive.div>;

const ScrollAreaCorner = forwardRef<ScrollAreaCornerElement, ScrollAreaCornerProps>(({ children, className, ...props }, ref) => {
    const { rootClass } = useContext(ScrollAreaContext);
    return <Primitive.div ref={ref} className={clsx(rootClass && `${rootClass}-corner`, className)} {...props}>{children}</Primitive.div>;
});

ScrollAreaCorner.displayName = 'ScrollAreaCorner';

export default ScrollAreaCorner;
