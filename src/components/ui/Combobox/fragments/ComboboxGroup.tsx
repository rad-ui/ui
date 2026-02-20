import React, { useContext } from 'react';
import ComboboxPrimitive from '~/core/primitives/Combobox/ComboboxPrimitive';
import { ComboboxRootContext } from '../contexts/ComboboxRootContext';

export type ComboboxGroupProps = {
    children: React.ReactNode
};

type ComboboxGroupElement = React.ElementRef<typeof ComboboxPrimitive.Group>;
type ComboboxGroupComponentProps = React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Group> & ComboboxGroupProps;

const ComboboxGroup = React.forwardRef<ComboboxGroupElement, ComboboxGroupComponentProps>(({ children, ...props }, forwardedRef) => {
    const { rootClass } = useContext(ComboboxRootContext);
    return (
        <ComboboxPrimitive.Group
            className={`${rootClass}-group`}
            ref={forwardedRef}
            {...props}
        >
            {children}
        </ComboboxPrimitive.Group>

    );
});

ComboboxGroup.displayName = 'ComboboxGroup';

export default ComboboxGroup;
