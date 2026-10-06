import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import CheckboxGroupPrimitiveContext from '../context/CheckboxGroupPrimitiveContext';
import CheckboxGroupPrimitiveTriggerContext from '../context/CheckboxGroupPrimitiveTriggerContext';

export type CheckboxGroupPrimitiveTriggerElement = ElementRef<'button'>;
export type CheckboxGroupPrimitiveTriggerProps = {
    value: string;
    required?: boolean;
    disabled?: boolean;
    /**
     * @deprecated Ignored. The group's `value`/`defaultValue` is the single source of truth for
     * which items are checked (Radix-style); control the group instead. Kept only so existing
     * code keeps type-checking.
     */
    checked?: boolean;
    /** Called with this item's new checked state, in addition to the group's `onValueChange`. */
    onCheckedChange?: (checked: boolean) => void;
} & ComponentPropsWithoutRef<'button'>;

const CheckboxGroupPrimitiveTrigger = forwardRef<CheckboxGroupPrimitiveTriggerElement, CheckboxGroupPrimitiveTriggerProps>(({ children, className = '', value, required, disabled, checked: _ignoredChecked, onCheckedChange, onClick, ...props }, ref) => {
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
    const { role: _roleProp, ...triggerProps } = props;

    return (
        // Phrasing content: items are commonly wrapped in <label>, which only permits inline children.
        <span>
            <CheckboxGroupPrimitiveTriggerContext.Provider value={{ isChecked }}>
                <RovingFocusGroup.Item
                    ref={ref}
                    onClick={handleClick}
                    className={className}
                    role={role}
                    aria-checked={isChecked}
                    aria-selected={undefined}
                    aria-required={ariaRequired || undefined}
                    aria-disabled={isDisabled || undefined}
                    disabled={isDisabled}
                    {...triggerProps}
                    data-state={isChecked ? 'checked' : 'unchecked'}
                >
                    <button type="button" disabled={isDisabled}>
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
                // Group-level `required` is validated once by the root (at least one checked);
                // marking every mirror input required would demand that all items be checked.
                required={required}
                disabled={isDisabled}
                aria-hidden="true"
                readOnly
            />

        </span>
    );
});

CheckboxGroupPrimitiveTrigger.displayName = 'CheckboxGroupPrimitiveTrigger';

export default CheckboxGroupPrimitiveTrigger;
