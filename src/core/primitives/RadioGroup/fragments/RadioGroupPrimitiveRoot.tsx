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

const RadioGroupPrimitiveRoot = ({ value, defaultValue = '', onValueChange, children, disabled: groupDisabled = false, required = false, name = '', orientation = 'horizontal', loop = true, dir = 'ltr', ...props }: RadioGroupPrimitiveRootProps) => {

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
        <RovingFocusGroup.Root orientation={orientation} loop={loop} dir={dir}>
            <RadioGroupContext.Provider value={sendItems}>
        <RovingFocusGroup.Group>
                <Primitive.div {...props} aria-required={required} role='radiogroup' aria-disabled={groupDisabled}>
                    
                        {children}
                    

                </Primitive.div>
        </RovingFocusGroup.Group>
            </RadioGroupContext.Provider>
        </RovingFocusGroup.Root>
    )
    ;
};

export default RadioGroupPrimitiveRoot;
