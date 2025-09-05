'use client';
import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { customClassSwitcher } from '~/core';
import { clsx } from 'clsx';
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
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
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

                const newSizes = [...currentSizes];
                const { minSizes, maxSizes } = constraintsRef.current;

                // Intuitive resizing algorithm
                // When dragging a handle, only affect the two adjacent panels
                const leftPanelIndex = handleIndex;
                const rightPanelIndex = handleIndex + 1;
                const totalPanels = newSizes.length;

                // Calculate new sizes for the two adjacent panels
                const leftPanelCurrentSize = newSizes[leftPanelIndex];
                const rightPanelCurrentSize = newSizes[rightPanelIndex];

                // Calculate target sizes with constraints
                const leftPanelTargetSize = Math.max(
                    minSizes[leftPanelIndex] || 0,
                    Math.min(maxSizes[leftPanelIndex] || 100, leftPanelCurrentSize + deltaPercent)
                );

                const rightPanelTargetSize = Math.max(
                    minSizes[rightPanelIndex] || 0,
                    Math.min(maxSizes[rightPanelIndex] || 100, rightPanelCurrentSize - deltaPercent)
                );

                // Check if we can make the change
                const totalAdjacentSize = leftPanelTargetSize + rightPanelTargetSize;
                const spaceAvailable = 100 - (leftPanelCurrentSize + rightPanelCurrentSize);

                if (Math.abs(deltaPercent) > 0.1) { // Only update if there's meaningful change
                    // If the adjacent panels can accommodate the change, apply it directly
                    if (totalAdjacentSize <= 100) {
                        newSizes[leftPanelIndex] = leftPanelTargetSize;
                        newSizes[rightPanelIndex] = rightPanelTargetSize;
                    } else {
                        // If we can't fit both panels, try to maintain the ratio
                        const ratio = leftPanelCurrentSize / (leftPanelCurrentSize + rightPanelCurrentSize);
                        const availableSpace = 100 - spaceAvailable;

                        newSizes[leftPanelIndex] = Math.max(
                            minSizes[leftPanelIndex] || 0,
                            Math.min(maxSizes[leftPanelIndex] || 100, availableSpace * ratio)
                        );
                        newSizes[rightPanelIndex] = Math.max(
                            minSizes[rightPanelIndex] || 0,
                            Math.min(maxSizes[rightPanelIndex] || 100, availableSpace * (1 - ratio))
                        );
                    }
                }

                // Update sizes without triggering callback during drag
                setSizes(newSizes);
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
    }, [isHorizontal, onSizesChange]);

    // Performance optimized keyboard navigation with multi-panel support
    const handleKeyDown = useCallback((handleIndex: number, event: React.KeyboardEvent) => {
        const step = event.shiftKey ? 10 : 1;
        const newSizes = [...sizesRef.current];
        const { minSizes, maxSizes } = constraintsRef.current;

        let delta = 0;
        if (isHorizontal) {
            if (event.key === 'ArrowLeft') delta = -step;
            if (event.key === 'ArrowRight') delta = step;
        } else {
            if (event.key === 'ArrowUp') delta = -step;
            if (event.key === 'ArrowDown') delta = step;
        }

        if (delta !== 0) {
            event.preventDefault();

            // Use the same intuitive algorithm as drag
            const leftPanelIndex = handleIndex;
            const rightPanelIndex = handleIndex + 1;

            // Calculate new sizes for the two adjacent panels
            const leftPanelCurrentSize = newSizes[leftPanelIndex];
            const rightPanelCurrentSize = newSizes[rightPanelIndex];

            // Calculate target sizes with constraints
            const leftPanelTargetSize = Math.max(
                minSizes[leftPanelIndex] || 0,
                Math.min(maxSizes[leftPanelIndex] || 100, leftPanelCurrentSize + delta)
            );

            const rightPanelTargetSize = Math.max(
                minSizes[rightPanelIndex] || 0,
                Math.min(maxSizes[rightPanelIndex] || 100, rightPanelCurrentSize - delta)
            );

            // Check if we can make the change
            const totalAdjacentSize = leftPanelTargetSize + rightPanelTargetSize;
            const spaceAvailable = 100 - (leftPanelCurrentSize + rightPanelCurrentSize);

            if (Math.abs(delta) > 0.1) {
                // If the adjacent panels can accommodate the change, apply it directly
                if (totalAdjacentSize <= 100) {
                    newSizes[leftPanelIndex] = leftPanelTargetSize;
                    newSizes[rightPanelIndex] = rightPanelTargetSize;
                } else {
                    // If we can't fit both panels, try to maintain the ratio
                    const ratio = leftPanelCurrentSize / (leftPanelCurrentSize + rightPanelCurrentSize);
                    const availableSpace = 100 - spaceAvailable;

                    newSizes[leftPanelIndex] = Math.max(
                        minSizes[leftPanelIndex] || 0,
                        Math.min(maxSizes[leftPanelIndex] || 100, availableSpace * ratio)
                    );
                    newSizes[rightPanelIndex] = Math.max(
                        minSizes[rightPanelIndex] || 0,
                        Math.min(maxSizes[rightPanelIndex] || 100, availableSpace * (1 - ratio))
                    );
                }
            }

            updateSizes(newSizes, true); // Immediate update for keyboard
        }
    }, [isHorizontal, updateSizes]);

    const contextValue: SplitterContextValue = {
        orientation,
        sizes,
        setSizes: updateSizes,
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
