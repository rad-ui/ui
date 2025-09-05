'use client';

import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';

type ScrollAreaCornerElement = ElementRef<'div'>;
type ScrollAreaCornerProps = ComponentPropsWithoutRef<'div'>;

const ScrollAreaCorner = forwardRef<ScrollAreaCornerElement, ScrollAreaCornerProps>(({ children, ...props }, ref) => {
    return <div ref={ref} {...props}>{children}</div>;
});

ScrollAreaCorner.displayName = 'ScrollAreaCorner';

export default ScrollAreaCorner;
