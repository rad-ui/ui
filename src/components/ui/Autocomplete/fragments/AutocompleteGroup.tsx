import clsx from 'clsx';
import React, { useContext } from 'react';
import ComboboxPrimitive from '~/core/primitives/Combobox/ComboboxPrimitive';
import { AutocompleteRootContext } from '../contexts/AutocompleteRootContext';

export type AutocompleteGroupProps = {
    children: React.ReactNode
};

type AutocompleteGroupElement = React.ElementRef<typeof ComboboxPrimitive.Group>;
type AutocompleteGroupComponentProps = React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Group> & AutocompleteGroupProps;

const AutocompleteGroup = React.forwardRef<AutocompleteGroupElement, AutocompleteGroupComponentProps>(({ children, className, ...props }, forwardedRef) => {
    const { rootClass } = useContext(AutocompleteRootContext);
    return (
        <ComboboxPrimitive.Group
            className={clsx(rootClass ? `${rootClass}-group` : undefined, className) || undefined}
            ref={forwardedRef}
            {...props}
        >
            {children}
        </ComboboxPrimitive.Group>

    );
});

AutocompleteGroup.displayName = 'AutocompleteGroup';

export default AutocompleteGroup;
