'use client';

import React, { useContext, useRef, useCallback } from 'react';
import { ScrollAreaContext } from '../context/ScrollAreaContext';
import clsx from 'clsx';

type ScrollAreaScrollbarProps = React.HTMLAttributes<HTMLDivElement> & {
    orientation?: 'horizontal' | 'vertical';
};

const ScrollAreaScrollbar = ({ children, className = '', orientation, ...props }: ScrollAreaScrollbarProps) => {
    const { rootClass, handleScrollbarClick, scrollXThumbRef } = useContext(ScrollAreaContext);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const isScrollingRef = useRef(false);
    const mousePositionRef = useRef<number>(0);

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
    }, [handleScrollbarClick, shouldContinueScrolling]);

    const stopContinuousScroll = useCallback(() => {
        isScrollingRef.current = false;
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, []);

    // Global mouse up listener
    React.useEffect(() => {
        const handleMouseUp = () => stopContinuousScroll();
        const handleMouseLeave = () => stopContinuousScroll();

        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mouseleave', handleMouseLeave);
            stopContinuousScroll(); // Cleanup on unmount
        };
    }, [stopContinuousScroll]);

    return (
        <div
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
};

export default ScrollAreaScrollbar;
