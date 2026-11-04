'use client';
import React, { forwardRef, ElementRef, ComponentPropsWithoutRef, useRef, useCallback } from 'react';
import clsx from 'clsx';

import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import { SliderContext } from '../context/SliderContext';
import useControllableState from '~/core/hooks/useControllableState';
import useLayoutEffect from '~/core/hooks/useLayoutEffect';
import { useDirection } from '~/core/hooks/useDirection';
import { clampValue, moveThumb, snapToStep, ThumbCollisionBehavior } from '../utils/sliderMath';

const COMPONENT_NAME = 'Slider';

export type SliderRootElement = ElementRef<'div'>;
export type SliderRootProps = {
    children: React.ReactNode;
    className?: string;
    customRootClass?: string;
    defaultValue?: number | number[];
    value?: number | number[];
    onValueChange?: (value: number | number[]) => void;
    onValueCommit?: (value: number | number[]) => void;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    name?: string;
    orientation?: 'horizontal' | 'vertical';
    /** `center` (default) lets a thumb's centre reach the track ends; `edge` keeps the whole thumb inside the track. */
    thumbAlignment?: 'center' | 'edge';
    pageStepMultiplier?: number;
    /** In a range slider, the smallest number of steps kept between neighbouring thumbs. */
    minStepsBetweenValues?: number;
    showStepMarks?: boolean;
    formatValue?: (value: number) => string;
    /** Number format for the value text (screen readers, `Slider.Value`), when there's no `formatValue`. */
    format?: Intl.NumberFormatOptions;
    /** Locale for `format`. */
    locale?: Intl.LocalesArgument;
    /** Step for Page Up / Page Down and Shift + arrows. Same as `step * pageStepMultiplier`. */
    largeStep?: number;
    /**
     * When a dragged or keyed thumb meets another: `none` stops at it, `push` moves it along,
     * `swap` passes it. Defaults to `none`.
     */
    thumbCollisionBehavior?: ThumbCollisionBehavior;
    /** `id` of a `<form>` elsewhere in the page that the value submits with. */
    form?: string;
} & Omit<ComponentPropsWithoutRef<'div'>, 'value' | 'defaultValue' | 'onValueChange'>;

