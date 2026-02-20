'use client';
import React, { useLayoutEffect } from 'react';
import Primitive from '../../Primitive';
import { ComboboxPrimitiveContext } from '../contexts/ComboboxPrimitiveContext';
import useControllableState from '~/core/hooks/useControllableState';
import Floater from '~/core/primitives/Floater';
import { Placement } from '@floating-ui/react';
import { useIsInsideForm } from '~/core/hooks/useIsInsideFrom';

export type ComboboxPrimitiveRootProps = {
    children: React.ReactNode,
    className?: string,
    value?: string,
    defaultValue?: string,
    name?: string,
    offsetValue?: number,
    shift?: boolean,
    onValueChange?: (value: string) => void
    onClickOutside?: () => void;
    placement?: Placement
}

const ComboboxPrimitiveRoot = React.forwardRef<
    React.ElementRef<typeof Primitive.div>,
    ComboboxPrimitiveRootProps & React.ComponentPropsWithoutRef<typeof Primitive.div>
>(({ children, className, value, name, defaultValue = '', onValueChange, onClickOutside = () => {}, placement = 'bottom-start', offsetValue, shift = true, ...props }, forwardedRef) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [offsetPositionValue, setOffsetPositionValue] = React.useState(offsetValue);
    const [selectedLabel, setSelectedLabel] = useControllableState(
        value,
        defaultValue,
        onValueChange
    );

    const selectedItemRef = React.useRef<any>(null);
    const elementsRef = React.useRef<(HTMLElement | null)[]>([]);
    const labelsRef = React.useRef<(string | null)[]>([]);
    const valuesRef = React.useRef<(string | null)[]>([]);
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

    const { refs, floatingStyles, context: floatingContext } = Floater.useFloating({
        middleware: [Floater.offset(offsetPositionValue)],
        open: isOpen,
        onOpenChange: setIsOpen,
        placement
    });

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
                const label = labelsRef.current[index];
                if (label) {
                    setSelectedLabel(label);
                }
            }
        },
        [totalDisabledIndices, labelsRef, setSelectedIndex, setIsOpen, setSelectedLabel, refs]
    );

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

    useLayoutEffect(() => {
        if (!shift) return;
        if (!selectedItemRef) return;
        if (refs.floating.current && selectedItemRef.current) {
            const rectA = refs.floating.current.getBoundingClientRect();
            const rectB = selectedItemRef.current.getBoundingClientRect();

            const relativeTop = rectA.top - rectB.bottom;
            setOffsetPositionValue(relativeTop);
        }
    }, [selectedItemRef.current, shift]);

    const values = React.useMemo(() => ({
        isOpen,
        setIsOpen,
        handleSelect,
        floatingContext,
        refs,
        getFloatingProps,
        getReferenceProps,
        floatingStyles,
        getItemProps,
        activeIndex,
        selectedIndex,
        elementsRef,
        labelsRef,
        valuesRef,
        disabledIndices,
        setDisabledIndices,
        setActiveIndex,
        selectedLabel,
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
        getFloatingProps,
        getReferenceProps,
        floatingStyles,
        getItemProps,
        activeIndex,
        selectedIndex,
        disabledIndices,
        selectedLabel,
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
                            value={selectedLabel}
                            hidden
                            aria-hidden="true"
                            tabIndex={-1}
                            onChange={() => {}}
                        >
                            <option value={selectedLabel}>{selectedLabel}</option>
                        </select>
                    )
                }
            </Primitive.div>
        </ComboboxPrimitiveContext.Provider>
    );
});

ComboboxPrimitiveRoot.displayName = 'ComboboxPrimitiveRoot';

export default ComboboxPrimitiveRoot;
