'use client';
import React, { useContext, useState, useEffect, useRef } from 'react';
import { DrawerContext } from '../context/DrawerContext';
import { clsx } from 'clsx';

import DialogPrimitive from '~/core/primitives/Dialog';

type DrawerOverlayProps = {
    className?: string;
}

const DrawerOverlay = ({ className = '', ...props }: DrawerOverlayProps) => {
    const { rootClass, isOpen, handleOverlayClick, transitionDuration, transitionTimingFunction } = useContext(DrawerContext);
    const [shouldRender, setShouldRender] = useState(isOpen);
    const [opacity, setOpacity] = useState(isOpen ? 1 : 0);
    const timeoutRef = useRef<NodeJS.Timeout>();
    const rafRef = useRef<number>();

    // Handle animation states with better timing
    useEffect(() => {
        // Clear any existing timeouts and animation frames
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
        }

        if (isOpen) {
            // Opening: Mount immediately and start fade in
            setShouldRender(true);
            setOpacity(0); // Start from 0

            // Use double RAF for smoother animation start
            rafRef.current = requestAnimationFrame(() => {
                rafRef.current = requestAnimationFrame(() => {
                    setOpacity(1); // Fade to 1
                });
            });
        } else {
            // Closing: Start fade out immediately
            setOpacity(0);

            // Wait for animation to complete before unmounting
            timeoutRef.current = setTimeout(() => {
                setShouldRender(false);
            }, transitionDuration);
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [isOpen, transitionDuration]);

    // Don't render if not supposed to be visible
    if (!shouldRender) {
        return null;
    }

    return (
        <div
            className={clsx(`${rootClass}-overlay`, className)}
            onClick={handleOverlayClick}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 50,
                opacity,
                transition: `opacity ${transitionDuration}ms ${transitionTimingFunction}`,
                willChange: 'opacity',
                pointerEvents: opacity > 0 ? 'auto' : 'none',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)'
            }}
            data-state={isOpen ? 'open' : 'closed'}
            {...props}
        />
    );
};

export default DrawerOverlay;
