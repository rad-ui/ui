'use client';

import React, { useContext, useRef, useCallback, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import { ScrollAreaContext } from '../context/ScrollAreaContext';
import clsx from 'clsx';

type ScrollAreaScrollbarElement = ElementRef<'div'>;
type ScrollAreaScrollbarProps = ComponentPropsWithoutRef<'div'> & {
    orientation?: 'horizontal' | 'vertical';
};

const ScrollAreaScrollbar = forwardRef<ScrollAreaScrollbarElement, ScrollAreaScrollbarProps>(({ children, className = '', orientation, ...props }, ref) => {
    const { rootClass, handleScrollbarClick, scrollXThumbRef } = useContext(ScrollAreaContext);
    // stores the interval id for the repeated scroll action
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    // read/write ref to know if continuous scrolling is currently active
    const isScrollingRef = useRef(false);
    // ref holding a function to remove global listeners when scrolling stops
    const removeListenersRef = useRef<(() => void) | null>(null);
    // state used to trigger re-renders and styling changes when scrolling
    const [isScrolling, setIsScrolling] = React.useState(false);
    // tracks the latest mouse Y position for the next scroll step
    const mousePositionRef = useRef<number>(0);

    // Determine whether the auto-scroll should continue based on mouse position
    const shouldContinueScrolling = useCallback((mouseY: number): boolean => {
        if (!scrollXThumbRef?.current) return false;

        const thumbRect = scrollXThumbRef.current.getBoundingClientRect();
        const thumbStart = thumbRect.top;
        const thumbEnd = thumbRect.bottom;

        // Stop if mouse is within thumb bounds
        if (mouseY >= thumbStart && mouseY <= thumbEnd) {
            return false;
        }

        return true;
    }, [scrollXThumbRef]);

    // Begins the continuous scrolling sequence and sets up the interval
    const startContinuousScroll = useCallback((e: React.MouseEvent) => {
        if (!handleScrollbarClick) return;

        e.preventDefault();
        mousePositionRef.current = e.clientY;

        // Initial scroll
        handleScrollbarClick({ clientY: e.clientY });

        // Start continuous scrolling after a brief delay
        setTimeout(() => {
            if (isScrollingRef.current) {
                intervalRef.current = setInterval(() => {
                    if (isScrollingRef.current && shouldContinueScrolling(mousePositionRef.current)) {
                        handleScrollbarClick({ clientY: mousePositionRef.current });
                    } else {
                        // Stop scrolling if thumb reached mouse position
                        stopContinuousScroll();
                    }
                }, 50); // Scroll every 50ms
            }
        }, 300); // 300ms delay before continuous scrolling starts

        isScrollingRef.current = true;
        setIsScrolling(true);
    }, [handleScrollbarClick, shouldContinueScrolling]);

    // Stops any ongoing scroll activity and clears side effects
    const stopContinuousScroll = useCallback(() => {
        isScrollingRef.current = false;
        removeListenersRef.current?.();
        removeListenersRef.current = null;
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setIsScrolling(false);
    }, []);

    // Attach global mouse listeners only while actively scrolling
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
            stopContinuousScroll(); // Cleanup on unmount
        };
    }, [isScrolling, stopContinuousScroll]);

    return (
        <div
            ref={ref}
            className={clsx(rootClass + '-scrollbar', className)}
            data-orientation={orientation}
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
