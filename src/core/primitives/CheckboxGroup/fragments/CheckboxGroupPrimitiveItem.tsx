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
    const { checkedValues, setCheckedValues, name } = React.useContext(CheckboxGroupPrimitiveContext);

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
            <RovingFocusGroup.Item role='checkbox'>

                <button onClick={handleClick} className={className} aria-checked={checked} disabled={disabled} aria-required={required}>
                    {checked && children}
                </button>

            </RovingFocusGroup.Item>
            <input type="checkbox" checked={checked} name={name} value={value} style={{ display: 'none' }} required={required} disabled={disabled}/>
        </div>
    );
};

export default CheckboxGroupPrimitiveItem;
