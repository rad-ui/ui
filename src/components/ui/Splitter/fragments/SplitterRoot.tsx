'use client';
import React, { useState, useRef, useCallback, ReactNode, useMemo } from 'react';
import { customClassSwitcher } from '~/core';
import { clsx } from 'clsx';
import SplitterContext, { SplitterContextValue, SplitterOrientation } from '../context/SplitterContext';

export interface SplitterRootProps {
  orientation?: SplitterOrientation;
  children: ReactNode;
  className?: string;
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

const SplitterRoot: React.FC<SplitterRootProps> = ({
    orientation = 'horizontal',
    children,
    className = '',
    customRootClass = '',
    defaultSizes = [50, 50],
    minSizes = [0, 0],
    maxSizes = [100, 100],
    onSizesChange
}) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    const containerRef = useRef<HTMLDivElement>(null);
    const [sizes, setSizes] = useState<number[]>(defaultSizes);
    const [isDragging, setIsDragging] = useState(false);
    const [activeHandleIndex, setActiveHandleIndex] = useState<number | null>(null);
    const [dragStart, setDragStart] = useState<{ position: number; sizes: number[] } | null>(null);

    // Performance optimization: Memoize constraints to prevent unnecessary recalculations
    const constraints = useMemo(() => ({
        minSizes: minSizes || [],
        maxSizes: maxSizes || []
    }), [minSizes, maxSizes]);

    // Performance optimization: Debounced callback for size changes
    const debouncedOnSizesChange = useRef<NodeJS.Timeout | null>(null);

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

                // Multi-panel resizing algorithm
                // When dragging a handle, we need to redistribute space across all panels
                const totalPanels = newSizes.length;

                // Calculate the target size for the panel being expanded
                const expandingPanelIndex = handleIndex;
                const expandingPanelTargetSize = Math.max(
                    minSizes[expandingPanelIndex] || 0,
                    Math.min(maxSizes[expandingPanelIndex] || 100, newSizes[expandingPanelIndex] + deltaPercent)
                );

                // Calculate how much space we need to take from other panels
                const spaceNeeded = expandingPanelTargetSize - newSizes[expandingPanelIndex];

                if (Math.abs(spaceNeeded) > 0.1) { // Only update if there's meaningful change
                    // Find all panels that can give up space (excluding the expanding panel)
                    const panelsToShrink = [];
                    let totalShrinkableSpace = 0;

                    for (let i = 0; i < totalPanels; i++) {
                        if (i !== expandingPanelIndex) {
                            const currentSize = newSizes[i];
                            const minSize = minSizes[i] || 0;
                            const shrinkableSpace = currentSize - minSize;

                            if (shrinkableSpace > 0) {
                                panelsToShrink.push(i);
                                totalShrinkableSpace += shrinkableSpace;
                            }
                        }
                    }

                    if (panelsToShrink.length > 0 && totalShrinkableSpace > 0) {
                        // Set the expanding panel to its target size
                        newSizes[expandingPanelIndex] = expandingPanelTargetSize;

                        // Proportionally reduce other panels
                        const remainingSpace = 100 - expandingPanelTargetSize;
                        let distributedSpace = 0;

                        for (let i = 0; i < panelsToShrink.length; i++) {
                            const panelIndex = panelsToShrink[i];
                            const currentSize = newSizes[panelIndex];
                            const minSize = minSizes[panelIndex] || 0;
                            const shrinkableSpace = currentSize - minSize;

                            // Calculate proportional reduction
                            const reductionRatio = shrinkableSpace / totalShrinkableSpace;
                            const spaceToReduce = spaceNeeded * reductionRatio;
                            const newSize = Math.max(minSize, currentSize - spaceToReduce);

                            newSizes[panelIndex] = newSize;
                            distributedSpace += newSize;
                        }

                        // Ensure the expanding panel gets the remaining space if needed
                        if (distributedSpace < remainingSpace) {
                            newSizes[expandingPanelIndex] = 100 - distributedSpace;
                        }
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

            // Use the same multi-panel algorithm as drag
            const totalPanels = newSizes.length;
            const expandingPanelIndex = handleIndex;
            const expandingPanelTargetSize = Math.max(
                minSizes[expandingPanelIndex] || 0,
                Math.min(maxSizes[expandingPanelIndex] || 100, newSizes[expandingPanelIndex] + delta)
            );

            const spaceNeeded = expandingPanelTargetSize - newSizes[expandingPanelIndex];

            if (Math.abs(spaceNeeded) > 0.1) {
                const panelsToShrink = [];
                let totalShrinkableSpace = 0;

                for (let i = 0; i < totalPanels; i++) {
                    if (i !== expandingPanelIndex) {
                        const currentSize = newSizes[i];
                        const minSize = minSizes[i] || 0;
                        const shrinkableSpace = currentSize - minSize;

                        if (shrinkableSpace > 0) {
                            panelsToShrink.push(i);
                            totalShrinkableSpace += shrinkableSpace;
                        }
                    }
                }

                if (panelsToShrink.length > 0 && totalShrinkableSpace > 0) {
                    newSizes[expandingPanelIndex] = expandingPanelTargetSize;

                    const remainingSpace = 100 - expandingPanelTargetSize;
                    let distributedSpace = 0;

                    for (let i = 0; i < panelsToShrink.length; i++) {
                        const panelIndex = panelsToShrink[i];
                        const currentSize = newSizes[panelIndex];
                        const minSize = minSizes[panelIndex] || 0;
                        const shrinkableSpace = currentSize - minSize;

                        const reductionRatio = shrinkableSpace / totalShrinkableSpace;
                        const spaceToReduce = spaceNeeded * reductionRatio;
                        const newSize = Math.max(minSize, currentSize - spaceToReduce);

                        newSizes[panelIndex] = newSize;
                        distributedSpace += newSize;
                    }

                    if (distributedSpace < remainingSpace) {
                        newSizes[expandingPanelIndex] = 100 - distributedSpace;
                    }
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
                ref={containerRef}
                className={clsx(rootClass, className)}
                style={{
                    display: 'flex',
                    flexDirection: isHorizontal ? 'row' : 'column',
                    width: '100%',
                    height: '100%'
                }}
            >
                {children}
            </div>
        </SplitterContext.Provider>
    );
};

export default SplitterRoot;
