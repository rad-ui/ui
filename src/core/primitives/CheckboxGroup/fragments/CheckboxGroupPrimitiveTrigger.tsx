import React from 'react';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import CheckboxGroupPrimitiveContext from '../context/CheckboxGroupPrimitiveContext';
import CheckboxGroupPrimitiveTriggerContext from '../context/CheckboxGroupPrimitiveTriggerContext';

export type CheckboxGroupPrimitiveTriggerProps = {
    value: string;
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    required?: boolean;
} & React.ComponentPropsWithoutRef<'button'>;

const CheckboxGroupPrimitiveTrigger = React.forwardRef<
    HTMLButtonElement,
    CheckboxGroupPrimitiveTriggerProps
>(({ children, className = '', value, required, disabled, checked, onCheckedChange, ...props }, ref) => {
    const { checkedValues, setCheckedValues, name, required: groupRequired, disabled: groupDisabled } = React.useContext(CheckboxGroupPrimitiveContext);

    const isChecked = checkedValues.includes(value);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
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
                    <button
                        ref={ref}
                        role="checkbox"
                        type="button"
                        onClick={handleClick}
                        className={className}
                        aria-checked={isChecked}
                        disabled={disabled || groupDisabled}
                        aria-required={required || groupRequired}
                        {...props}
                    >
                        {children}
                    </button>
                </RovingFocusGroup.Item>
            </CheckboxGroupPrimitiveTriggerContext.Provider>

            <input
                type="checkbox"
                checked={isChecked}
                name={name}
                value={value}
                style={{ display: 'none' }}
                required={required || groupRequired}
                disabled={disabled || groupDisabled}
                readOnly
            />
        </div>
    );
});

CheckboxGroupPrimitiveTrigger.displayName = 'CheckboxGroupPrimitiveTrigger';

export default CheckboxGroupPrimitiveTrigger;
