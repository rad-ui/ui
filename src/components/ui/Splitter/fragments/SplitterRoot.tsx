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
  /** Disables resizing by pointer and keyboard for every handle. */
  disabled?: boolean;
  /** Reading direction. In RTL, horizontal arrow keys and drags are mirrored. Inherited from the DOM when omitted. */
  dir?: 'ltr' | 'rtl';
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
// Screen readers announce raw values; keep them readable (e.g. 55.8 rather than 55.833333333333336).
const roundForAria = (value: number) => Math.round(value * 10) / 10;

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
    disabled = false,
    dir,
    style,
    ...props
}, forwardedRef) => {
    const baseId = React.useId();
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [sizes, setSizes] = useState<number[]>(defaultSizes);
    const [isDragging, setIsDragging] = useState(false);
    const [activeHandleIndex, setActiveHandleIndex] = useState<number | null>(null);
    // Per-panel minSize/maxSize props registered by Splitter.Panel; root-level arrays win.
    const [panelConstraints, setPanelConstraints] = useState<Record<number, { minSize?: number; maxSize?: number }>>({});
    const [panelIds, setPanelIds] = useState<Record<number, string>>({});
    const endDragRef = useRef<(() => void) | null>(null);

    const mergedRef = useCallback((node: HTMLDivElement | null) => {
        containerRef.current = node;
        if (typeof forwardedRef === 'function') {
            forwardedRef(node);
        } else if (forwardedRef) {
            (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
    }, [forwardedRef]);

    // Performance optimization: Memoize constraints to prevent unnecessary recalculations
    const constraints = useMemo(() => {
        const mergedMin = [...(minSizes || [])];
        const mergedMax = [...(maxSizes || [])];
        Object.entries(panelConstraints).forEach(([key, value]) => {
            const index = Number(key);
            if (value.minSize !== undefined) mergedMin[index] = Math.max(mergedMin[index] ?? 0, value.minSize);
            if (value.maxSize !== undefined) mergedMax[index] = Math.min(mergedMax[index] ?? 100, value.maxSize);
        });
        return { minSizes: mergedMin, maxSizes: mergedMax };
    }, [minSizes, maxSizes, panelConstraints]);

    const getPanelId = useCallback((index: number) => panelIds[index] ?? `${baseId}-panel-${index}`, [panelIds, baseId]);

    const registerPanelId = useCallback((index: number, id: string) => {
        setPanelIds((previous) => (previous[index] === id ? previous : { ...previous, [index]: id }));
        return () => {
            setPanelIds((previous) => {
                if (previous[index] !== id) return previous;
                const next = { ...previous };
                delete next[index];
                return next;
            });
        };
    }, []);

    const registerPanelConstraints = useCallback((index: number, minSize?: number, maxSize?: number) => {
        setPanelConstraints((previous) => {
            const current = previous[index];
            if (current?.minSize === minSize && current?.maxSize === maxSize) return previous;
            const next = { ...previous };
            if (minSize === undefined && maxSize === undefined) delete next[index];
            else next[index] = { minSize, maxSize };
            return next;
        });
        return () => {
            setPanelConstraints((previous) => {
                if (!(index in previous)) return previous;
                const next = { ...previous };
                delete next[index];
                return next;
            });
        };
    }, []);

    // Performance optimization: Debounced callback for size changes
    const debouncedOnSizesChange = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        return () => {
            // Unmounting mid-drag must not leave document listeners behind.
            endDragRef.current?.();
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

    // Visual direction decides which way a horizontal handle moves. Prefer the prop, else
    // read the resolved CSS direction (covers dir inherited from an ancestor).
    const isRtl = useCallback(() => {
        if (dir) return dir === 'rtl';
        const container = containerRef.current;
        if (!container || typeof window === 'undefined' || typeof window.getComputedStyle !== 'function') return false;
        return window.getComputedStyle(container).direction === 'rtl';
    }, [dir]);

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
            'aria-valuemin': roundForAria(min),
            'aria-valuemax': roundForAria(max),
            'aria-valuenow': roundForAria(currentSizes[leftPanelIndex] || 0)
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

    // Drag: coalesce pointer moves into one update per animation frame, and always apply the
    // final pointer position on release so the handle ends exactly where the pointer stopped.
    const startDrag = useCallback((handleIndex: number, event: React.MouseEvent | React.TouchEvent) => {
        if (disabled) return;
        if ('button' in event && event.button !== 0) return;
        event.preventDefault();

        // preventDefault() on mousedown suppresses native focus; keep keyboard follow-up working.
        const handleElement = event.currentTarget as HTMLElement | null;
        if (handleElement && typeof handleElement.focus === 'function' && document.activeElement !== handleElement) {
            handleElement.focus({ preventScroll: true });
        }

        endDragRef.current?.();

        const getPosition = (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
            if ('touches' in e) {
                const touch = e.touches[0] ?? e.changedTouches?.[0];
                if (!touch) return null;
                return isHorizontal ? touch.clientX : touch.clientY;
            }
            return isHorizontal ? e.clientX : e.clientY;
        };

        const startPosition = getPosition(event);
        if (startPosition === null) return;

        const startSizes = [...sizesRef.current];
        const panelCount = startSizes.length;
        const direction = isHorizontal && isRtl() ? -1 : 1;
        // Handles take up real space; percentages are relative to the space left for panels.
        const handleSize = handleElement
            ? (isHorizontal ? handleElement.offsetWidth : handleElement.offsetHeight)
            : 0;

        setIsDragging(true);
        setActiveHandleIndex(handleIndex);

        let animationFrameId: number | null = null;
        let latestPosition = startPosition;
        let latestSizes = startSizes;

        const computeSizes = (position: number) => {
            const container = containerRef.current;
            if (!container) return latestSizes;
            const containerSize = isHorizontal ? container.clientWidth : container.clientHeight;
            const available = containerSize - handleSize * Math.max(0, panelCount - 1);
            if (available <= 0) return latestSizes;
            const deltaPercent = ((position - startPosition) * direction / available) * 100;
            return resizeAdjacentPanels(handleIndex, (startSizes[handleIndex] || 0) + deltaPercent, startSizes);
        };

        const applyLatest = () => {
            animationFrameId = null;
            const nextSizes = computeSizes(latestPosition);
            if (nextSizes.some((size, index) => size !== latestSizes[index])) {
                latestSizes = nextSizes;
                sizesRef.current = nextSizes;
                setSizes(nextSizes);
            }
        };

        const handleMove = (moveEvent: MouseEvent | TouchEvent) => {
            const position = getPosition(moveEvent);
            if (position === null) return;
            if (moveEvent.cancelable && 'touches' in moveEvent) {
                // Keep the page from scrolling while a handle is dragged by touch.
                moveEvent.preventDefault();
            }
            latestPosition = position;
            if (animationFrameId === null) {
                animationFrameId = requestAnimationFrame(applyLatest);
            }
        };

        const removeListeners = () => {
            if (animationFrameId !== null) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('mouseup', handleEnd);
            document.removeEventListener('touchmove', handleMove);
            document.removeEventListener('touchend', handleEnd);
            document.removeEventListener('touchcancel', handleEnd);
            endDragRef.current = null;
        };

        function handleEnd() {
            const hadPendingFrame = animationFrameId !== null;
            removeListeners();
            if (hadPendingFrame) applyLatest();

            setIsDragging(false);
            setActiveHandleIndex(null);

            const changed = latestSizes.some((size, index) => size !== startSizes[index]);
            if (changed && onSizesChange) {
                if (debouncedOnSizesChange.current) {
                    clearTimeout(debouncedOnSizesChange.current);
                    debouncedOnSizesChange.current = null;
                }
                onSizesChange(latestSizes);
            }
        }

        endDragRef.current = removeListeners;

        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleEnd);
        document.addEventListener('touchmove', handleMove, { passive: false });
        document.addEventListener('touchend', handleEnd);
        document.addEventListener('touchcancel', handleEnd);
    }, [disabled, isHorizontal, isRtl, onSizesChange, resizeAdjacentPanels]);

    // Performance optimized keyboard navigation with multi-panel support
    const handleKeyDown = useCallback((handleIndex: number, event: React.KeyboardEvent) => {
        if (disabled) return;
        const step = event.shiftKey ? 10 : 1;
        const currentSizes = sizesRef.current;

        let delta = 0;
        if (isHorizontal) {
            // In RTL the leading panel sits on the right, so ArrowLeft grows it.
            const forward = isRtl() ? -step : step;
            if (event.key === KEYBOARD_KEYS.ARROW_LEFT) delta = -forward;
            if (event.key === KEYBOARD_KEYS.ARROW_RIGHT) delta = forward;
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
    }, [disabled, getHandleBounds, isHorizontal, isRtl, resizeAdjacentPanels, updateSizes]);

    const contextValue: SplitterContextValue = {
        orientation,
        sizes,
        setSizes: updateSizes,
        getHandleValueAttributes,
        startDrag,
        handleKeyDown,
        isDragging,
        activeHandleIndex,
        rootClass,
        registerPanelConstraints,
        registerPanelId,
        getPanelId,
        disabled
    };

    return (
        <SplitterContext.Provider value={contextValue}>
            <div
                {...props}
                ref={mergedRef}
                className={clsx(rootClass, className)}
                dir={dir}
                data-orientation={orientation}
                data-disabled={disabled ? '' : undefined}
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
