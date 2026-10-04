import clsx from 'clsx';
import React from 'react';
import ComboboxPrimitive from '~/core/primitives/Combobox/ComboboxPrimitive';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import { SelectRootContext } from '../contexts/SelectRootContext';

const COMPONENT_NAME = 'Select';

type SelectRootElement = React.ElementRef<typeof ComboboxPrimitive.Root>;
export type SelectRootProps = React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Root> & {
    customRootClass?: string;
};

const SelectRoot = React.forwardRef<SelectRootElement, SelectRootProps>(
    ({ customRootClass, children, className, defaultValue, value, onValueChange, sideOffset = 4, ...props }, forwardedRef) => {
        const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);

        return (
            <SelectRootContext.Provider value={{ rootClass }}>
                <ComboboxPrimitive.Root
                    className={clsx(rootClass ? `${rootClass}-root` : undefined, className) || undefined}
                    data-slot="select-root"
                    defaultValue={defaultValue}
                    value={value}
                    onValueChange={onValueChange}
                    sideOffset={sideOffset}
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
