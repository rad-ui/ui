'use client';

import React, { useContext, useRef, useCallback, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import { ScrollAreaContext, ScrollAreaScrollbarOrientationContext } from '../context/ScrollAreaContext';
import clsx from 'clsx';
import { getTrackLength, clampScrollLeft } from '../utils/track';

type ScrollAreaThumbElement = ElementRef<'div'>;
export type ScrollAreaThumbProps = ComponentPropsWithoutRef<'div'> & {
    orientation?: 'horizontal' | 'vertical';
};

const ScrollAreaThumb = forwardRef<ScrollAreaThumbElement, ScrollAreaThumbProps>(({ children, className = '', orientation: orientationProp, onMouseDown, onPointerDown, style, ...props }, ref) => {
    // Inherit the parent Scrollbar's orientation so a plain <Thumb /> inside a horizontal
    // scrollbar does not register itself as (and overwrite) the vertical thumb.
    const scrollbarOrientation = useContext(ScrollAreaScrollbarOrientationContext);
    const orientation = orientationProp ?? scrollbarOrientation ?? 'vertical';
    const { rootClass, scrollXThumbRef, scrollYThumbRef, scrollbarXRef, scrollbarYRef, scrollAreaViewportRef, syncThumbs, setInteracting, type, scrollbarVisible, overflow, overlaySuppressesScrollbar } = useContext(ScrollAreaContext);
    const isOverflowing = orientation === 'vertical' ? overflow.y : overflow.x;
    const isVisible = !overlaySuppressesScrollbar && (
        type === 'always'
        || (type === 'auto' && isOverflowing)
        || (isOverflowing && (type === 'scroll' || type === 'hover') && scrollbarVisible)
    );
    const isDraggingRef = useRef(false);
    const dragStartRef = useRef({ x: 0, y: 0, scrollTop: 0, scrollLeft: 0 });
    const removeDragListenersRef = useRef<(() => void) | null>(null);
    const [isDragging, setIsDragging] = React.useState(false);

    const handleDrag = useCallback((e: { clientX: number; clientY: number }) => {
        if (!isDraggingRef.current || !scrollAreaViewportRef?.current) return;

        const viewport = scrollAreaViewportRef.current;
        const thumb = orientation === 'vertical' ? scrollYThumbRef?.current : scrollXThumbRef?.current;
        if (!thumb) return;
        const track = (orientation === 'vertical' ? scrollbarYRef?.current : scrollbarXRef?.current) ?? thumb.parentElement;

        if (orientation === 'vertical') {
            const deltaY = e.clientY - dragStartRef.current.y;
            const scrollableTrackHeight = getTrackLength(track, 'vertical', viewport.clientHeight) - thumb.clientHeight;
            if (scrollableTrackHeight <= 0) return;
            const maxScroll = viewport.scrollHeight - viewport.clientHeight;
            const newScrollTop = dragStartRef.current.scrollTop + ((deltaY / scrollableTrackHeight) * maxScroll);
            viewport.scrollTop = Math.max(0, Math.min(newScrollTop, maxScroll));
        } else {
            const deltaX = e.clientX - dragStartRef.current.x;
            const scrollableTrackWidth = getTrackLength(track, 'horizontal', viewport.clientWidth) - thumb.clientWidth;
            if (scrollableTrackWidth <= 0) return;
            const maxScroll = viewport.scrollWidth - viewport.clientWidth;
            // Dragging right always moves content toward the right edge: in LTR
            // that's toward the end, in RTL toward the start (scrollLeft -> 0).
            const newScrollLeft = dragStartRef.current.scrollLeft + ((deltaX / scrollableTrackWidth) * maxScroll);
            viewport.scrollLeft = clampScrollLeft(viewport, newScrollLeft);
        }
    }, [orientation, scrollAreaViewportRef, scrollXThumbRef, scrollYThumbRef, scrollbarXRef, scrollbarYRef]);

    const stopDrag = useCallback(() => {
        if (!isDraggingRef.current && !removeDragListenersRef.current) return;
        isDraggingRef.current = false;
        removeDragListenersRef.current?.();
        removeDragListenersRef.current = null;
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
        setIsDragging(false);
        setInteracting?.(false);
    }, [setInteracting]);

    // Pointer events cover mouse, touch and pen with one code path.
    const startDrag = useCallback((e: React.PointerEvent) => {
        if (!scrollAreaViewportRef?.current) return;
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        if (e.isPrimary === false) return;

        // preventDefault on pointerdown also suppresses the compatibility mousedown, so the
        // scrollbar's track-paging handler does not fire for a thumb press.
        e.preventDefault();
        e.stopPropagation();

        stopDrag();
        isDraggingRef.current = true;
        const pointerId = e.pointerId;
        dragStartRef.current = {
            x: e.clientX,
            y: e.clientY,
            scrollTop: scrollAreaViewportRef.current.scrollTop,
            scrollLeft: scrollAreaViewportRef.current.scrollLeft
        };

        // Document listeners only exist for the lifetime of a drag.
        const handlePointerMove = (event: PointerEvent) => {
            if (pointerId !== undefined && event.pointerId !== undefined && event.pointerId !== pointerId) return;
            handleDrag(event);
        };
        const handlePointerUp = (event: PointerEvent) => {
            if (pointerId !== undefined && event.pointerId !== undefined && event.pointerId !== pointerId) return;
            stopDrag();
        };
        document.addEventListener('pointermove', handlePointerMove);
        document.addEventListener('pointerup', handlePointerUp);
        document.addEventListener('pointercancel', handlePointerUp);
        removeDragListenersRef.current = () => {
            document.removeEventListener('pointermove', handlePointerMove);
            document.removeEventListener('pointerup', handlePointerUp);
            document.removeEventListener('pointercancel', handlePointerUp);
        };

        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'grabbing';
        setIsDragging(true);
        setInteracting?.(true);
    }, [scrollAreaViewportRef, handleDrag, stopDrag, setInteracting]);

    React.useEffect(() => stopDrag, [stopDrag]);

    // Size/position this thumb as soon as it mounts (it may mount after the root measured).
    React.useEffect(() => {
        syncThumbs?.();
    }, [orientation]);

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
            {...props}
            ref={setRef}
            className={clsx(rootClass && `${rootClass}-thumb`, className)}
            data-orientation={orientation}
            data-state={isVisible ? 'visible' : 'hidden'}
            data-dragging={isDragging ? '' : undefined}
            // The browser must not pan/scroll the page while a touch drags the thumb.
            style={{ touchAction: 'none', ...style }}
            onPointerDown={(event) => {
                onPointerDown?.(event);
                if (!event.defaultPrevented) startDrag(event);
            }}
            onMouseDown={(event) => {
                onMouseDown?.(event);
                // A thumb press never pages the track.
                event.stopPropagation();
            }}
        >
            {children}
        </div>
    );
});

ScrollAreaThumb.displayName = 'ScrollAreaThumb';

export default ScrollAreaThumb;
