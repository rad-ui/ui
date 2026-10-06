'use client';
import React, { useContext, useEffect, useState, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import { ScrollAreaContext } from '../context/ScrollAreaContext';
import clsx from 'clsx';
import { hasFocusableDescendant } from '../utils/track';

type ScrollAreaViewportElement = ElementRef<'div'>;
export type ScrollAreaViewportProps = ComponentPropsWithoutRef<'div'>;

const ScrollAreaViewport = forwardRef<ScrollAreaViewportElement, ScrollAreaViewportProps>(({ children, className = '', onScroll, ...props }, ref) => {
    const { rootClass, scrollAreaViewportRef, handleScroll, overflow } = useContext(ScrollAreaContext);
    const isScrollable = overflow.x || overflow.y;
    const [hasFocusableContent, setHasFocusableContent] = useState(true);

    // WCAG 2.1.1: a scrollable region must be operable from the keyboard. When the content has
    // nothing focusable, the viewport itself becomes the tab stop (only while it can scroll).
    useEffect(() => {
        const viewport = scrollAreaViewportRef?.current;
        if (!viewport || !isScrollable) return;

        const check = () => setHasFocusableContent(hasFocusableDescendant(viewport));
        check();

        if (typeof MutationObserver === 'undefined') return;
        const observer = new MutationObserver(check);
        observer.observe(viewport, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['tabindex', 'href', 'disabled', 'contenteditable', 'hidden', 'inert', 'aria-hidden', 'controls', 'type']
        });
        return () => observer.disconnect();
    }, [isScrollable, scrollAreaViewportRef]);

    const autoTabIndex = isScrollable && !hasFocusableContent ? 0 : undefined;

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

    return (
        <div
            tabIndex={autoTabIndex}
            {...props}
            ref={setRef}
            className={clsx(rootClass && `${rootClass}-viewport`, className)}
            onScroll={(event) => {
                handleScroll?.();
                onScroll?.(event);
            }}
        >
            {children}
        </div>
    );
});

ScrollAreaViewport.displayName = 'ScrollAreaViewport';

export default ScrollAreaViewport;
