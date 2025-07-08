import React, { PropsWithChildren, useContext } from 'react';
import RadioGroupContext from '../context/RadioGroupContext';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import RadioPrimitive from '~/core/primitives/Radio';

type RadioGroupPrimitiveItemProps = PropsWithChildren<{
    value: string;
    disabled?: boolean
}>;

const RadioGroupPrimitiveItem = ({ value, children, disabled, ...props }: RadioGroupPrimitiveItemProps) => {
    const context = useContext(RadioGroupContext);
    if (!context) {
        throw new Error('RadioGroup.Item must be used within a RadioGroup.Root');
    }
    const { setCheckedItem, checkedItem, onChange, groupDisabled, name } = context;

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckedItem(value);

        if (typeof onChange === 'function') {
            onChange(value);
        }
    };

    return (
        <div {...props}>
        {/*  <RovingFocusGroup.Item {...props} role='radio'> */}
            <RadioPrimitive name='radio' value={value} checked={checkedItem === value} onChange={handleOnChange} disabled={groupDisabled || disabled} required/>
            <label htmlFor={value}>{children}</label>
        {/* </RovingFocusGroup.Item> */}
        </div>
    );
};

export default RadioGroupPrimitiveItem;
