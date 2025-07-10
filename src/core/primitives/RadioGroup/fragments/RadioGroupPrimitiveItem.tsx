import React, { PropsWithChildren, useContext } from 'react';
import RadioGroupContext from '../context/RadioGroupContext';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import RadioPrimitive from '~/core/primitives/Radio';

type RadioGroupPrimitiveItemProps = PropsWithChildren<{
    value: string;
    disabled?: boolean
    children?: React.ReactNode;
    required?: boolean
}>;

const RadioGroupPrimitiveItem = ({ value, children, disabled, required = false, ...props }: RadioGroupPrimitiveItemProps) => {
    const context = useContext(RadioGroupContext);
    if (!context) {
        throw new Error('RadioGroup.Item must be used within a RadioGroup.Root');
    }
    const { groupDisabled, name, selectedValue, setSelectedValue } = context;

    return (
        <RovingFocusGroup.Item role='radio'>
            <div {...props} onFocus={() => setSelectedValue(value)}>

                <RadioPrimitive
                    id={value}
                    name={name}
                    value={value}
                    checked = {selectedValue === value}
                    disabled={groupDisabled || disabled}
                    required={required}
                    onChange={() => setSelectedValue(value)}
                />

                <label htmlFor={value}>{children}</label>

            </div>
        </RovingFocusGroup.Item>
    );
};

export default RadioGroupPrimitiveItem;
