import React from 'react';
import SelectPrimitive from '~/core/primitives/Select/Select';
import { customClassSwitcher } from '~/core/customClassSwitcher';
import clsx from 'clsx';
import { SelectRootContext } from '../contexts/SelectRootContext';

const COMPONENT_NAME = 'Select';

type SelectRootProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root> & {
    customRootClass?: string;
};

const SelectRoot = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Root>, SelectRootProps>(
    ({ customRootClass, children, defaultValue, value, onValueChange, shift, className, ...rest }, ref) => {
        const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
        const mergedClassName = clsx(rootClass && `${rootClass}-root`, className);

        return (
            <SelectRootContext.Provider value={{ rootClass }}>
                <SelectPrimitive.Root
                    className={mergedClassName}
                    defaultValue={defaultValue}
                    value={value}
                    onValueChange={onValueChange}
                    shift={shift}
                    ref={ref}
                    {...rest}
                >
                    {children}
                </SelectPrimitive.Root>
            </SelectRootContext.Provider>

        );
    }
);

SelectRoot.displayName = 'SelectRoot';

export default SelectRoot;
