import React from 'react';
import SelectPrimitive from '~/core/primitives/Select/ComboboxPrimitive';
import { customClassSwitcher } from '~/core/customClassSwitcher';
import { SelectRootContext } from '../contexts/SelectRootContext';

const COMPONENT_NAME = 'Select';

type SelectRootElement = React.ElementRef<typeof SelectPrimitive.Root>;
type SelectRootProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root> & {
    customRootClass?: string;
};

const SelectRoot = React.forwardRef<SelectRootElement, SelectRootProps>(
    ({ customRootClass, children, defaultValue, value, onValueChange, shift, ...props }, forwardedRef) => {
        const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

        return (
            <SelectRootContext.Provider value={{ rootClass }}>
                <SelectPrimitive.Root
                    className={`${rootClass}-root`}
                    defaultValue={defaultValue}
                    value={value}
                    onValueChange={onValueChange}
                    shift={shift}
                    ref={forwardedRef}
                    {...props}
                >
                    {children}
                </SelectPrimitive.Root>
            </SelectRootContext.Provider>

        );
    }
);

SelectRoot.displayName = 'SelectRoot';

export default SelectRoot;
