import React, { PropsWithChildren, useContext } from 'react';
import RadioGroupContext from '../context/RadioGroupContext';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import RadioGroupPrimitiveItemContext from '../context/RadioGroupPrimitiveItemContext';
import ButtonPrimitive from '~/core/primitives/Button';

export type RadioGroupPrimitiveItemProps = PropsWithChildren<{
    value: string;
    disabled?: boolean
    children?: React.ReactNode;
    required?: boolean
    className?: string
    asChild?: boolean
}>;

const RadioGroupPrimitiveItem = ({ value, children, disabled, required = false, className = '', asChild = false, ...props }: RadioGroupPrimitiveItemProps) => {
    const context = useContext(RadioGroupContext);
    if (!context) {
        throw new Error('RadioGroup.Item must be used within a RadioGroup.Root');
    }
    const { groupDisabled, selectedValue, setSelectedValue } = context;

    const itemSelected = value === selectedValue;
    return (

        <RovingFocusGroup.Item >
            <ButtonPrimitive
                role="radio"
                type="button"
                disabled={groupDisabled || disabled}
                onClick={() => setSelectedValue(value)}
                onFocus={() => setSelectedValue(value)}
                aria-disabled={groupDisabled || disabled}
                aria-checked={value === selectedValue}
                data-checked={value === selectedValue}
                aria-required={required}
                asChild={asChild}
                className={className}
                {...props}
            >
                <RadioGroupPrimitiveItemContext.Provider value={{ itemSelected }}>
                    {children}
                </RadioGroupPrimitiveItemContext.Provider>
            </ButtonPrimitive>
        </RovingFocusGroup.Item>

    );
};

export default RadioGroupPrimitiveItem;
