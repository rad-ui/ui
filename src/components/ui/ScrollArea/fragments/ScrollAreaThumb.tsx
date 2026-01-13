'use client';

import React, { useContext, useRef, useCallback, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import { ScrollAreaContext } from '../context/ScrollAreaContext';
import clsx from 'clsx';

type ScrollAreaThumbElement = ElementRef<'div'>;
type ScrollAreaThumbProps = ComponentPropsWithoutRef<'div'> & {
    orientation?: 'horizontal' | 'vertical';
};

const ScrollAreaThumb = forwardRef<ScrollAreaThumbElement, ScrollAreaThumbProps>(({ children, className = '', orientation = 'vertical', ...props }, ref) => {
    const { rootClass, scrollXThumbRef, scrollYThumbRef, scrollAreaViewportRef } = useContext(ScrollAreaContext);
    const isDraggingRef = useRef(false);
    const dragStartRef = useRef({ x: 0, y: 0, scrollTop: 0, scrollLeft: 0 });

    const startDrag = useCallback((e: React.MouseEvent) => {
        if (!scrollAreaViewportRef?.current) return;

        e.preventDefault();
        e.stopPropagation();

        isDraggingRef.current = true;
        dragStartRef.current = {
            x: e.clientX,
            y: e.clientY,
            scrollTop: scrollAreaViewportRef.current.scrollTop,
            scrollLeft: scrollAreaViewportRef.current.scrollLeft
        };

        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'grabbing';
    }, [scrollAreaViewportRef]);

    const handleDrag = useCallback((e: MouseEvent) => {
        if (!isDraggingRef.current || !scrollAreaViewportRef?.current) return;

        const viewport = scrollAreaViewportRef.current;
        const thumb = orientation === 'vertical' ? scrollYThumbRef?.current : scrollXThumbRef?.current;
        const scrollbarRect = thumb?.parentElement?.getBoundingClientRect();

        if (!thumb || !scrollbarRect) return;

        if (orientation === 'vertical') {
            const deltaY = e.clientY - dragStartRef.current.y;
            const scrollableTrackHeight = scrollbarRect.height - thumb.clientHeight;
            const scrollRatio = deltaY / scrollableTrackHeight;
            const maxScroll = viewport.scrollHeight - viewport.clientHeight;
            const newScrollTop = dragStartRef.current.scrollTop + (scrollRatio * maxScroll);
            viewport.scrollTop = Math.max(0, Math.min(newScrollTop, maxScroll));
        } else {
            const deltaX = e.clientX - dragStartRef.current.x;
            const scrollableTrackWidth = scrollbarRect.width - thumb.clientWidth;
            const scrollRatio = deltaX / scrollableTrackWidth;
            const maxScroll = viewport.scrollWidth - viewport.clientWidth;
            const newScrollLeft = dragStartRef.current.scrollLeft + (scrollRatio * maxScroll);
            viewport.scrollLeft = Math.max(0, Math.min(newScrollLeft, maxScroll));
        }
    }, [orientation, scrollAreaViewportRef, scrollXThumbRef, scrollYThumbRef]);

    const stopDrag = useCallback(() => {
        isDraggingRef.current = false;
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
    }, []);

    React.useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => handleDrag(e);
        const handleMouseUp = () => stopDrag();

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [handleDrag, stopDrag]);

    const setRef = (node: ScrollAreaThumbElement | null) => {
        const thumbRef = orientation === 'vertical' ? scrollYThumbRef : scrollXThumbRef;
        if (thumbRef) {
            (thumbRef as React.MutableRefObject<ScrollAreaThumbElement | null>).current = node;
        }
        if (typeof ref === 'function') {
            ref(node);
        } else if (ref) {
            (ref as React.MutableRefObject<ScrollAreaThumbElement | null>).current = node;
        }
    };

    return (
        <div
            ref={setRef}
            className={clsx(rootClass + '-thumb', className)}
            onMouseDown={startDrag}
            {...props}
        >
            {children}
        </div>
    );
});

ScrollAreaThumb.displayName = 'ScrollAreaThumb';

export default ScrollAreaThumb;
