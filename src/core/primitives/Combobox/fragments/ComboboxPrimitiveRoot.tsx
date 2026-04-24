'use client';
import React, { useLayoutEffect } from 'react';
import Primitive from '../../Primitive';
import { ComboboxPrimitiveContext } from '../contexts/ComboboxPrimitiveContext';
import useControllableState from '~/core/hooks/useControllableState';
import Floater from '~/core/primitives/Floater';
import { Middleware, Placement, Strategy } from '@floating-ui/react';
import { useIsInsideForm } from '~/core/hooks/useIsInsideFrom';

type Side = 'top' | 'right' | 'bottom' | 'left';
type Align = 'start' | 'center' | 'end';
type CollisionPadding = number | Partial<Record<Side, number>>;
type Boundary = Element | null;

export type ComboboxPrimitiveRootProps = {
    children: React.ReactNode,
    className?: string,
    value?: string,
    defaultValue?: string,
    name?: string,
    align?: Align,
    alignOffset?: number,
    avoidCollisions?: boolean,
    collisionBoundary?: Boundary | Boundary[],
    collisionPadding?: CollisionPadding,
    constrainSize?: boolean,
    enableFlip?: boolean,
    enableShift?: boolean,
    hideWhenDetached?: boolean,
    matchReferenceWidth?: boolean,
    offsetValue?: number,
    onPlaced?: () => void,
    positioningStrategy?: Strategy,
    side?: Side,
    sideOffset?: number,
    sticky?: 'partial' | 'always',
    updatePositionStrategy?: 'optimized' | 'always',
    onValueChange?: (value: string) => void
    onClickOutside?: () => void;
    placement?: Placement
}

function getPlacement(side: Side, align: Align): Placement {
    return align === 'center' ? side : `${side}-${align}` as Placement;
}

const ComboboxPrimitiveRoot = React.forwardRef<
    React.ElementRef<typeof Primitive.div>,
    ComboboxPrimitiveRootProps & React.ComponentPropsWithoutRef<typeof Primitive.div>
