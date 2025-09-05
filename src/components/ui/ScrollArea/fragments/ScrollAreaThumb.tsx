'use client';

import React, { useContext, useRef, useCallback, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import { ScrollAreaContext } from '../context/ScrollAreaContext';
import clsx from 'clsx';

type ScrollAreaThumbElement = ElementRef<'div'>;
type ScrollAreaThumbProps = ComponentPropsWithoutRef<'div'>;

const ScrollAreaThumb = forwardRef<ScrollAreaThumbElement, ScrollAreaThumbProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass, scrollXThumbRef, scrollAreaViewportRef } = useContext(ScrollAreaContext);
    const isDraggingRef = useRef(false);
    const dragStartRef = useRef({ y: 0, scrollTop: 0 });

    const startDrag = useCallback((e: React.MouseEvent) => {
        if (!scrollAreaViewportRef?.current || !scrollXThumbRef?.current) return;

        e.preventDefault();
        e.stopPropagation(); // Prevent scrollbar click handler

        isDraggingRef.current = true;
        dragStartRef.current = {
            y: e.clientY,
            scrollTop: scrollAreaViewportRef.current.scrollTop
        };

        // Add cursor style

        document.body.style.userSelect = 'none';
    }, [scrollAreaViewportRef, scrollXThumbRef]);

    const handleDrag = useCallback((e: MouseEvent) => {
        if (!isDraggingRef.current || !scrollAreaViewportRef?.current || !scrollXThumbRef?.current) return;

        e.preventDefault();

        const deltaY = e.clientY - dragStartRef.current.y;
        const scrollbarRect = scrollXThumbRef.current.parentElement?.getBoundingClientRect();

        if (!scrollbarRect) return;

        // Calculate scroll ratio
        const scrollAreaContainerHeight = scrollAreaViewportRef.current.clientHeight;
        const scrollAreaHeight = scrollAreaViewportRef.current.scrollHeight;
        const scrollThumbHeight = scrollXThumbRef.current.clientHeight;
        const scrollableTrackHeight = scrollbarRect.height - scrollThumbHeight;

        // Convert thumb movement to content scroll
        const scrollRatio = deltaY / scrollableTrackHeight;
        const maxScroll = scrollAreaHeight - scrollAreaContainerHeight;
        const newScrollTop = dragStartRef.current.scrollTop + (scrollRatio * maxScroll);

        // Clamp scroll position
        const clampedScrollTop = Math.max(0, Math.min(newScrollTop, maxScroll));

        scrollAreaViewportRef.current.scrollTop = clampedScrollTop;
    }, [scrollAreaViewportRef, scrollXThumbRef]);

    const stopDrag = useCallback(() => {
        isDraggingRef.current = false;

        // Reset cursor and selection
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
    }, []);

    // Global mouse event listeners
    React.useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => handleDrag(e);
        const handleMouseUp = () => stopDrag();

        if (isDraggingRef.current) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        // Add listeners when dragging starts
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            stopDrag(); // Cleanup on unmount
        };
    }, [handleDrag, stopDrag]);

    const setRef = (node: ScrollAreaThumbElement | null) => {
        if (scrollXThumbRef) {
            (scrollXThumbRef as React.MutableRefObject<ScrollAreaThumbElement | null>).current = node;
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
