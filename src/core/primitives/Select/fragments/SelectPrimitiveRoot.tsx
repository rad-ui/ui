'use client';
import React, { useEffect, useLayoutEffect } from 'react';
import Primitive from '../../Primitive';
import { SelectPrimitiveContext } from '../contexts/SelectPrimitiveContext';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
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
    const [selectedItemRef, setSelectedItemRef] = React.useState<any>(null);
const [selectedLabel, setSelectedLabel] = React.useState<string | null>(null);

    const [selectedValue, setSelectedValue] = useControllableState(
        value,
        defaultValue,
        onValueChange
    );

    const rootRef = React.useRef<HTMLDivElement>(null);

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

    // new roving focus thing with floating
    const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
    const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
    

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
            setSelectedLabel(labelsRef.current[index]);
        }
    }, []);

    const elementsRef = React.useRef([]);
    const labelsRef = React.useRef([]);
    const isTypingRef = React.useRef(false);

    const listNav = Floater.useListNavigation(floatingContext, {
        listRef: elementsRef,
        activeIndex,
        selectedIndex,
        onNavigate: setActiveIndex
    });

   

    const typeahead = Floater.useTypeahead(floatingContext, {
        listRef: labelsRef,
        activeIndex,
        selectedIndex,
        onMatch: handleTypeaheadMatch,
         onTypingChange(isTyping) {
      isTypingRef.current = isTyping;
    },
    });

    // it ends here all other things are the same

    // Merge all the interactions into prop getters
    const { getReferenceProps, getFloatingProps, getItemProps } = Floater.useInteractions([
        click,
        dismiss,
        role,
        listNav,
        typeahead
    ]);

         
    useEffect(() => {
        if (!selectedIndex) return;
        const selectedItemRef = labelsRef.current[selectedIndex];
        setSelectedItemRef(selectedItemRef);
    },[selectedIndex])

    useLayoutEffect(() => {
        if (!shift) return;
        if (!selectedIndex) return;
    
        if (!selectedItemRef) return;
        if (refs.floating.current && selectedItemRef.current) {
            const rectA = refs.floating.current.getBoundingClientRect();
            const rectB = selectedItemRef.current.getBoundingClientRect();

            const relativeTop = rectA.top - rectB.bottom;
            setOffsetPositionValue(relativeTop);
            console.log(relativeTop)
        }
        
    }, [refs.floating.current, selectedIndex, shift, isOpen]);

    const values = { 
        isOpen, 
        setIsOpen, 
        selectedValue, 
        setSelectedValue, 
        handleSelect, 
        floatingContext, 
        refs, 
        getFloatingProps, 
        getReferenceProps, 
        floatingStyles, 
        getItemProps, 
        selectedItemRef, 
        activeIndex, 
        selectedIndex, 
        elementsRef, 
        labelsRef,
        setActiveIndex,  
        selectedLabel,
        isTypingRef             
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
