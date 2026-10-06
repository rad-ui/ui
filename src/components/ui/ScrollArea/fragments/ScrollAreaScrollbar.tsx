'use client';

import { getHorizontalScrollRange } from '../utils/track';
import React, { useContext, useRef, useCallback, useEffect, useLayoutEffect, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import { ScrollAreaContext, ScrollAreaScrollbarOrientationContext } from '../context/ScrollAreaContext';
import clsx from 'clsx';

type ScrollAreaScrollbarElement = ElementRef<'div'>;
export type ScrollAreaScrollbarProps = ComponentPropsWithoutRef<'div'> & {
    orientation?: 'horizontal' | 'vertical';
};

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const CONTINUOUS_SCROLL_DELAY_MS = 300;
const CONTINUOUS_SCROLL_INTERVAL_MS = 50;
const WHEEL_LINE_HEIGHT_PX = 16;

const ScrollAreaScrollbar = forwardRef<ScrollAreaScrollbarElement, ScrollAreaScrollbarProps>(({
    children,
    className = '',
    orientation = 'vertical',
    style,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    ...props
}, ref) => {
    const {
        rootClass,
        handleScrollbarClick,
        scrollXThumbRef,
        scrollYThumbRef,
        scrollbarXRef,
        scrollbarYRef,
        scrollAreaViewportRef,
        registerScrollbar,
        scrollbarsMounted,
        type,
        scrollbarVisible,
        overflow,
        overlaySuppressesScrollbar
    } = useContext(ScrollAreaContext);

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const delayTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isScrollingRef = useRef(false);
    const removeListenersRef = useRef<(() => void) | null>(null);
    const mousePositionRef = useRef<number>(0);
    const scrollbarElementRef = useRef<HTMLDivElement | null>(null);

    const isOverflowing = orientation === 'vertical' ? overflow.y : overflow.x;
    const otherAxisOverflowing = orientation === 'vertical' ? overflow.x : overflow.y;
    const otherAxisMounted = orientation === 'vertical' ? scrollbarsMounted.x : scrollbarsMounted.y;

    useIsomorphicLayoutEffect(() => registerScrollbar?.(orientation), [orientation, registerScrollbar]);

    const setRefs = useCallback((node: HTMLDivElement | null) => {
        scrollbarElementRef.current = node;
        const trackRef = orientation === 'vertical' ? scrollbarYRef : scrollbarXRef;
        if (trackRef) {
            (trackRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
        if (typeof ref === 'function') {
            ref(node);
        } else if (ref) {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
    }, [orientation, ref, scrollbarXRef, scrollbarYRef]);

    // Determine whether the auto-scroll should continue based on mouse position
    const shouldContinueScrolling = useCallback((mousePos: number): boolean => {
        const thumb = orientation === 'vertical' ? scrollYThumbRef?.current : scrollXThumbRef?.current;
        if (!thumb) return false;

        const thumbRect = thumb.getBoundingClientRect();
        if (orientation === 'vertical') {
            return mousePos < thumbRect.top || mousePos > thumbRect.bottom;
        }
        return mousePos < thumbRect.left || mousePos > thumbRect.right;
    }, [orientation, scrollXThumbRef, scrollYThumbRef]);

    // Stops any ongoing scroll activity and clears every pending timer/listener.
    const stopContinuousScroll = useCallback(() => {
        isScrollingRef.current = false;
        removeListenersRef.current?.();
        removeListenersRef.current = null;
        if (delayTimeoutRef.current) {
            clearTimeout(delayTimeoutRef.current);
            delayTimeoutRef.current = null;
        }
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    // Begins the continuous scrolling sequence (initial page, then repeat while held).
    const startContinuousScroll = useCallback((e: React.MouseEvent) => {
        if (!handleScrollbarClick || e.button !== 0) return;

        e.preventDefault();
        // Never stack timers from a previous press.
        stopContinuousScroll();

        mousePositionRef.current = orientation === 'vertical' ? e.clientY : e.clientX;
        isScrollingRef.current = true;

        handleScrollbarClick({
            clientY: e.clientY,
            clientX: e.clientX,
            orientation
        });

        const handleMouseMove = (event: MouseEvent) => {
            mousePositionRef.current = orientation === 'vertical' ? event.clientY : event.clientX;
        };
        const handleMouseUp = () => stopContinuousScroll();

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        removeListenersRef.current = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        delayTimeoutRef.current = setTimeout(() => {
            delayTimeoutRef.current = null;
            if (!isScrollingRef.current) return;
            intervalRef.current = setInterval(() => {
                if (isScrollingRef.current && shouldContinueScrolling(mousePositionRef.current)) {
                    handleScrollbarClick({
                        clientY: orientation === 'vertical' ? mousePositionRef.current : undefined,
                        clientX: orientation === 'horizontal' ? mousePositionRef.current : undefined,
                        orientation
                    });
                } else {
                    // Thumb reached the pointer (or the press ended)
                    stopContinuousScroll();
                }
            }, CONTINUOUS_SCROLL_INTERVAL_MS);
        }, CONTINUOUS_SCROLL_DELAY_MS);
    }, [handleScrollbarClick, orientation, shouldContinueScrolling, stopContinuousScroll]);

    useEffect(() => stopContinuousScroll, [stopContinuousScroll]);

    // Wheel over the (out-of-flow) scrollbar should scroll the viewport, not the page behind it.
    // React's onWheel is passive, so a native non-passive listener is needed to preventDefault.
    useEffect(() => {
        const scrollbar = scrollbarElementRef.current;
        if (!scrollbar) return;

        const handleWheel = (event: WheelEvent) => {
            const viewport = scrollAreaViewportRef?.current;
            if (!viewport) return;
            const multiplier = event.deltaMode === 1 ? WHEEL_LINE_HEIGHT_PX : event.deltaMode === 2 ? (orientation === 'vertical' ? viewport.clientHeight : viewport.clientWidth) : 1;

            if (orientation === 'vertical') {
                const delta = event.deltaY * multiplier;
                const max = viewport.scrollHeight - viewport.clientHeight;
                const canScroll = (delta < 0 && viewport.scrollTop > 0) || (delta > 0 && viewport.scrollTop < max);
                if (!canScroll) return;
                event.preventDefault();
                viewport.scrollTop = Math.min(max, Math.max(0, viewport.scrollTop + delta));
            } else {
                const { min, max, rtl } = getHorizontalScrollRange(viewport);
                // A vertical wheel over the horizontal bar moves toward the inline
                // end, which is leftward (decreasing scrollLeft) in RTL.
                const delta = (event.deltaX || (rtl ? -event.deltaY : event.deltaY)) * multiplier;
                const canScroll = (delta < 0 && viewport.scrollLeft > min) || (delta > 0 && viewport.scrollLeft < max);
                if (!canScroll) return;
                event.preventDefault();
                viewport.scrollLeft = Math.min(max, Math.max(min, viewport.scrollLeft + delta));
            }
        };

        scrollbar.addEventListener('wheel', handleWheel, { passive: false });
        return () => scrollbar.removeEventListener('wheel', handleWheel);
    }, [orientation, scrollAreaViewportRef]);

    const isVisible = !overlaySuppressesScrollbar && (
        type === 'always'
        || (type === 'auto' && isOverflowing)
        || (isOverflowing && (type === 'scroll' || type === 'hover') && scrollbarVisible)
    );
    const shouldKeepInDOM = isOverflowing || type === 'always';
    // Both tracks are laid out: styles can inset this one so the two do not overlap at the corner.
    const hasCorner = shouldKeepInDOM && otherAxisMounted && (otherAxisOverflowing || type === 'always');

    return (
        <div
            {...props}
            ref={setRefs}
            className={clsx(rootClass && `${rootClass}-scrollbar`, className)}
            data-orientation={orientation}
            data-state={isVisible ? 'visible' : 'hidden'}
            data-corner={hasCorner ? '' : undefined}
            style={{
                // The horizontal thumb is positioned with a physical `left` offset
                // (see ScrollAreaRoot), so its track always lays out left-to-right.
                // In RTL a flex track would start the thumb at the right edge and
                // the offset would push it off the track.
                ...(orientation === 'horizontal' ? { direction: 'ltr' as const } : null),
                ...style,
                ...(shouldKeepInDOM ? null : { display: 'none' })
            }}
            onMouseDown={(event) => {
                onMouseDown?.(event);
                if (!event.defaultPrevented) startContinuousScroll(event);
            }}
            onMouseUp={(event) => {
                onMouseUp?.(event);
                stopContinuousScroll();
            }}
            onMouseLeave={(event) => {
                onMouseLeave?.(event);
                stopContinuousScroll();
            }}
        >
            <ScrollAreaScrollbarOrientationContext.Provider value={orientation}>
                {children}
            </ScrollAreaScrollbarOrientationContext.Provider>
        </div>
    );
});

ScrollAreaScrollbar.displayName = 'ScrollAreaScrollbar';

export default ScrollAreaScrollbar;
