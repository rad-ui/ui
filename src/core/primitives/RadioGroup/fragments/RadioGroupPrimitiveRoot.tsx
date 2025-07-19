import React, { PropsWithChildren, useState } from 'react';
import Primitive from '../../Primitive';
import RadioGroupContext from '../context/RadioGroupContext';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import useControllableState from '~/core/hooks/useControllableState';

type RadioGroupPrimitiveRootProps = PropsWithChildren<{
    className?: string;
    customRootClass?: string;
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

const RadioGroupPrimitiveRoot = ({ value, defaultValue = '', onValueChange, children, disabled: groupDisabled = false, required = false, name = '', orientation = 'horizontal', loop = false, dir = 'ltr', ...props }: RadioGroupPrimitiveRootProps) => {
    const [selectedValue, setSelectedValue] = useControllableState(
        value,
        defaultValue,
        onValueChange
    );

    const sendItems = {
        selectedValue,
        setSelectedValue,
        groupDisabled,
    };

    return (
        <Primitive.div {...props} aria-required={required} role='radiogroup' aria-disabled={groupDisabled}>
            <RovingFocusGroup.Root>
                <RadioGroupContext.Provider value={sendItems}>
                    <RovingFocusGroup.Group>

                        {children}

                    </RovingFocusGroup.Group>
                </RadioGroupContext.Provider>
            </RovingFocusGroup.Root>
            <input type='radio' hidden name={name} value={selectedValue} disabled={groupDisabled} required={required}/>
        </Primitive.div>
    )
    ;
};

export default RadioGroupPrimitiveRoot;
