import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import CheckboxGroupPrimitiveContext from '../context/CheckboxGroupPrimitiveContext';
import CheckboxGroupPrimitiveTriggerContext from '../context/CheckboxGroupPrimitiveTriggerContext';
import composeEventHandlers from '~/core/hooks/composeEventHandlers';
import { KEYBOARD_KEYS } from '~/core/utils/keyboard';
import { stateData } from '~/core/utils/stateAttributes';

export type CheckboxGroupPrimitiveTriggerElement = ElementRef<'button'>;
export type CheckboxGroupPrimitiveTriggerProps = {
    /** This item's value. Not needed on a `parent` checkbox. */
    value?: string;
    /**
     * Make this the group's "select all" checkbox: checked when every value in
     * the root's `allValues` is checked, mixed when some are, and toggling it
     * checks or clears them all.
     */
    parent?: boolean;
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

const CheckboxGroupPrimitiveTrigger = forwardRef<CheckboxGroupPrimitiveTriggerElement, CheckboxGroupPrimitiveTriggerProps>(({ children, className = '', value = '', parent = false, required, disabled, checked: _ignoredChecked, onCheckedChange, onClick, onKeyDown, ...props }, ref) => {
    const { checkedValues, setCheckedValues, name, required: groupRequired, disabled: groupDisabled, allValues = [] } = React.useContext(CheckboxGroupPrimitiveContext);

    const checkedCount = parent ? allValues.filter((item) => checkedValues.includes(item)).length : 0;
    const isChecked = parent ? allValues.length > 0 && checkedCount === allValues.length : checkedValues.includes(value);
    const isIndeterminate = parent && checkedCount > 0 && !isChecked;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        event.preventDefault();
        event.stopPropagation();
        if (parent) {
            // Values outside allValues (if any) are left as they are.
            const others = checkedValues.filter((item) => !allValues.includes(item));
            const next = isChecked ? others : [...others, ...allValues];
            setCheckedValues(next);
            onCheckedChange?.(!isChecked);
            return;
        }
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
            <CheckboxGroupPrimitiveTriggerContext.Provider value={{ isChecked, isIndeterminate }}>
                <RovingFocusGroup.Item
                    ref={ref}
                    onClick={handleClick}
                    onKeyDown={composeEventHandlers(onKeyDown, (event: React.KeyboardEvent<HTMLButtonElement>) => {
                        // Checkboxes toggle with Space only (WAI-ARIA checkbox pattern, as native checkboxes do).
                        if (event.key === KEYBOARD_KEYS.ENTER) event.preventDefault();
                    })}
                    className={className}
                    role={role}
                    aria-checked={isIndeterminate ? 'mixed' : isChecked}
                    aria-selected={undefined}
                    aria-required={ariaRequired || undefined}
                    aria-disabled={isDisabled || undefined}
                    disabled={isDisabled}
                    {...triggerProps}
                    {...stateData(isIndeterminate ? 'indeterminate' : isChecked ? 'checked' : 'unchecked')}
                    data-parent={parent ? '' : undefined}
                >
                    <button type="button" disabled={isDisabled}>
                        {children}
                    </button>
                </RovingFocusGroup.Item>
            </CheckboxGroupPrimitiveTriggerContext.Provider>

            {/* A parent checkbox has no value of its own to submit. */}
            {!parent && <input
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
            />}

        </span>
    );
});

CheckboxGroupPrimitiveTrigger.displayName = 'CheckboxGroupPrimitiveTrigger';

export default CheckboxGroupPrimitiveTrigger;
