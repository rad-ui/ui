'use client';
import React, { useLayoutEffect } from 'react';
import Primitive from '../../Primitive';
import { ComboboxPrimitiveContext } from '../contexts/ComboboxPrimitiveContext';
import useControllableState from '~/core/hooks/useControllableState';
import Floater from '~/core/primitives/Floater';
import { findItemLabel } from '../utils/itemLabels';
import { useRegisterDocumentOverlayOpen } from '~/core/hooks/useRegisterDocumentOverlayOpen';
import { Middleware, Placement, Strategy } from '@floating-ui/react';

type Side = 'top' | 'right' | 'bottom' | 'left';
type Align = 'start' | 'center' | 'end';
type CollisionPadding = number | Partial<Record<Side, number>>;
type Boundary = Element | null;

export type ComboboxPrimitiveRootProps = {
    children: React.ReactNode,
    className?: string,
    /**
     * Allow several selected values. `value` and `defaultValue` become arrays
     * and `onValueChange` receives an array; the listbox stays open on select.
     */
    multiple?: boolean,
    /** The selected value, or an array of values with `multiple`. */
    value?: string | string[],
    /** The initial value, or an array of values with `multiple`. */
    defaultValue?: string | string[],
    /**
     * Called with the new value, or the array of values with `multiple`. The
     * parameter is typed so both `(value: string) => …` and
     * `(value: string[]) => …` handlers, and inline callbacks, type-check.
     */
    onValueChange?: (value: string & string[]) => void,
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
    onClickOutside?: () => void;
    placement?: Placement
    /** Controlled open state. */
    open?: boolean;
    /** Initial open state (uncontrolled). */
    defaultOpen?: boolean;
    /** Called when the listbox opens or closes. */
    onOpenChange?: (open: boolean) => void;
    /** Disables the trigger so the listbox cannot be opened. */
    disabled?: boolean;
    /** Marks the field as required for native form validation. */
    required?: boolean;
};

