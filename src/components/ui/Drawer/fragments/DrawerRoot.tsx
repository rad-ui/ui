'use client';
import React, { useEffect, useState } from 'react';

import { DrawerContext } from '../context/DrawerContext';
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

    const handleOpenChange = (newOpen: boolean) => {
        setIsOpen(newOpen);
        onOpenChange?.(newOpen);
    };

    const handleOverlayClick = () => {
        onClickOutside?.();
        handleOpenChange(false);
    };

    // Apply background scaling effect
    useEffect(() => {
        if (!scaleBackground) return;

        // Try to find the theme container first, fallback to body
        const themeContainer = document.querySelector('#rad-ui-theme-container') as HTMLElement;
        const targetElement = themeContainer || document.body;

        if (!targetElement) return;

        const originalOverflow = targetElement.style.overflow;
        const originalTransform = targetElement.style.transform;
        const originalTransition = targetElement.style.transition;
        const originalBorderRadius = targetElement.style.borderRadius;
        const originalTransformOrigin = targetElement.style.transformOrigin;

        if (isOpen) {
            targetElement.style.overflow = 'hidden';
            targetElement.style.transformOrigin = 'center center';
            targetElement.style.transition = `transform ${transitionDuration}ms ${transitionTimingFunction}, border-radius ${transitionDuration}ms ${transitionTimingFunction}`;
            targetElement.style.transform = `scale(${backgroundScaleAmount}) translateZ(0)`;
            targetElement.style.borderRadius = `${backgroundBorderRadius}px`;
        } else {
            targetElement.style.transform = originalTransform;
            targetElement.style.borderRadius = originalBorderRadius;
            targetElement.style.transformOrigin = originalTransformOrigin;
        }

        return () => {
            // Cleanup on unmount
            if (targetElement) {
                targetElement.style.overflow = originalOverflow;
                targetElement.style.transform = originalTransform;
                targetElement.style.transition = originalTransition;
                targetElement.style.borderRadius = originalBorderRadius;
                targetElement.style.transformOrigin = originalTransformOrigin;
            }
        };
    }, [isOpen, scaleBackground, transitionDuration, transitionTimingFunction, backgroundScaleAmount, backgroundBorderRadius]);

    const contextProps = {
        rootClass,
        side,
        transitionDuration,
        transitionTimingFunction,
        isOpen,
        handleOverlayClick
    };

    return <DialogPrimitive.Root
        open={isOpen}
        onOpenChange={handleOpenChange}
        onClickOutside={handleOverlayClick}
        {...props}
    >
        <DrawerContext.Provider value={contextProps}>
            <div className={clsx(rootClass, className)}>
                {children}
            </div>
        </DrawerContext.Provider>
    </DialogPrimitive.Root>;
};

export default DrawerRoot;
