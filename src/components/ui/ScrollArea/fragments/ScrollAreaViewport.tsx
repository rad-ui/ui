'use client';
import React, { useContext, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import { ScrollAreaContext } from '../context/ScrollAreaContext';
import clsx from 'clsx';

type ScrollAreaViewportElement = ElementRef<'div'>;
type ScrollAreaViewportProps = ComponentPropsWithoutRef<'div'>;

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

    return <div ref={setRef} className={clsx(rootClass + '-viewport', className)} onScroll={handleScroll} {...props} >{children}</div>;
});

ScrollAreaViewport.displayName = 'ScrollAreaViewport';

export default ScrollAreaViewport;
