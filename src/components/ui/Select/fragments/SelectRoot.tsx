import React from 'react';
import ComboboxPrimitive from '~/core/primitives/Combobox/ComboboxPrimitive';
import { customClassSwitcher } from '~/core/customClassSwitcher';
import { SelectRootContext } from '../contexts/SelectRootContext';

const COMPONENT_NAME = 'Select';

type SelectRootElement = React.ElementRef<typeof ComboboxPrimitive.Root>;
type SelectRootProps = React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Root> & {
    customRootClass?: string;
};

const SelectRoot = React.forwardRef<SelectRootElement, SelectRootProps>(
    ({ customRootClass, children, defaultValue, value, onValueChange, shift, ...props }, forwardedRef) => {
        const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

        return (
            <SelectRootContext.Provider value={{ rootClass }}>
                <ComboboxPrimitive.Root
                    className={`${rootClass}-root`}
                    defaultValue={defaultValue}
                    value={value}
                    onValueChange={onValueChange}
                    shift={shift}
                    ref={forwardedRef}
                    {...props}
                >
                    {children}
                </ComboboxPrimitive.Root>
            </SelectRootContext.Provider>

        );
    }
);

SelectRoot.displayName = 'SelectRoot';

export default SelectRoot;