>(({
    children,
    className,
    value,
    name,
    defaultValue = '',
    onValueChange,
    onClickOutside = () => {},
    align = 'start',
    alignOffset = 0,
    avoidCollisions = true,
    collisionBoundary = null,
    collisionPadding = 8,
    constrainSize = true,
    enableFlip = true,
    enableShift = true,
    hideWhenDetached = false,
    matchReferenceWidth = false,
    offsetValue,
    onPlaced,
    placement,
    positioningStrategy = 'fixed',
    side = 'bottom',
    sideOffset,
    sticky = 'partial',
    updatePositionStrategy = 'optimized',
    ...props
}, forwardedRef) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = useControllableState(
        value,
        defaultValue,
        onValueChange
    );
    const [selectedLabel, setSelectedLabel] = React.useState(defaultValue);

    const selectedItemRef = React.useRef<any>(null);
    const elementsRef = React.useRef<(HTMLElement | null)[]>([]);
    const labelsRef = React.useRef<(string | null)[]>([]);
    const displayLabelsRef = React.useRef<(string | null)[]>([]);
    const valuesRef = React.useRef<(string | null)[]>([]);
    const displayLabelsByValueRef = React.useRef<Record<string, string>>({});
    const [disabledIndices, setDisabledIndices] = React.useState<number[]>([]);
    const isTypingRef = React.useRef(false);
    const rootRef = React.useRef<HTMLDivElement>(null);
    const virtualItemRef = React.useRef<HTMLElement | null>(null);
    const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
    const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
    const [hasSearch, setHasSearch] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const [labelsVersion, bumpLabelsVersion] = React.useReducer((current) => current + 1, 0);

    const hiddenIndices = React.useMemo(() => {
        if (!search) return [];
        const filtered = [];
        for (let i = 0; i < labelsRef.current.length; i++) {
            const label = labelsRef.current[i];
            if (label && !label.toLowerCase().includes(search.toLowerCase())) {
                filtered.push(i);
            }
        }
        return filtered;
    }, [search, labelsVersion]);

    const totalDisabledIndices = React.useMemo(() => {
        const set = new Set([...disabledIndices, ...hiddenIndices]);
        return Array.from(set).sort((a, b) => a - b);
    }, [disabledIndices, hiddenIndices]);

    const isFormChild = useIsInsideForm(rootRef.current);

    const resolvedPlacement = placement ?? getPlacement(side, align);
    const mainAxisOffset = sideOffset ?? offsetValue ?? 0;
    const boundary = React.useMemo(() => (
        Array.isArray(collisionBoundary) ? collisionBoundary : [collisionBoundary]
    ), [collisionBoundary]);
    const detectOverflowOptions = React.useMemo(() => {
        const filteredBoundary = boundary.filter((item): item is Element => item != null);

        return {
            padding: collisionPadding,
            boundary: filteredBoundary,
            altBoundary: filteredBoundary.length > 0
        };
    }, [boundary, collisionPadding]);

    const middleware = React.useMemo(() => {
        const configuredMiddleware: Array<Middleware | false> = [
            Floater.offset({
                mainAxis: mainAxisOffset,
                alignmentAxis: alignOffset
            }),
            avoidCollisions && enableShift && Floater.shift({
                mainAxis: true,
                crossAxis: false,
                limiter: sticky === 'partial' ? Floater.limitShift() : undefined,
                ...detectOverflowOptions
            }),
            avoidCollisions && enableFlip && Floater.flip(detectOverflowOptions),
            constrainSize && Floater.size({
                ...detectOverflowOptions,
                apply: ({ elements, rects, availableWidth, availableHeight }) => {
                    const floatingStyle = elements.floating.style;
                    floatingStyle.setProperty('--rad-ui-floating-available-width', `${Math.max(0, availableWidth)}px`);
                    floatingStyle.setProperty('--rad-ui-floating-available-height', `${Math.max(0, availableHeight)}px`);
                    floatingStyle.setProperty('--rad-ui-floating-reference-width', `${rects.reference.width}px`);
                    floatingStyle.setProperty('--rad-ui-floating-reference-height', `${rects.reference.height}px`);

                    if (matchReferenceWidth) {
                        floatingStyle.width = `${rects.reference.width}px`;
                    }
                }
            }),
            hideWhenDetached && Floater.hide({
                strategy: 'referenceHidden',
                ...detectOverflowOptions
            })
        ];

        return configuredMiddleware.filter(Boolean) as Middleware[];
    }, [
        alignOffset,
        avoidCollisions,
        constrainSize,
        detectOverflowOptions,
        enableFlip,
        enableShift,
        hideWhenDetached,
        mainAxisOffset,
        matchReferenceWidth,
        sticky
    ]);

    const {
        refs,
        floatingStyles,
        context: floatingContext,
        isPositioned,
        middlewareData,
        update,
        placement: placedPlacement
    } = Floater.useFloating({
        middleware,
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: resolvedPlacement,
        strategy: positioningStrategy,
        whileElementsMounted: (reference, floating, updatePosition) => Floater.autoUpdate(
            reference,
            floating,
            updatePosition,
            { animationFrame: updatePositionStrategy === 'always' }
        )
    });

    useLayoutEffect(() => {
        if (isPositioned) {
            onPlaced?.();
        }
    }, [isPositioned, onPlaced]);

    const click = Floater.useClick(floatingContext);
    const dismiss = Floater.useDismiss(floatingContext);
    const role = Floater.useRole(floatingContext, {
        role: 'listbox'
    });

    function handleTypeaheadMatch(index: number | null) {
        if (index === null || totalDisabledIndices.includes(index)) return;
        if (isOpen) {
            setActiveIndex(index);
        } else {
            handleSelect(index);
        }
    }

    const handleSelect = React.useCallback(
        (index: number | null) => {
            if (index === null || totalDisabledIndices.includes(index)) return;
            setSelectedIndex(index);
            setIsOpen(false);
            (refs.reference.current as HTMLElement | null)?.focus();
            if (index !== null) {
                const item = elementsRef.current[index];
                const value = item?.getAttribute('data-value') || valuesRef.current[index];
                const label = item?.getAttribute('data-label') || displayLabelsRef.current[index] || labelsRef.current[index];
                if (value) {
                    setSelectedValue(value);
                    if (label) {
                        displayLabelsByValueRef.current[value] = label;
                    }
                }
                if (label) {
                    setSelectedLabel(label);
                }
            }
        },
        [totalDisabledIndices, refs, setSelectedValue]
    );

    useLayoutEffect(() => {
        const valueIndex = valuesRef.current.findIndex(itemValue => itemValue === selectedValue);

        if (valueIndex === -1) {
            setSelectedIndex(null);
            setSelectedLabel(displayLabelsByValueRef.current[selectedValue] || selectedValue);
            return;
        }

        setSelectedIndex(valueIndex);
        const label = elementsRef.current[valueIndex]?.getAttribute('data-label') || displayLabelsRef.current[valueIndex] || labelsRef.current[valueIndex] || selectedValue;
        displayLabelsByValueRef.current[selectedValue] = label;
        setSelectedLabel(label);
    }, [labelsVersion, selectedValue]);

    const listNav = Floater.useListNavigation(floatingContext, {
        listRef: elementsRef,
        activeIndex,
        selectedIndex,
        onNavigate: setActiveIndex,
        virtual: hasSearch, // Enable virtual navigation only when search is present
        virtualItemRef,
        disabledIndices: totalDisabledIndices
    });

    const typeahead = Floater.useTypeahead(floatingContext, {
        listRef: labelsRef,
        activeIndex,
        selectedIndex,
        enabled: !hasSearch,
        onMatch: handleTypeaheadMatch,
        onTypingChange(isTyping) {
            isTypingRef.current = isTyping;
        }
    });

    // Merge all the interactions into prop getters
    const { getReferenceProps, getFloatingProps, getItemProps } = Floater.useInteractions([
        click,
        dismiss,
        role,
        listNav,
        typeahead
    ]);

    const values = React.useMemo(() => ({
        isOpen,
        setIsOpen,
        handleSelect,
        floatingContext,
        refs,
        isPositioned,
        updatePosition: update,
        middlewareData,
        placedPlacement,
        getFloatingProps,
        getReferenceProps,
        floatingStyles,
        getItemProps,
        activeIndex,
        selectedIndex,
        elementsRef,
        labelsRef,
        displayLabelsRef,
        valuesRef,
        disabledIndices,
        setDisabledIndices,
        setActiveIndex,
        selectedLabel,
        selectedValue,
        isTypingRef,
        virtualItemRef,
        hasSearch,
        setHasSearch,
        search,
        setSearch,
        hiddenIndices,
        selectedItemRef,
        labelsVersion,
        bumpLabelsVersion
    }), [
        isOpen,
        handleSelect,
        floatingContext,
        refs,
        isPositioned,
        update,
        middlewareData,
        placedPlacement,
        getFloatingProps,
        getReferenceProps,
        floatingStyles,
        getItemProps,
        activeIndex,
        selectedIndex,
        disabledIndices,
        selectedLabel,
        selectedValue,
        hasSearch,
        search,
        hiddenIndices,
        labelsVersion
    ]);

    return (
        <ComboboxPrimitiveContext.Provider value={values}>
            <Primitive.div {...props} className={className} ref={Floater.useMergeRefs([rootRef, forwardedRef])} data-state={isOpen ? 'open' : 'closed'}>

                {children}
                {/* Add hidden native select for form control */}
                {
                    isFormChild && (
                        <select
                            name={name}
                            value={selectedValue}
                            hidden
                            aria-hidden="true"
                            tabIndex={-1}
                            onChange={() => {}}
                        >
                            <option value={selectedValue}>{selectedValue}</option>
                        </select>
                    )
                }
            </Primitive.div>
        </ComboboxPrimitiveContext.Provider>
    );
});

ComboboxPrimitiveRoot.displayName = 'ComboboxPrimitiveRoot';

export default ComboboxPrimitiveRoot;
