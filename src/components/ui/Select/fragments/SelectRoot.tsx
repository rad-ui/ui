import clsx from 'clsx';
import React from 'react';
import ComboboxPrimitive from '~/core/primitives/Combobox/ComboboxPrimitive';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import { SelectRootContext } from '../contexts/SelectRootContext';
import FieldContext, { useFieldInteraction } from '~/components/ui/Field/contexts/FieldContext';

const COMPONENT_NAME = 'Select';

type SelectRootElement = React.ElementRef<typeof ComboboxPrimitive.Root>;
export type SelectRootProps = React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Root> & {
    customRootClass?: string;
};

const SelectRoot = React.forwardRef<SelectRootElement, SelectRootProps>(
    ({ customRootClass, children, className, sideOffset = 4, onValueChange, ...props }, forwardedRef) => {
        const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);
        // Mirror the value (kept by the primitive) so a surrounding Field can track it.
        const [uncontrolledValue, setUncontrolledValue] = React.useState<string | string[] | undefined>(props.defaultValue);
        const currentValue = props.value !== undefined ? props.value : uncontrolledValue;
        const filled = Array.isArray(currentValue) ? currentValue.length > 0 : currentValue != null && currentValue !== '';
        const fieldInteraction = useFieldInteraction(currentValue, filled);
        const handleValueChange = React.useCallback((next: string & string[]) => {
            setUncontrolledValue(next);
            onValueChange?.(next);
        }, [onValueChange]);
        const baseId = React.useId();
        const [hasLabel, setHasLabel] = React.useState(false);
        const labelContext = React.useMemo(() => ({
            rootClass,
            triggerId: `${baseId}-trigger`,
            labelId: `${baseId}-label`,
            hasLabel,
            setHasLabel,
            onFieldFocus: fieldInteraction.onFocus,
            onFieldBlur: fieldInteraction.onBlur,
            fieldStateAttributes: fieldInteraction.stateAttributes
        }), [rootClass, baseId, hasLabel, fieldInteraction.onFocus, fieldInteraction.onBlur, fieldInteraction.stateAttributes]);
        // Inside Field.Root, take the field's name, required and disabled state.
        const field = React.useContext(FieldContext);
        const fieldProps = field ? {
            name: props.name ?? field.name,
            required: props.required ?? (field.required || undefined),
            disabled: props.disabled ?? (field.disabled || undefined)
        } : {};

        return (
            <SelectRootContext.Provider value={labelContext}>
                <ComboboxPrimitive.Root
                    className={clsx(rootClass ? `${rootClass}-root` : undefined, className) || undefined}
                    data-slot="select-root"
                    sideOffset={sideOffset}
                    ref={forwardedRef}
                    {...props}
                    {...fieldProps}
                    onValueChange={handleValueChange}
                >
                    {children}
                </ComboboxPrimitive.Root>
            </SelectRootContext.Provider>

        );
    }
);

SelectRoot.displayName = 'SelectRoot';

export default SelectRoot;
