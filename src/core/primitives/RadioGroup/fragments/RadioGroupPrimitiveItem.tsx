import React, { PropsWithChildren, useContext } from 'react';
import RadioGroupContext from '../context/RadioGroupContext';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import RadioPrimitive from '~/core/primitives/Radio';
import Primitive from '../../Primitive';

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
        event.target.checked = true;
        setCheckedItem(value);

        if (typeof onChange === 'function') {
            onChange(value);
        }
    };

    return (
        <div {...props}>
            <RovingFocusGroup.Item role='radio'>
                <RadioPrimitive name='radio' value={value} checked={checkedItem === value} onChange={handleOnChange} onFocus={handleOnChange} disabled={groupDisabled || disabled} aria-checked={checkedItem === value} required />

            </RovingFocusGroup.Item>
            <label htmlFor={value}>{children}</label>
        </div>
    );
};

export default RadioGroupPrimitiveItem;
