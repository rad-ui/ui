'use client';
import React, { useLayoutEffect } from 'react';
import Primitive from '../../Primitive';
import { SelectPrimitiveContext } from '../contexts/SelectPrimitiveContext';
import useControllableState from '~/core/hooks/useControllableState';
import Floater from '~/core/primitives/Floater';
import { Placement } from '@floating-ui/react';
import { useIsInsideForm } from '~/core/hooks/useIsInsideFrom';

export type SelectPrimitiveRootProps = {
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

function SelectPrimitiveRoot({ children, className, value, name, defaultValue = '', onValueChange, onClickOutside = () => {}, placement = 'bottom-start', offsetValue, shift = true, ...props }: SelectPrimitiveRootProps) {
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
    const isTypingRef = React.useRef(false);
    const rootRef = React.useRef<HTMLDivElement>(null);
    const virtualItemRef = React.useRef<HTMLElement | null>(null);
    const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
    const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
    const [hasSearch, setHasSearch] = React.useState(false);

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
        if (isOpen) {
            setActiveIndex(index);
        } else {
            handleSelect(index);
        }
    }

    const handleSelect = React.useCallback((index: number | null) => {
        setSelectedIndex(index);
        setIsOpen(false);
        if (index !== null) {
            const label = labelsRef.current[index];
            if (label) {
                setSelectedLabel(label);
            }
        }
    }, []);

    const listNav = Floater.useListNavigation(floatingContext, {
        listRef: elementsRef,
        activeIndex,
        selectedIndex,
        onNavigate: setActiveIndex,
        virtual: hasSearch, // Enable virtual navigation only when search is present
        virtualItemRef
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

    const values = {
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
        setActiveIndex,
        selectedLabel,
        isTypingRef,
        virtualItemRef,
        hasSearch,
        setHasSearch,
        selectedItemRef
    };
    return (
        <SelectPrimitiveContext.Provider value={values}>
            <Primitive.div {...props} className={className} ref={rootRef}>

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
                        >
                            <option value={selectedLabel}>{selectedLabel}</option>
                        </select>
                    )
                }
            </Primitive.div>
        </SelectPrimitiveContext.Provider>
    );
}

export default SelectPrimitiveRoot;
