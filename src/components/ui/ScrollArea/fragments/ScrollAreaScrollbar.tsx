'use client';

import React, { useContext, useRef, useCallback, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import { ScrollAreaContext } from '../context/ScrollAreaContext';
import clsx from 'clsx';

type ScrollAreaScrollbarElement = ElementRef<'div'>;
type ScrollAreaScrollbarProps = ComponentPropsWithoutRef<'div'> & {
    orientation?: 'horizontal' | 'vertical';
};

const ScrollAreaScrollbar = forwardRef<ScrollAreaScrollbarElement, ScrollAreaScrollbarProps>(({ children, className = '', orientation = 'vertical', ...props }, ref) => {
    const { rootClass, handleScrollbarClick, scrollXThumbRef, scrollYThumbRef, type, scrollAreaViewportRef, rootRef } = useContext(ScrollAreaContext);
    
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const isScrollingRef = useRef(false);
    const removeListenersRef = useRef<(() => void) | null>(null);
    const [isScrollingState, setIsScrollingState] = React.useState(false);
    const mousePositionRef = useRef<number>(0);

    const [visible, setVisible] = React.useState(type === 'always');
    const [isOverflowing, setIsOverflowing] = React.useState(false);
    const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const show = React.useCallback(() => {
        if (type === 'scroll' || type === 'hover') {
            setVisible(true);
            if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = setTimeout(() => {
                setVisible(false);
            }, 1000);
        }
    }, [type]);

    // Handle scroll visibility
    React.useEffect(() => {
        if (type === 'always' || type === 'auto') return;
        const viewport = scrollAreaViewportRef?.current;
        if (!viewport) return;

        const handleViewportScroll = () => show();
        viewport.addEventListener('scroll', handleViewportScroll);
        return () => {
            viewport.removeEventListener('scroll', handleViewportScroll);
            if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
        };
    }, [type, scrollAreaViewportRef, show]);

    // Handle hover visibility
    React.useEffect(() => {
        if (type !== 'hover') return;
        const root = rootRef?.current;
        if (!root) return;

        const handleMouseEnter = () => setVisible(true);
        const handleMouseLeave = () => {
            if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = setTimeout(() => {
                setVisible(false);
            }, 500);
        };

        root.addEventListener('mouseenter', handleMouseEnter);
        root.addEventListener('mouseleave', handleMouseLeave);
        return () => {
            root.removeEventListener('mouseenter', handleMouseEnter);
            root.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [type, rootRef]);

    // Overflow detection
    React.useEffect(() => {
        const viewport = scrollAreaViewportRef?.current;
        if (!viewport) return;

        const checkOverflow = () => {
            const overflowing = orientation === 'vertical' 
                ? viewport.scrollHeight > viewport.clientHeight
                : viewport.scrollWidth > viewport.clientWidth;
            setIsOverflowing(overflowing);
        };

        checkOverflow();
        const ro = new ResizeObserver(checkOverflow);
        ro.observe(viewport);
        Array.from(viewport.children).forEach(c => ro.observe(c));
        return () => ro.disconnect();
    }, [scrollAreaViewportRef, orientation]);

    // Determine whether the auto-scroll should continue based on mouse position
    const shouldContinueScrolling = React.useCallback((mousePos: number): boolean => {
        const thumb = orientation === 'vertical' ? scrollYThumbRef?.current : scrollXThumbRef?.current;
        if (!thumb) return false;

        const thumbRect = thumb.getBoundingClientRect();
        if (orientation === 'vertical') {
            return mousePos < thumbRect.top || mousePos > thumbRect.bottom;
        } else {
            return mousePos < thumbRect.left || mousePos > thumbRect.right;
        }
    }, [orientation, scrollXThumbRef, scrollYThumbRef]);

    // Begins the continuous scrolling sequence and sets up the interval
    const startContinuousScroll = React.useCallback((e: React.MouseEvent) => {
        if (!handleScrollbarClick) return;

        e.preventDefault();
        mousePositionRef.current = orientation === 'vertical' ? e.clientY : e.clientX;

        // Initial scroll
        handleScrollbarClick({ 
            clientY: e.clientY, 
            clientX: e.clientX, 
            orientation 
        });

        // Start continuous scrolling after a brief delay
        setTimeout(() => {
            if (isScrollingRef.current) {
                intervalRef.current = setInterval(() => {
                    if (isScrollingRef.current && shouldContinueScrolling(mousePositionRef.current)) {
                        handleScrollbarClick({ 
                            clientY: orientation === 'vertical' ? mousePositionRef.current : undefined, 
                            clientX: orientation === 'horizontal' ? mousePositionRef.current : undefined,
                            orientation 
                        });
                    } else {
                        // Stop scrolling if thumb reached mouse position
                        stopContinuousScroll();
                    }
                }, 50); // Scroll every 50ms
            }
        }, 300); // 300ms delay before continuous scrolling starts

        isScrollingRef.current = true;
        setIsScrollingState(true);
    }, [handleScrollbarClick, orientation, shouldContinueScrolling]);

    // Stops any ongoing scroll activity and clears side effects
    const stopContinuousScroll = React.useCallback(() => {
        isScrollingRef.current = false;
        removeListenersRef.current?.();
        removeListenersRef.current = null;
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setIsScrollingState(false);
    }, []);

    const shouldRender = type === 'always' || (type === 'auto' && isOverflowing) || (isOverflowing && visible);

    React.useEffect(() => {
        if (!isScrollingRef.current) {
            return () => {
                removeListenersRef.current?.();
                stopContinuousScroll();
            };
        }

        const handleMouseUp = () => stopContinuousScroll();
        const handleMouseLeave = () => stopContinuousScroll();

        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mouseleave', handleMouseLeave);

        removeListenersRef.current = () => {
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };

        return () => {
            removeListenersRef.current?.();
            removeListenersRef.current = null;
            stopContinuousScroll(); // Cleanup
        };
    }, [isScrollingState, stopContinuousScroll]);

    const isVisible = type === 'always' || (type === 'auto' && isOverflowing) || (isOverflowing && visible);
    const shouldKeepInDOM = isOverflowing || type === 'always';

    return (
        <div
            ref={ref}
            className={clsx(rootClass + '-scrollbar', className)}
            data-orientation={orientation}
            data-state={isVisible ? 'visible' : 'hidden'}
            style={{ 
                display: shouldKeepInDOM ? undefined : 'none', 
                ...props.style 
            }}
            onMouseDown={startContinuousScroll}
            onMouseUp={stopContinuousScroll}
            onMouseLeave={stopContinuousScroll}
            {...props}
        >
            {children}
        </div>
    );
});

ScrollAreaScrollbar.displayName = 'ScrollAreaScrollbar';

export default ScrollAreaScrollbar;
