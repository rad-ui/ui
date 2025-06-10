'use client';
import React, { createContext, useEffect } from 'react';
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
    onValueChange?: (value: string) => void
    onClickOutside?: () => void;
    placement?: Placement
}

function SelectPrimitiveRoot({ children, className, value, name, defaultValue = '', onValueChange, onClickOutside = () => {}, placement = 'bottom-start', offsetValue, ...props }: SelectPrimitiveRootProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
    const [offsetPositionValue, setOffsetPositionValue] = React.useState(offsetValue);
    const selectedItemRef = React.useRef<any>(null);

    const [selectedValue, setSelectedValue] = useControllableState(
        value,
        defaultValue,
        onValueChange
    );

    const rootRef = React.useRef<HTMLDivElement>(null);

    const isFromChild = useIsInsideForm(rootRef.current);
    const handleSelect = (value:string) => {
        setSelectedValue(value);
        setIsOpen(false);
    };

    const { refs, floatingStyles, context: floatingContext } = Floater.useFloating({
        middleware: [Floater.offset(offsetPositionValue)],
        open: isOpen,
        onOpenChange: setIsOpen,
        placement
    });

    //   const click = Floater.useClick(context);
    const dismiss = Floater.useDismiss(floatingContext);
    const role = Floater.useRole(floatingContext, {
        role: 'listbox'
    });

    // Merge all the interactions into prop getters
    const { getReferenceProps, getFloatingProps, getItemProps } = Floater.useInteractions([
    // click,
        dismiss,
        role
    ]);

    useEffect(() => {
        const floatingElement = refs.floating.current;
        if (!floatingElement || !selectedItemRef?.current) return;

        const children = Array.from(floatingElement.children);
        const index = children.indexOf(selectedItemRef.current);
        setSelectedIndex(index);
    }, [refs.floating.current, selectedItemRef]);

    useEffect(() => {
        if (!isOpen || selectedIndex === null) return;

        const floatingElement = refs.floating.current;
        if (!floatingElement) return;

        const position = (selectedIndex + 1) * (floatingElement.clientHeight / floatingElement.children.length);
        setOffsetPositionValue(-position);
    }, [isOpen, selectedIndex, refs.floating]);

    const values = { isOpen, setIsOpen, selectedValue, setSelectedValue, handleSelect, floatingContext, refs, getFloatingProps, getReferenceProps, floatingStyles, getItemProps, selectedItemRef, setOffsetPositionValue };
    return (
        <SelectPrimitiveContext.Provider value={values}>
            <RovingFocusGroup.Root orientation='vertical'>
                <Primitive.div {...props} className={className} ref={rootRef}>

                    {children}
                    {/* Add hidden native select for form control */}
                    {
                        isFromChild && (
                            <select
                                name={name}
                                value={selectedValue}
                                hidden
                                aria-hidden="true"
                                tabIndex={-1}
                            >
                                <option value={selectedValue}>{selectedValue}</option>
                            </select>
                        )
                    }
                </Primitive.div>
            </RovingFocusGroup.Root>
        </SelectPrimitiveContext.Provider>
    );
}

export default SelectPrimitiveRoot;
