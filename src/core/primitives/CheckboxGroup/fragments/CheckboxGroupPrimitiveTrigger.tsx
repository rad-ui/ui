import React from 'react';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import CheckboxGroupPrimitiveContext from '../context/CheckboxGroupPrimitiveContext';
import CheckboxGroupPrimitiveTriggerContext from '../context/CheckboxGroupPrimitiveTriggerContext';
import useControllableState from '~/core/hooks/useControllableState';

export type CheckboxGroupPrimitiveTriggerProps = {
    children?: React.ReactNode
    value: string
    className?: string
    required?: boolean
    disabled?: boolean
    checked?: boolean
    onCheckedChange?: (checked: boolean) => void
}
const CheckboxGroupPrimitiveTrigger = ({ children, className = '', value, required, disabled, checked, onCheckedChange }: CheckboxGroupPrimitiveTriggerProps) => {
    const { checkedValues, setCheckedValues, name, required: groupRequired, disabled: groupDisabled } = React.useContext(CheckboxGroupPrimitiveContext);

    const isChecked = checkedValues.includes(value);

    const handleClick = (event : React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        if (checkedValues.includes(value)) {
            setCheckedValues(checkedValues.filter((v) => v !== value));
        } else if (!checkedValues.includes(value)) {
            setCheckedValues([...checkedValues, value]);
        }
    };

    return (
        <div>
            <CheckboxGroupPrimitiveTriggerContext.Provider value={{ isChecked }}>
                <RovingFocusGroup.Item>

                    <button role="checkbox" type="button" onClick={handleClick} className={className} aria-checked={isChecked} disabled={disabled || groupDisabled} aria-required={required || groupRequired}>
                        {children}
                    </button>

                </RovingFocusGroup.Item>
            </CheckboxGroupPrimitiveTriggerContext.Provider>

            <input type="checkbox" checked={isChecked} name={name} value={value} style={{ display: 'none' }} required={required || groupRequired} disabled={disabled || groupDisabled} onChange={() => {}} readOnly/>

        </div>
    );
};

export default CheckboxGroupPrimitiveTrigger;
