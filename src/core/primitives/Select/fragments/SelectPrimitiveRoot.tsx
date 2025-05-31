'use client';
import React, { createContext } from 'react';
import Primitive from '../../Primitive';
import { SelectPrimitiveContext } from '../contexts/SelectPrimitiveContext';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import useControllableState from '~/core/hooks/useControllableState';
import Floater from '~/core/primitives/Floater';
import { Placement } from '@floating-ui/react';

export type SelectPrimitiveRootProps = {
    children: React.ReactNode,
    className?: string,
    value?: string,
    defaultValue?: string,
    onValueChange?: (value: string) => void
    onClickOutside?: () => void;
    placement?: Placement
}

function SelectPrimitiveRoot({ children, className, value, defaultValue = '', onValueChange, onClickOutside = () => {}, placement = 'bottom-start', ...props }: SelectPrimitiveRootProps) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = useControllableState(
        value,
        defaultValue,
        onValueChange
    );

    const handleSelect = (value:string) => {
        setSelectedValue(value);
        setIsOpen(false);
    };

    const { refs, floatingStyles, context: floatingContext } = Floater.useFloating({
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

    const values = { isOpen, setIsOpen, selectedValue, setSelectedValue, handleSelect, floatingContext, refs, getFloatingProps, getReferenceProps, floatingStyles, getItemProps };

    return (
        <SelectPrimitiveContext.Provider value={values} >
            <RovingFocusGroup.Root>
                <Primitive.div
                    {...props} className={className}

                >
                    {children}
                </Primitive.div>

            </RovingFocusGroup.Root>
        </SelectPrimitiveContext.Provider>

    );
}

export default SelectPrimitiveRoot;
