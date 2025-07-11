import React, { PropsWithChildren, useState } from 'react';
import Primitive from '../../Primitive';
import RadioGroupContext from '../context/RadioGroupContext';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import useControllableState from '~/core/hooks/useControllableState';

export type RadioGroupPrimitiveRootProps = PropsWithChildren<{
    className?: string;
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    orientation?: 'horizontal' | 'vertical' | 'both';
    loop?: boolean,
    dir?: 'ltr' | 'rtl';
}>;

const RadioGroupPrimitiveRoot = ({ value, defaultValue = '', onValueChange, children, disabled: groupDisabled = false, required = false, name = '', orientation = 'both', loop = true, dir = 'ltr', className = '', ...props }: RadioGroupPrimitiveRootProps) => {
    const [selectedValue, setSelectedValue] = useControllableState(
        value,
        defaultValue,
        onValueChange
    );

    const sendItems = {
        selectedValue,
        setSelectedValue,
        groupDisabled,
        name
    };

    return (
        <RovingFocusGroup.Root dir={dir} orientation={orientation} loop={loop}>
            <RadioGroupContext.Provider value={sendItems}>
                <RovingFocusGroup.Group>
                    <Primitive.div {...props} aria-required={required} role='radiogroup' aria-disabled={groupDisabled} className={className}>

                        {children}

                    </Primitive.div>
                </RovingFocusGroup.Group>
            </RadioGroupContext.Provider>
        </RovingFocusGroup.Root>
    )
    ;
};

export default RadioGroupPrimitiveRoot;
