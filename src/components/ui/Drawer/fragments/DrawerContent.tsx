'use client';
import React, { useContext, useState, useEffect, useRef } from 'react';
import { DrawerContext } from '../context/DrawerContext';
import { clsx } from 'clsx';

export type DrawerContentProps = {
    children: React.ReactNode;
    className?: string;
}

const DrawerContent = ({ children, className = '' } : DrawerContentProps) => {
    const { rootClass, side, isOpen, transitionDuration, transitionTimingFunction, zIndex, dragProgress, handleDragProgress, handleDragEnd } = useContext(DrawerContext);
    const [shouldRender, setShouldRender] = useState(isOpen);
    const [animationState, setAnimationState] = useState<'entering' | 'entered' | 'exiting' | 'exited'>(isOpen ? 'entered' : 'exited');
    const [isDragging, setIsDragging] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout>();
    const containerRef = useRef<HTMLDivElement>(null);

    // Handle animation states with improved timing
    useEffect(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        if (isOpen) {
            setShouldRender(true);
            setAnimationState('entering');

            // Use double RAF for smoother animation timing, synchronized with overlay
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setAnimationState('entered');
                });
            });
        } else {
            setAnimationState('exiting');

            // Wait for exit animation to complete before unmounting
            timeoutRef.current = setTimeout(() => {
                setShouldRender(false);
                setAnimationState('exited');
            }, transitionDuration);
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [isOpen, transitionDuration]);

    // Drag functionality
    const initialProgressRef = useRef(0);
    const dragThresholdRef = useRef(false);
    const DRAG_THRESHOLD = 10; // pixels

    const handleDragStart = (clientY: number, clientX: number) => {
        // Don't immediately set dragging - wait for threshold
        initialProgressRef.current = dragProgress;
        dragThresholdRef.current = false;
    };

    const handleDragMove = (clientY: number, clientX: number, startY: number, startX: number) => {
        if (!containerRef.current) return;

        const deltaY = clientY - startY;
        const deltaX = clientX - startX;

        // Check if we've exceeded the drag threshold
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        if (!dragThresholdRef.current && distance > DRAG_THRESHOLD) {
            dragThresholdRef.current = true;
            setIsDragging(true);
        }

        // Only process drag if we've exceeded threshold
        if (!dragThresholdRef.current) return;

        let progress = initialProgressRef.current; // Start from initial progress

        switch (side) {
        case 'bottom': {
            // Dragging up closes, dragging down opens
            const bottomMovement = -deltaY / window.innerHeight;
            progress = Math.max(0, Math.min(1, initialProgressRef.current + bottomMovement));
            break;
        }
        case 'top': {
            // Dragging down closes, dragging up opens
            const topMovement = deltaY / window.innerHeight;
            progress = Math.max(0, Math.min(1, initialProgressRef.current + topMovement));
            break;
        }
        case 'right': {
            // Dragging left closes, dragging right opens
            const rightMovement = -deltaX / window.innerWidth;
            progress = Math.max(0, Math.min(1, initialProgressRef.current + rightMovement));
            break;
        }
        case 'left': {
            // Dragging right closes, dragging left opens
            const leftMovement = deltaX / window.innerWidth;
            progress = Math.max(0, Math.min(1, initialProgressRef.current + leftMovement));
            break;
        }
        }

        handleDragProgress(progress);
    };

    const handleLocalDragEnd = () => {
        // Only handle drag end if we actually started dragging
        if (dragThresholdRef.current) {
            setIsDragging(false);
            // Snap to open or closed based on current progress
            const finalProgress = dragProgress > 0.5 ? 1 : 0;
            handleDragEnd(finalProgress);
        }
        dragThresholdRef.current = false;
    };

    // Mouse events
    const handleMouseDown = (e: React.MouseEvent) => {
        // Don't prevent default immediately - let normal clicks work
        const startY = e.clientY;
        const startX = e.clientX;
        handleDragStart(startY, startX);

        const handleMouseMove = (e: MouseEvent) => {
            // Prevent default once we start dragging
            if (dragThresholdRef.current) {
                e.preventDefault();
            }
            handleDragMove(e.clientY, e.clientX, startY, startX);
        };

        const handleMouseUp = () => {
            handleLocalDragEnd();
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    // Touch events
    const handleTouchStart = (e: React.TouchEvent) => {
        const touch = e.touches[0];
        const startY = touch.clientY;
        const startX = touch.clientX;
        handleDragStart(startY, startX);

        const handleTouchMove = (e: TouchEvent) => {
            // Only prevent default once we start dragging
            if (dragThresholdRef.current) {
                e.preventDefault();
            }
            const touch = e.touches[0];
            handleDragMove(touch.clientY, touch.clientX, startY, startX);
        };

        const handleTouchEnd = () => {
            handleLocalDragEnd();
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };

        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', handleTouchEnd);
    };

    // Style positioning based on side with enhanced animations
    const getDrawerStyles = () => {
        const baseStyles = {
            position: 'fixed' as const,
            zIndex,
            willChange: 'transform',
            transition: isDragging ? 'none' : `transform ${transitionDuration}ms ${transitionTimingFunction}`,
            backfaceVisibility: 'hidden' as const
        };

        // Use drag progress if dragging or if dragProgress is not the default state
        // Otherwise use normal animation state
        const shouldUseDragProgress = isDragging || (dragProgress > 0 && dragProgress < 1);
        let translatePercent = 0;

        if (shouldUseDragProgress) {
            // Use drag progress to determine position (0 = closed, 1 = open)
            translatePercent = (1 - dragProgress) * 100;
        } else {
            // Use normal animation state
            const isVisible = animationState === 'entered';
            translatePercent = isVisible ? 0 : 100;
        }

        switch (side) {
        case 'top':
            return {
                ...baseStyles,
                top: 0,
                left: 0,
                right: 0,
                transform: `translate3d(0, -${translatePercent}%, 0)`
            };
        case 'right':
            return {
                ...baseStyles,
                top: 0,
                right: 0,
                bottom: 0,
                transform: `translate3d(${translatePercent}%, 0, 0)`
            };
        case 'left':
            return {
                ...baseStyles,
                top: 0,
                left: 0,
                bottom: 0,
                transform: `translate3d(-${translatePercent}%, 0, 0)`
            };
        case 'bottom':
        default:
            return {
                ...baseStyles,
                bottom: 0,
                left: 0,
                right: 0,
                transform: `translate3d(0, ${translatePercent}%, 0)`
            };
        }
    };

    // Don't render if not supposed to be visible
    if (!shouldRender) {
        return null;
    }

    return (
        <div
            ref={containerRef}
            style={getDrawerStyles()}
            className={clsx(`${rootClass}-content`, className)}
            role="dialog"
            aria-modal="true"
            data-state={isOpen ? 'open' : 'closed'}
            data-side={side}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onClick={(event) => {
                // Prevent clicks on content from propagating to overlay
                event.stopPropagation();
            }}
        >
            {children}
        </div>
    );
};

export default DrawerContent;
