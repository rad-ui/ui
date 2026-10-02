'use client';
import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import { KEYBOARD_KEYS } from '~/core/utils/keyboard';
import clsx from 'clsx';
import SplitterContext, { SplitterContextValue, SplitterOrientation } from '../context/SplitterContext';

export interface SplitterRootProps extends React.ComponentPropsWithoutRef<'div'> {
  orientation?: SplitterOrientation;
  customRootClass?: string;
  defaultSizes?: number[];
  minSizes?: number[];
  maxSizes?: number[];
  onSizesChange?: (sizes: number[]) => void;
}

// Hook to use splitter context
export const useSplitter = () => {
    const context = React.useContext(SplitterContext);
    if (!context) {
        throw new Error('Splitter components must be used within a Splitter.Root');
    }
    return context;
};

const COMPONENT_NAME = 'Splitter';

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

const SplitterRoot = React.forwardRef<
    React.ElementRef<'div'>,
    SplitterRootProps
>(({
    orientation = 'horizontal',
    children,
    className,
    customRootClass = '',
    defaultSizes = [50, 50],
    minSizes = [0, 0],
    maxSizes = [100, 100],
    onSizesChange,
    style,
    ...props
}, forwardedRef) => {
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [sizes, setSizes] = useState<number[]>(defaultSizes);
    const [isDragging, setIsDragging] = useState(false);
    const [activeHandleIndex, setActiveHandleIndex] = useState<number | null>(null);
    const [dragStart, setDragStart] = useState<{ position: number; sizes: number[] } | null>(null);

    const mergedRef = useCallback((node: HTMLDivElement | null) => {
        containerRef.current = node;
        if (typeof forwardedRef === 'function') {
            forwardedRef(node);
        } else if (forwardedRef) {
            (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
    }, [forwardedRef]);

    // Performance optimization: Memoize constraints to prevent unnecessary recalculations
    const constraints = useMemo(() => ({
        minSizes: minSizes || [],
        maxSizes: maxSizes || []
    }), [minSizes, maxSizes]);

    // Performance optimization: Debounced callback for size changes
    const debouncedOnSizesChange = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        return () => {
            if (debouncedOnSizesChange.current) {
                clearTimeout(debouncedOnSizesChange.current);
                debouncedOnSizesChange.current = null;
            }
        };
    }, []);

    // Performance optimization: Use refs to avoid stale closures in event handlers
    const sizesRef = useRef(sizes);
    const constraintsRef = useRef(constraints);

    // Update refs when values change
    sizesRef.current = sizes;
    constraintsRef.current = constraints;

    const isHorizontal = orientation === 'horizontal';

    const getHandleBounds = useCallback((handleIndex: number, currentSizes = sizesRef.current) => {
        const leftPanelIndex = handleIndex;
        const rightPanelIndex = handleIndex + 1;
        const { minSizes, maxSizes } = constraintsRef.current;

        const leftPanelCurrentSize = currentSizes[leftPanelIndex] || 0;
        const rightPanelCurrentSize = currentSizes[rightPanelIndex] || 0;
        const totalAdjacentSize = leftPanelCurrentSize + rightPanelCurrentSize;

        const leftMin = minSizes[leftPanelIndex] ?? 0;
        const leftMax = maxSizes[leftPanelIndex] ?? 100;
        const rightMin = minSizes[rightPanelIndex] ?? 0;
        const rightMax = maxSizes[rightPanelIndex] ?? 100;

        return {
            leftPanelIndex,
            rightPanelIndex,
            min: Math.max(leftMin, totalAdjacentSize - rightMax),
            max: Math.min(leftMax, totalAdjacentSize - rightMin),
            totalAdjacentSize
        };
    }, []);

    const resizeAdjacentPanels = useCallback((handleIndex: number, desiredLeftPanelSize: number, baseSizes = sizesRef.current) => {
        const newSizes = [...baseSizes];
        const { leftPanelIndex, rightPanelIndex, min, max, totalAdjacentSize } = getHandleBounds(handleIndex, newSizes);
        const leftPanelSize = clamp(desiredLeftPanelSize, min, max);

        newSizes[leftPanelIndex] = leftPanelSize;
        newSizes[rightPanelIndex] = totalAdjacentSize - leftPanelSize;

        return newSizes;
    }, [getHandleBounds]);

    const getHandleValueAttributes = useCallback((handleIndex: number) => {
        const currentSizes = sizesRef.current;
        const { leftPanelIndex, min, max } = getHandleBounds(handleIndex, currentSizes);

        return {
            'aria-valuemin': min,
            'aria-valuemax': max,
            'aria-valuenow': currentSizes[leftPanelIndex] || 0
        };
    }, [getHandleBounds]);

    // Performance optimized update sizes with debouncing
    const updateSizes = useCallback((newSizes: number[], immediate = false) => {
        setSizes(newSizes);

        // Debounce the callback to prevent excessive calls during drag
        if (debouncedOnSizesChange.current) {
            clearTimeout(debouncedOnSizesChange.current);
        }

        if (onSizesChange) {
            if (immediate) {
                onSizesChange(newSizes);
            } else {
                debouncedOnSizesChange.current = setTimeout(() => {
                    onSizesChange(newSizes);
                }, 16); // ~60fps debounce
            }
        }
    }, [onSizesChange]);

    // Performance optimized drag operation
    const startDrag = useCallback((handleIndex: number, event: React.MouseEvent | React.TouchEvent) => {
        event.preventDefault();

        const position = isHorizontal
            ? ('clientX' in event ? event.clientX : event.touches[0].clientX)
            : ('clientY' in event ? event.clientY : event.touches[0].clientY);

        const currentSizes = [...sizesRef.current];
        setDragStart({ position, sizes: currentSizes });
        setIsDragging(true);
        setActiveHandleIndex(handleIndex);

        // Performance optimization: Use requestAnimationFrame for smooth updates
        let animationFrameId: number | null = null;
        let lastUpdateTime = 0;
        const THROTTLE_MS = 16; // ~60fps

        const handleMove = (moveEvent: MouseEvent | TouchEvent) => {
            if (!containerRef.current) return;

            const now = Date.now();
            if (now - lastUpdateTime < THROTTLE_MS) return;

            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }

            animationFrameId = requestAnimationFrame(() => {
                const currentPosition = isHorizontal
                    ? ('clientX' in moveEvent ? moveEvent.clientX : moveEvent.touches[0].clientX)
                    : ('clientY' in moveEvent ? moveEvent.clientY : moveEvent.touches[0].clientY);

                const delta = currentPosition - position;
                const containerSize = isHorizontal
                    ? containerRef.current!.offsetWidth
                    : containerRef.current!.offsetHeight;

                const deltaPercent = (delta / containerSize) * 100;

                if (Math.abs(deltaPercent) > 0.1) { // Only update if there's meaningful change
                    const leftPanelCurrentSize = currentSizes[handleIndex] || 0;
                    const newSizes = resizeAdjacentPanels(handleIndex, leftPanelCurrentSize + deltaPercent, currentSizes);

                    // Update sizes without triggering callback during drag
                    setSizes(newSizes);
                }
                lastUpdateTime = now;
            });
        };

        const handleEnd = () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }

            setIsDragging(false);
            setActiveHandleIndex(null);
            setDragStart(null);

            // Trigger final callback with current sizes
            const finalSizes = sizesRef.current;
            if (onSizesChange) {
                onSizesChange(finalSizes);
            }

            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('mouseup', handleEnd);
            document.removeEventListener('touchmove', handleMove);
            document.removeEventListener('touchend', handleEnd);
        };

        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleEnd);
        document.addEventListener('touchmove', handleMove);
        document.addEventListener('touchend', handleEnd);
    }, [isHorizontal, onSizesChange, resizeAdjacentPanels]);

    // Performance optimized keyboard navigation with multi-panel support
    const handleKeyDown = useCallback((handleIndex: number, event: React.KeyboardEvent) => {
        const step = event.shiftKey ? 10 : 1;
        const currentSizes = sizesRef.current;

        let delta = 0;
        if (isHorizontal) {
            if (event.key === KEYBOARD_KEYS.ARROW_LEFT) delta = -step;
            if (event.key === KEYBOARD_KEYS.ARROW_RIGHT) delta = step;
        } else {
            if (event.key === KEYBOARD_KEYS.ARROW_UP) delta = -step;
            if (event.key === KEYBOARD_KEYS.ARROW_DOWN) delta = step;
        }

        if (delta !== 0) {
            event.preventDefault();
            const leftPanelSize = currentSizes[handleIndex] || 0;
            updateSizes(resizeAdjacentPanels(handleIndex, leftPanelSize + delta), true);
            return;
        }

        if (event.key === KEYBOARD_KEYS.HOME || event.key === KEYBOARD_KEYS.END) {
            event.preventDefault();
            const { min, max } = getHandleBounds(handleIndex, currentSizes);
            updateSizes(resizeAdjacentPanels(handleIndex, event.key === KEYBOARD_KEYS.HOME ? min : max), true);
        }
    }, [getHandleBounds, isHorizontal, resizeAdjacentPanels, updateSizes]);

    const contextValue: SplitterContextValue = {
        orientation,
        sizes,
        setSizes: updateSizes,
        getHandleValueAttributes,
        startDrag,
        handleKeyDown,
        isDragging,
        activeHandleIndex,
        rootClass
    };

    return (
        <SplitterContext.Provider value={contextValue}>
            <div
                {...props}
                ref={mergedRef}
                className={clsx(rootClass, className)}
                style={{
                    display: 'flex',
                    flexDirection: isHorizontal ? 'row' : 'column',
                    width: '100%',
                    height: '100%',
                    ...style
                }}
            >
                {children}
            </div>
        </SplitterContext.Provider>
    );
});

SplitterRoot.displayName = 'SplitterRoot';

export default SplitterRoot;
