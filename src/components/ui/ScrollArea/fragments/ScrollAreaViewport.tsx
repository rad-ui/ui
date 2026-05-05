'use client';
import React, { useContext, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import { ScrollAreaContext } from '../context/ScrollAreaContext';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';

type ScrollAreaViewportElement = ElementRef<typeof Primitive.div>;
export type ScrollAreaViewportProps = ComponentPropsWithoutRef<typeof Primitive.div>;

const ScrollAreaViewport = forwardRef<ScrollAreaViewportElement, ScrollAreaViewportProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass, scrollAreaViewportRef, handleScroll } = useContext(ScrollAreaContext);

    const setRef = (node: ScrollAreaViewportElement | null) => {
        if (scrollAreaViewportRef) {
            (scrollAreaViewportRef as React.MutableRefObject<ScrollAreaViewportElement | null>).current = node;
        }
        if (typeof ref === 'function') {
            ref(node);
        } else if (ref) {
            (ref as React.MutableRefObject<ScrollAreaViewportElement | null>).current = node;
        }
    };

    return <Primitive.div ref={setRef} className={clsx(rootClass && `${rootClass}-viewport`, className)} onScroll={handleScroll} {...props} >{children}</Primitive.div>;
});

ScrollAreaViewport.displayName = 'ScrollAreaViewport';

export default ScrollAreaViewport;
