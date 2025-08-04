'use client';
import React, { useState, useRef, useCallback, ReactNode } from 'react';
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

const COMPONENT_NAME = 'rad-ui-splitter';

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

    const isHorizontal = orientation === 'horizontal';

    // Update sizes and call onChange
    const updateSizes = useCallback((newSizes: number[]) => {
        setSizes(newSizes);
        onSizesChange?.(newSizes);
    }, [onSizesChange]);

    // Start drag operation
    const startDrag = useCallback((handleIndex: number, event: React.MouseEvent | React.TouchEvent) => {
        event.preventDefault();

        const position = isHorizontal
            ? ('clientX' in event ? event.clientX : event.touches[0].clientX)
            : ('clientY' in event ? event.clientY : event.touches[0].clientY);

        const currentSizes = [...sizes];
        setDragStart({ position, sizes: currentSizes });
        setIsDragging(true);
        setActiveHandleIndex(handleIndex);

        const handleMove = (moveEvent: MouseEvent | TouchEvent) => {
            if (!containerRef.current) return;

            const currentPosition = isHorizontal
                ? ('clientX' in moveEvent ? moveEvent.clientX : moveEvent.touches[0].clientX)
                : ('clientY' in moveEvent ? moveEvent.clientY : moveEvent.touches[0].clientY);

            const delta = currentPosition - position;
            const containerSize = isHorizontal
                ? containerRef.current.offsetWidth
                : containerRef.current.offsetHeight;

            const deltaPercent = (delta / containerSize) * 100;

            const newSizes = [...currentSizes];
            const leftPanelIndex = handleIndex;
            const rightPanelIndex = handleIndex + 1;

            // Calculate new sizes with constraints
            const leftSize = Math.max(
                minSizes[leftPanelIndex] || 0,
                Math.min(maxSizes[leftPanelIndex] || 100, newSizes[leftPanelIndex] + deltaPercent)
            );
            const rightSize = Math.max(
                minSizes[rightPanelIndex] || 0,
                Math.min(maxSizes[rightPanelIndex] || 100, newSizes[rightPanelIndex] - deltaPercent)
            );

            // Normalize to ensure total is 100%
            const total = leftSize + rightSize;
            newSizes[leftPanelIndex] = (leftSize / total) * 100;
            newSizes[rightPanelIndex] = (rightSize / total) * 100;

            updateSizes(newSizes);
        };

        const handleEnd = () => {
            setIsDragging(false);
            setActiveHandleIndex(null);
            setDragStart(null);
            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('mouseup', handleEnd);
            document.removeEventListener('touchmove', handleMove);
            document.removeEventListener('touchend', handleEnd);
        };

        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleEnd);
        document.addEventListener('touchmove', handleMove);
        document.addEventListener('touchend', handleEnd);
    }, [isHorizontal, sizes, minSizes, maxSizes, updateSizes]);

    // Keyboard navigation
    const handleKeyDown = useCallback((handleIndex: number, event: React.KeyboardEvent) => {
        const step = event.shiftKey ? 10 : 1;
        const newSizes = [...sizes];
        const leftPanelIndex = handleIndex;
        const rightPanelIndex = handleIndex + 1;

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
            const leftSize = Math.max(
                minSizes[leftPanelIndex] || 0,
                Math.min(maxSizes[leftPanelIndex] || 100, newSizes[leftPanelIndex] + delta)
            );
            const rightSize = Math.max(
                minSizes[rightPanelIndex] || 0,
                Math.min(maxSizes[rightPanelIndex] || 100, newSizes[rightPanelIndex] - delta)
            );

            const total = leftSize + rightSize;
            newSizes[leftPanelIndex] = (leftSize / total) * 100;
            newSizes[rightPanelIndex] = (rightSize / total) * 100;

            updateSizes(newSizes);
        }
    }, [isHorizontal, sizes, minSizes, maxSizes, updateSizes]);

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
