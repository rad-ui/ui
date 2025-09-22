'use client';
import React, { useEffect, useState } from 'react';

import { DrawerContext, useDrawerNesting } from '../context/DrawerContext';
import DialogPrimitive from '~/core/primitives/Dialog';
import { clsx } from 'clsx';
import { customClassSwitcher } from '~/core';

const COMPONENT_NAME = 'Drawer';

export type DrawerRootProps = {
    children: React.ReactNode;
    customRootClass?: string;
    className?: string;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    onClickOutside?: () => void;
    side?: 'top' | 'right' | 'bottom' | 'left';
    defaultOpen?: boolean;
    transitionDuration?: number;
    transitionTimingFunction?: string;
    scaleBackground?: boolean;
    backgroundScaleAmount?: number;
    backgroundBorderRadius?: number;
}

const DrawerRoot = ({ children, customRootClass = '', className = '', open, onOpenChange, onClickOutside, side = 'bottom', defaultOpen = false, transitionDuration = 350, transitionTimingFunction = 'cubic-bezier(0.32, 0.72, 0, 1)', scaleBackground = false, backgroundScaleAmount = 0.94, backgroundBorderRadius = 10, ...props }: DrawerRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    const [isOpen, setIsOpen] = useState(open ?? defaultOpen);
    const [dragProgress, setDragProgress] = useState(isOpen ? 1 : 0); // 0 = closed, 1 = fully open
    const { nestingLevel, zIndex } = useDrawerNesting();

    // Sync with controlled open prop
    useEffect(() => {
        if (open !== undefined) {
            setIsOpen(open);
            setDragProgress(open ? 1 : 0);
        }
    }, [open]);

    // Sync dragProgress with normal open/close when not dragging
    useEffect(() => {
        // Only update dragProgress if we're not in a dragging state (at definitive positions)
        if (dragProgress === 0 || dragProgress === 1) {
            setDragProgress(isOpen ? 1 : 0);
        }
    }, [isOpen, dragProgress]);

    const handleOpenChange = (newOpen: boolean) => {
        setIsOpen(newOpen);
        onOpenChange?.(newOpen);
    };

    const handleOverlayClick = () => {
        onClickOutside?.();
        handleOpenChange(false);
    };

    // Apply background scaling effect with nesting support
    useEffect(() => {
        if (!scaleBackground) return;

        // Try to find the theme container first, fallback to body
        const themeContainer = document.querySelector('#rad-ui-theme-container') as HTMLElement;
        const targetElement = themeContainer || document.body;
        const bodyElement = document.body;

        if (!targetElement) return;

        const originalOverflow = targetElement.style.overflow;
        const originalTransform = targetElement.style.transform;
        const originalTransition = targetElement.style.transition;
        const originalBorderRadius = targetElement.style.borderRadius;
        const originalTransformOrigin = targetElement.style.transformOrigin;
        const originalBodyBackground = bodyElement.style.backgroundColor;
        const originalBodyTransition = bodyElement.style.transition;

        // Apply scaling based on drag progress or normal open state (only for top-level drawer)
        if (nestingLevel === 0) {
            targetElement.style.overflow = 'hidden';
            targetElement.style.transformOrigin = 'center center';

            // Use drag progress if available and in a dragging state, otherwise use normal isOpen state
            const effectiveProgress = (dragProgress > 0 && dragProgress < 1) ? dragProgress : (isOpen ? 1 : 0);

            // Calculate scale based on effective progress (0 = no scale, 1 = full scale)
            const currentScale = 1 - (effectiveProgress * (1 - backgroundScaleAmount));
            const currentRadius = effectiveProgress * backgroundBorderRadius;

            // Apply smooth transitions when not actively dragging
            targetElement.style.transition = `transform ${transitionDuration}ms ${transitionTimingFunction}, border-radius ${transitionDuration}ms ${transitionTimingFunction}`;

            targetElement.style.transform = `scale(${currentScale}) translateZ(0)`;
            targetElement.style.borderRadius = `${currentRadius}px`;

            // Background color based on effective progress
            const backgroundOpacity = effectiveProgress * 1; // 0 to 1
            if (effectiveProgress > 0) {
                bodyElement.style.transition = isOpen && effectiveProgress === 1 ? 'none' : `background-color ${transitionDuration}ms ${transitionTimingFunction}`;
                bodyElement.style.backgroundColor = `rgba(0, 0, 0, ${backgroundOpacity})`;
            } else {
                bodyElement.style.transition = `background-color ${transitionDuration}ms ${transitionTimingFunction}`;
                bodyElement.style.backgroundColor = originalBodyBackground;

                // Reset body transition after animation completes
                setTimeout(() => {
                    bodyElement.style.transition = originalBodyTransition;
                }, transitionDuration);
            }
        }

        return () => {
            // Cleanup on unmount - only reset for top-level drawer
            if (targetElement && nestingLevel === 0) {
                targetElement.style.overflow = originalOverflow;
                targetElement.style.transform = originalTransform;
                targetElement.style.transition = originalTransition;
                targetElement.style.borderRadius = originalBorderRadius;
                targetElement.style.transformOrigin = originalTransformOrigin;

                // Reset body background color immediately on unmount (no transition needed)
                bodyElement.style.backgroundColor = originalBodyBackground;
                bodyElement.style.transition = originalBodyTransition;
            }
        };
    }, [isOpen, scaleBackground, transitionDuration, transitionTimingFunction, backgroundScaleAmount, backgroundBorderRadius, nestingLevel]);

    const handleDragProgress = (progress: number) => {
        setDragProgress(progress);
    };

    const handleDragEnd = (finalProgress: number) => {
        // Snap to open or closed based on progress threshold
        const shouldOpen = finalProgress > 0.5;
        setDragProgress(shouldOpen ? 1 : 0);

        if (shouldOpen !== isOpen) {
            setIsOpen(shouldOpen);
            onOpenChange?.(shouldOpen);
        }
    };

    const contextProps = {
        rootClass,
        side,
        transitionDuration,
        transitionTimingFunction,
        isOpen,
        handleOverlayClick,
        nestingLevel,
        zIndex,
        dragProgress,
        handleDragProgress,
        handleDragEnd
    };

    return <DialogPrimitive.Root
        open={isOpen}
        onOpenChange={handleOpenChange}
        onClickOutside={handleOverlayClick}
        {...props}
    >
        <DrawerContext.Provider value={contextProps}>
            <div
                className={clsx(rootClass, className)}
                data-drawer-root
                ref={(el) => {
                    if (el) {
                        (el as any).__drawerOpenChange = handleOpenChange;
                    }
                }}
            >
                {children}
            </div>
        </DrawerContext.Provider>
    </DialogPrimitive.Root>;
};

export default DrawerRoot;