const EMPTY_VALUES: string[] = [];

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
    defaultValue,
    onValueChange,
    multiple = false,
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
    open,
    defaultOpen = false,
    onOpenChange,
    disabled = false,
    required = false,
    ...props
}, forwardedRef) => {
    // `dir` stays on the root element (it's in props) and is also passed to the
    // portaled content, which does not inherit direction from this tree.
    const dir = props.dir;
    const [isOpenState, setIsOpen] = useControllableState<boolean>(open, defaultOpen, onOpenChange);
    const isOpen = Boolean(isOpenState) && !disabled;
    const idPrefix = React.useId();
    useRegisterDocumentOverlayOpen(isOpen);
    // Both states always exist (hooks can't be conditional); `multiple` picks one.
    const [singleValue, setSingleValue] = useControllableState<string>(
        multiple ? undefined : value as string | undefined,
        multiple ? '' : (defaultValue as string | undefined) ?? '',
        multiple ? undefined : onValueChange as ((value: string) => void) | undefined
    );
    const [multipleValue, setMultipleValue] = useControllableState<string[]>(
        multiple ? value as string[] | undefined : undefined,
        multiple ? (defaultValue as string[] | undefined) ?? EMPTY_VALUES : EMPTY_VALUES,
        multiple ? onValueChange as ((value: string[]) => void) | undefined : undefined
    );
    const selectedValues = multiple ? multipleValue ?? EMPTY_VALUES : EMPTY_VALUES;
    // Single-value code paths (label lookup, scroll-into-view) follow the latest pick.
    const selectedValue = multiple ? selectedValues[selectedValues.length - 1] ?? '' : singleValue;
    const setSelectedValue = setSingleValue;
    // Resolve the label from the element tree so the trigger shows it before the list ever mounts.
    const [selectedLabel, setSelectedLabel] = React.useState(() => (
        selectedValue ? findItemLabel(children, selectedValue) ?? selectedValue : selectedValue
    ));

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

    // Detect a parent <form> after mount; reading `rootRef.current` during render is always null on
    // the first pass and would leave the hidden form control unrendered until some unrelated update.
    const [isFormChild, setIsFormChild] = React.useState(false);
    React.useEffect(() => {
        setIsFormChild(Boolean(rootRef.current?.closest('form')));
    }, []);
    const nativeSelectRef = React.useRef<HTMLSelectElement>(null);
    const defaultValueRef = React.useRef(defaultValue);
    React.useEffect(() => {
        const form = nativeSelectRef.current?.form;
        if (!form) return;
        const handleReset = () => {
            if (multiple) setMultipleValue((defaultValueRef.current as string[] | undefined) ?? EMPTY_VALUES);
            else setSelectedValue((defaultValueRef.current as string | undefined) ?? '');
        };
        form.addEventListener('reset', handleReset);
        return () => form.removeEventListener('reset', handleReset);
    }, [isFormChild, name, setSelectedValue, setMultipleValue, multiple]);

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
                    } else {
                        floatingStyle.removeProperty('width');
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
        onOpenChange: (nextOpen: boolean, _event?: Event, reason?: string) => {
            if (disabled && nextOpen) return;
            setIsOpen(nextOpen);
            // Escape closes the list: put focus back on the trigger now, rather than waiting for the
            // focus manager's queued return (which can lag a frame or more, and leaves force-mounted
            // content holding focus meanwhile). Only when focus is inside the list, so a dismiss
            // from elsewhere never steals focus.
            if (!nextOpen && reason === 'escape-key') {
                const floating = refs.floating.current;
                const active = floating?.ownerDocument.activeElement;
                if (floating && active && floating.contains(active)) {
                    (refs.reference.current as HTMLElement | null)?.focus();
                }
            }
        },
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
        } else if (!multiple) {
            // Typing on a closed multi-select would toggle values unseen, so it only selects for single.
            handleSelect(index);
        }
    }

    const handleSelect = React.useCallback(
        (index: number | null) => {
            if (index === null || totalDisabledIndices.includes(index)) return;
            if (multiple) {
                // Toggle and stay open so several values can be picked in a row.
                const item = elementsRef.current[index];
                const value = item?.getAttribute('data-value') || valuesRef.current[index];
                if (!value) return;
                const label = item?.getAttribute('data-label') || displayLabelsRef.current[index] || labelsRef.current[index];
                if (label) displayLabelsByValueRef.current[value] = label;
                setSelectedIndex(index);
                setMultipleValue((current) => {
                    const values = current ?? EMPTY_VALUES;
                    return values.includes(value) ? values.filter((entry) => entry !== value) : [...values, value];
                });
                return;
            }
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
        [totalDisabledIndices, refs, setSelectedValue, setIsOpen, multiple, setMultipleValue]
    );

    // Labels for every selected value, for the trigger and chips.
    const selectedLabels = React.useMemo(() => selectedValues.map((entry) => {
        const index = valuesRef.current.findIndex((itemValue) => itemValue === entry);
        return (index !== -1 ? elementsRef.current[index]?.getAttribute('data-label') || displayLabelsRef.current[index] || labelsRef.current[index] : null)
            || displayLabelsByValueRef.current[entry]
            || findItemLabel(children, entry)
            || entry;
    }), [selectedValues, labelsVersion, children]);

    const removeValue = React.useCallback((entry: string) => {
        setMultipleValue((current) => (current ?? EMPTY_VALUES).filter((item) => item !== entry));
    }, [setMultipleValue]);

    useLayoutEffect(() => {
        const valueIndex = valuesRef.current.findIndex(itemValue => itemValue === selectedValue);

        if (valueIndex === -1) {
            setSelectedIndex(null);
            setSelectedLabel(
                displayLabelsByValueRef.current[selectedValue]
                || (selectedValue ? findItemLabel(children, selectedValue) : null)
                || selectedValue
            );
            return;
        }

        setSelectedIndex(valueIndex);
        const label = elementsRef.current[valueIndex]?.getAttribute('data-label') || displayLabelsRef.current[valueIndex] || labelsRef.current[valueIndex] || selectedValue;
        displayLabelsByValueRef.current[selectedValue] = label;
        setSelectedLabel(label);
    }, [labelsVersion, selectedValue, children]);

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
        bumpLabelsVersion,
        idPrefix,
        disabled,
        dir,
        multiple,
        selectedValues,
        selectedLabels,
        removeValue
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
        labelsVersion,
        idPrefix,
        disabled,
        setIsOpen,
        dir,
        multiple,
        selectedValues,
        selectedLabels,
        removeValue
    ]);

    return (
        <ComboboxPrimitiveContext.Provider value={values}>
            <Primitive.div
                {...props}
                className={className}
                ref={Floater.useMergeRefs([rootRef, forwardedRef])}
                data-state={isOpen ? 'open' : 'closed'}
                data-disabled={disabled ? '' : undefined}
            >

                {children}
                {/* Native select mirrors the value for form submission, validation, and reset. */}
                {
                    (isFormChild || Boolean(name)) && (
                        <select
                            ref={nativeSelectRef}
                            name={name}
                            multiple={multiple || undefined}
                            value={multiple ? selectedValues : selectedValue}
                            required={required}
                            disabled={disabled}
                            aria-hidden="true"
                            tabIndex={-1}
                            onChange={() => {}}
                            // When native validation focuses this control, hand focus to the trigger.
                            onFocus={() => (refs.reference.current as HTMLElement | null)?.focus()}
                            style={{
                                position: 'absolute',
                                width: 1,
                                height: 1,
                                margin: 0,
                                padding: 0,
                                border: 0,
                                opacity: 0,
                                pointerEvents: 'none',
                                overflow: 'hidden'
                            }}
                        >
                            {multiple
                                ? selectedValues.map((entry) => <option key={entry} value={entry}>{entry}</option>)
                                : <option value={selectedValue}>{selectedValue}</option>}
                        </select>
                    )
                }
            </Primitive.div>
        </ComboboxPrimitiveContext.Provider>
    );
});

ComboboxPrimitiveRoot.displayName = 'ComboboxPrimitiveRoot';

export default ComboboxPrimitiveRoot;
