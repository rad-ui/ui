import React from 'react';
import ComboboxPrimitive from '~/core/primitives/Combobox/ComboboxPrimitive';
import { customClassSwitcher } from '~/core/customClassSwitcher';
import { ComboboxRootContext } from '../contexts/ComboboxRootContext';

const COMPONENT_NAME = 'Combobox';

type ComboboxRootElement = React.ElementRef<typeof ComboboxPrimitive.Root>;
type ComboboxRootProps = React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Root> & {
    customRootClass?: string;
};

const ComboboxRoot = React.forwardRef<ComboboxRootElement, ComboboxRootProps>(
    ({ customRootClass, children, defaultValue, value, onValueChange, shift, ...props }, forwardedRef) => {
        const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

        return (
            <ComboboxRootContext.Provider value={{ rootClass }}>
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
            </ComboboxRootContext.Provider>

        );
    }
);

ComboboxRoot.displayName = 'ComboboxRoot';

export default ComboboxRoot;
