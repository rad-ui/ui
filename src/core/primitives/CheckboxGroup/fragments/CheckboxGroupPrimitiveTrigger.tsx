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

    const [isChecked, setIsChecked] = useControllableState(
        checked,
        false,
        onCheckedChange
    );

    React.useEffect(() => {
        setIsChecked(checkedValues.includes(value));
    }, []);

    React.useEffect(() => {
        if (isChecked) {
            setCheckedValues(checkedValues.filter((v) => v !== value));
        } else {
            setCheckedValues([...checkedValues, value]);
        }
    }, [isChecked]);

    return (
        <div>
            <CheckboxGroupPrimitiveTriggerContext.Provider value={{ isChecked }}>
                <RovingFocusGroup.Item>

                    <button role="checkbox" type="button" onClick={() => setIsChecked(!isChecked)} className={className} aria-checked={isChecked} disabled={disabled || groupDisabled} aria-required={required || groupRequired}>
                        {children}
                    </button>

                </RovingFocusGroup.Item>
            </CheckboxGroupPrimitiveTriggerContext.Provider>

            <input type="checkbox" checked={isChecked} name={name} value={value} style={{ display: 'none' }} required={required || groupRequired} disabled={disabled || groupDisabled} onChange={() => {}} readOnly/>

        </div>
    );
};

export default CheckboxGroupPrimitiveTrigger;
