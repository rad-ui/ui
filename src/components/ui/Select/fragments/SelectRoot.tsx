import clsx from 'clsx';
import React from 'react';
import ComboboxPrimitive from '~/core/primitives/Combobox/ComboboxPrimitive';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import { SelectRootContext } from '../contexts/SelectRootContext';
import FieldContext from '~/components/ui/Field/contexts/FieldContext';

const COMPONENT_NAME = 'Select';

type SelectRootElement = React.ElementRef<typeof ComboboxPrimitive.Root>;
export type SelectRootProps = React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Root> & {
    customRootClass?: string;
};

const SelectRoot = React.forwardRef<SelectRootElement, SelectRootProps>(
    ({ customRootClass, children, className, sideOffset = 4, ...props }, forwardedRef) => {
        const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);
        // Inside Field.Root, take the field's name, required and disabled state.
        const field = React.useContext(FieldContext);
        const fieldProps = field ? {
            name: props.name ?? field.name,
            required: props.required ?? (field.required || undefined),
            disabled: props.disabled ?? (field.disabled || undefined)
        } : {};

        return (
            <SelectRootContext.Provider value={{ rootClass }}>
                <ComboboxPrimitive.Root
                    className={clsx(rootClass ? `${rootClass}-root` : undefined, className) || undefined}
                    data-slot="select-root"
                    sideOffset={sideOffset}
                    ref={forwardedRef}
                    {...props}
                    {...fieldProps}
                >
                    {children}
                </ComboboxPrimitive.Root>
            </SelectRootContext.Provider>

        );
    }
);

SelectRoot.displayName = 'SelectRoot';

export default SelectRoot;
