'use client';
import React, { useContext, useState, useEffect, useRef } from 'react';
import { DrawerContext } from '../context/DrawerContext';
import { clsx } from 'clsx';

export type DrawerContentProps = {
    children: React.ReactNode;
    className?: string;
}

const DrawerContent = ({ children, className = '' } : DrawerContentProps) => {
    const { rootClass, side, isOpen, transitionDuration, transitionTimingFunction } = useContext(DrawerContext);
    const [shouldRender, setShouldRender] = useState(isOpen);
    const [animationState, setAnimationState] = useState<'entering' | 'entered' | 'exiting' | 'exited'>(isOpen ? 'entered' : 'exited');
    const timeoutRef = useRef<NodeJS.Timeout>();

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

    // Style positioning based on side with enhanced animations
    const getDrawerStyles = () => {
        const baseStyles = {
            position: 'fixed' as const,
            zIndex: 50,
            willChange: 'transform',
            transition: `transform ${transitionDuration}ms ${transitionTimingFunction}`,
            backfaceVisibility: 'hidden' as const
        };

        const isVisible = animationState === 'entered';

        switch (side) {
        case 'top':
            return {
                ...baseStyles,
                top: 0,
                left: 0,
                right: 0,
                transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, -100%, 0)'
            };
        case 'right':
            return {
                ...baseStyles,
                top: 0,
                right: 0,
                bottom: 0,
                transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(100%, 0, 0)'
            };
        case 'left':
            return {
                ...baseStyles,
                top: 0,
                left: 0,
                bottom: 0,
                transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(-100%, 0, 0)'
            };
        case 'bottom':
        default:
            return {
                ...baseStyles,
                bottom: 0,
                left: 0,
                right: 0,
                transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 100%, 0)'
            };
        }
    };

    // Don't render if not supposed to be visible
    if (!shouldRender) {
        return null;
    }

    return (
        <div
            style={getDrawerStyles()}
            className={clsx(`${rootClass}-content`, className)}
            role="dialog"
            aria-modal="true"
            data-state={isOpen ? 'open' : 'closed'}
            data-side={side}
        >
            {children}
        </div>
    );
};

export default DrawerContent;
