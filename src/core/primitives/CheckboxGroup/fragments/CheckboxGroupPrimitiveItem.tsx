import React from 'react';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import CheckboxGroupPrimitiveContext from '../context/CheckboxGroupPrimitiveContext';

export type CheckboxGroupPrimitiveItemProps = {
    children?: React.ReactNode
    value: string
    className?: string
    required?: boolean
    disabled?: boolean
}
const CheckboxGroupPrimitiveItem = ({ children, className = '', value, required, disabled }: CheckboxGroupPrimitiveItemProps) => {
    const { checkedValues, setCheckedValues, name, required: groupRequired, disabled: groupDisabled } = React.useContext(CheckboxGroupPrimitiveContext);

    const checked = checkedValues.includes(value);

    const handleClick = () => {
        if (checked) {
            setCheckedValues(checkedValues.filter((v) => v !== value));
        } else {
            setCheckedValues([...checkedValues, value]);
        }
    };
    return (
        <div>
            <RovingFocusGroup.Item>

                <button role="checkbox" type="button" onClick={handleClick} className={className} aria-checked={checked} disabled={disabled || groupDisabled} aria-required={required || groupRequired}>
                    {checked && children}
                </button>

            </RovingFocusGroup.Item>

            <input type="checkbox" checked={checked} name={name} value={value} style={{ display: 'none' }} required={required || groupRequired} disabled={disabled || groupDisabled}/>

        </div>
    );
};

export default CheckboxGroupPrimitiveItem;
