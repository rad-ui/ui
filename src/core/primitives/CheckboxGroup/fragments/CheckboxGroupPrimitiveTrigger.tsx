import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import CheckboxGroupPrimitiveContext from '../context/CheckboxGroupPrimitiveContext';
import CheckboxGroupPrimitiveTriggerContext from '../context/CheckboxGroupPrimitiveTriggerContext';

export type CheckboxGroupPrimitiveTriggerElement = ElementRef<'button'>;
export type CheckboxGroupPrimitiveTriggerProps = {
    value: string;
    required?: boolean;
    disabled?: boolean;
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
} & ComponentPropsWithoutRef<'button'>;

const CheckboxGroupPrimitiveTrigger = forwardRef<CheckboxGroupPrimitiveTriggerElement, CheckboxGroupPrimitiveTriggerProps>(({ children, className = '', value, required, disabled, checked, onCheckedChange, onClick, ...props }, ref) => {
    const { checkedValues, setCheckedValues, name, required: groupRequired, disabled: groupDisabled } = React.useContext(CheckboxGroupPrimitiveContext);

    const isChecked = checkedValues.includes(value);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        event.preventDefault();
        event.stopPropagation();
        if (checkedValues.includes(value)) {
            setCheckedValues(checkedValues.filter((v) => v !== value));
            onCheckedChange?.(false);
        } else if (!checkedValues.includes(value)) {
            setCheckedValues([...checkedValues, value]);
            onCheckedChange?.(true);
        }
    };

    const role = 'checkbox';
    const ariaRequired = required || groupRequired;
    const isDisabled = disabled || groupDisabled;

    return (
        <div>
            <CheckboxGroupPrimitiveTriggerContext.Provider value={{ isChecked }}>
                <RovingFocusGroup.Item
                    ref={ref}
                    role={role}
                    onClick={handleClick}
                    className={className}
                    aria-checked={isChecked}
                    aria-required={ariaRequired}
                    aria-disabled={isDisabled || undefined}
                    {...props}
                >
                    <button
                        type="button"
                        role={role}
                        aria-checked={isChecked}
                        aria-required={ariaRequired}
                        aria-disabled={isDisabled || undefined}
                        disabled={isDisabled}
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
                required={ariaRequired}
                disabled={isDisabled}
                readOnly
            />

        </div>
    );
});

CheckboxGroupPrimitiveTrigger.displayName = 'CheckboxGroupPrimitiveTrigger';

export default CheckboxGroupPrimitiveTrigger;