const SliderRoot = forwardRef<SliderRootElement, SliderRootProps>(({
    children,
    className = '',
    customRootClass = '',
    defaultValue,
    value: valueProp,
    onValueChange,
    onValueCommit,
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    name,
    orientation = 'horizontal',
    thumbAlignment = 'center',
    pageStepMultiplier = 10,
    minStepsBetweenValues = 0,
    showStepMarks = false,
    formatValue: formatValueProp,
    format,
    locale,
    largeStep,
    thumbCollisionBehavior = 'none',
    form,
    onPointerDown,
    ...props
}, ref) => {
    const formatKey = JSON.stringify(format ?? null) + String(locale ?? '');
    const formatValue = React.useMemo(() => {
        if (formatValueProp) return formatValueProp;
        if (!format && !locale) return undefined;
        const formatter = new Intl.NumberFormat(locale as string | string[] | undefined, format);
        return (value: number) => formatter.format(value);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formatValueProp, formatKey]);
    const effectivePageStepMultiplier = largeStep !== undefined && step > 0 ? largeStep / step : pageStepMultiplier;
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);

    const [value, setValue] = useControllableState<number | number[]>(
        valueProp,
        defaultValue ?? (Array.isArray(valueProp) ? valueProp : 0),
        onValueChange
    );
    const [isDragging, setDragging] = React.useState(false);
    const activeThumbIndexRef = React.useRef<number | null>(null);
    const internalRef = React.useRef<HTMLDivElement>(null);
    const thumbRefsArray = useRef<Array<React.RefObject<HTMLDivElement>>>([]);
    
    const mergedRef = React.useMemo(() => {
        return (node: HTMLDivElement | null) => {
            (internalRef as any).current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) (ref as any).current = node;
        };
    }, [ref]);

    // Follow the resolved CSS direction (a dir attribute anywhere above, or CSS), so the
    // thumb, range, marks and pointer all mirror together in right-to-left layouts.
    const [cssIsRtl, setIsRtl] = React.useState(false);
    const contextDir = useDirection();
    const isRtl = contextDir ? contextDir === 'rtl' : cssIsRtl;
    useLayoutEffect(() => {
        const node = internalRef.current;
        if (!node || typeof window === 'undefined') return;
        const next = window.getComputedStyle(node).direction === 'rtl';
        if (next !== cssIsRtl) setIsRtl(next);
    });

    const clamp = (val: number) => clampValue(val, min, max);

    // Latest value, readable synchronously from document-level pointer listeners.
    const latestValueRef = React.useRef(value);
    latestValueRef.current = value;

    const updateValue = useCallback((next: number | number[]) => {
        latestValueRef.current = next;
        setValue(next);
    }, [setValue]);

    const commitValue = useCallback((next?: number | number[]) => {
        onValueCommit?.(next === undefined ? latestValueRef.current : next);
    }, [onValueCommit]);

    // Callback to register thumb refs
    const registerThumbRef = useCallback((index: number, thumbRef: React.RefObject<HTMLDivElement>) => {
        thumbRefsArray.current[index] = thumbRef;
    }, []);

    const getValueFromPointer = (e: React.PointerEvent<HTMLDivElement> | PointerEvent): number | null => {
        const rootElement = internalRef.current;
        if (!rootElement) return null;

        const rect = rootElement.getBoundingClientRect();
        const fullSize = orientation === 'vertical' ? rect.height : rect.width;
        // With edge alignment a thumb's centre only travels between half a thumb from each end.
        const thumbNode = thumbRefsArray.current[0]?.current;
        const inset = thumbAlignment === 'edge' && thumbNode
            ? (orientation === 'vertical' ? thumbNode.offsetHeight : thumbNode.offsetWidth) / 2
            : 0;
        const size = fullSize - inset * 2;
        if (!size || size <= 0) return null;

        const relative = orientation === 'vertical'
            ? (rect.bottom - inset - e.clientY) / size
            : isRtl
                ? (rect.right - inset - e.clientX) / size
                : (e.clientX - rect.left - inset) / size;

        const rawValue = min + clampValue(relative, 0, 1) * (max - min);
        return clamp(snapToStep(rawValue, step, min));
    };

    const setFromPosition = (e: React.PointerEvent<HTMLDivElement> | PointerEvent) => {
        const newValue = getValueFromPointer(e);
        if (newValue === null) return;
        const current = latestValueRef.current;

        if (Array.isArray(current)) {
            if (current.length === 0) return;
            let indexToUpdate = activeThumbIndexRef.current;

            // If no active thumb (e.g. click on track), pick the nearest one. When
            // several thumbs are equally close (stacked), pick by direction so the
            // thumb can actually move.
            if (indexToUpdate === null) {
                let best = 0;
                let bestDistance = Infinity;
                current.forEach((thumbValue, index) => {
                    const distance = Math.abs(thumbValue - newValue);
                    if (distance < bestDistance || (distance === bestDistance && newValue > thumbValue)) {
                        best = index;
                        bestDistance = distance;
                    }
                });
                // Pointer is exactly on stacked thumbs: wait for movement to pick one.
                if (bestDistance === 0 && current.filter((thumbValue) => thumbValue === newValue).length > 1) {
                    return;
                }
                indexToUpdate = best;
                activeThumbIndexRef.current = indexToUpdate;
                thumbRefsArray.current[indexToUpdate]?.current?.focus();
            }

            // Neighbours stop, get pushed along, or swap places, per thumbCollisionBehavior.
            const moved = moveThumb(current, indexToUpdate, newValue, min, max, minStepsBetweenValues * step, thumbCollisionBehavior);
            if (moved.values.every((entry, i) => entry === current[i])) return;
            if (moved.index !== indexToUpdate) {
                activeThumbIndexRef.current = moved.index;
                thumbRefsArray.current[moved.index]?.current?.focus();
            }
            updateValue(moved.values);
        } else if (newValue !== current) {
            updateValue(newValue);
        }
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        onPointerDown?.(e);
        if (disabled || e.defaultPrevented || e.button > 0) return;
        e.stopPropagation();

        // Check if we pressed a thumb (thumbs are registered by ref).
        const target = e.target as Node;
        const pressedThumbIndex = thumbRefsArray.current.findIndex((thumbRef) => {
            const node = thumbRef?.current;
            return !!node && (node === target || node.contains(target));
        });

        const currentValue = latestValueRef.current;
        const pressedThumbIsStacked = pressedThumbIndex !== -1 && Array.isArray(currentValue) &&
            currentValue.some((thumbValue, index) => index !== pressedThumbIndex && thumbValue === currentValue[pressedThumbIndex]);

        if (pressedThumbIndex !== -1 && Array.isArray(currentValue) && !pressedThumbIsStacked) {
            activeThumbIndexRef.current = pressedThumbIndex;
            thumbRefsArray.current[pressedThumbIndex]?.current?.focus();
        } else {
            // Track press, or a press on stacked thumbs: the thumb is chosen by
            // proximity/direction in setFromPosition.
            activeThumbIndexRef.current = null;
            if (!Array.isArray(currentValue)) {
                thumbRefsArray.current[0]?.current?.focus();
            }
        }

        setDragging(true);
        setFromPosition(e);

        const handleGlobalPointerMove = (event: PointerEvent) => {
            event.preventDefault();
            setFromPosition(event);
        };

        const handleGlobalPointerUp = () => {
            setDragging(false);
            activeThumbIndexRef.current = null;
            document.removeEventListener('pointermove', handleGlobalPointerMove);
            document.removeEventListener('pointerup', handleGlobalPointerUp);
            document.removeEventListener('pointercancel', handleGlobalPointerUp);
            commitValue();
        };

        document.addEventListener('pointermove', handleGlobalPointerMove);
        document.addEventListener('pointerup', handleGlobalPointerUp);
        document.addEventListener('pointercancel', handleGlobalPointerUp);
    };

    const contextValues = {
        rootClass,
        value,
        setValue: updateValue,
        commitValue,
        minValue: min,
        maxValue: max,
        step,
        name,
        isDragging,
        setDragging,
        disabled,
        orientation,
        isRtl,
        thumbAlignment,
        pageStepMultiplier: effectivePageStepMultiplier,
        thumbCollisionBehavior,
        form,
        focusThumb: (index: number) => thumbRefsArray.current[index]?.current?.focus(),
        minStepsBetweenValues,
        showStepMarks,
        formatValue,
        rootRef: internalRef,
        thumbRefs: thumbRefsArray.current,
        registerThumbRef
    };

    return (
        <SliderContext.Provider value={contextValues}>
            <div
                ref={mergedRef}
                className={clsx(rootClass, className)}
                data-slider-root={rootClass}
                data-disabled={disabled}
                data-orientation={orientation}
                {...props}
                onPointerDown={handlePointerDown}
            >
                {children}
            </div>
        </SliderContext.Provider>
    );
});

SliderRoot.displayName = COMPONENT_NAME;

export default SliderRoot;
