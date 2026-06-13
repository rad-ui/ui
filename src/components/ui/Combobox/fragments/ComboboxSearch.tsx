import React, { useContext } from 'react';
import ComboboxPrimitive from '~/core/primitives/Combobox/ComboboxPrimitive';
import { ComboboxRootContext } from '../contexts/ComboboxRootContext';
import clsx from 'clsx';

type ComboboxSearchElement = React.ElementRef<typeof ComboboxPrimitive.Search>;
export type ComboboxSearchProps = React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Search>;

const ComboboxSearch = React.forwardRef<ComboboxSearchElement, ComboboxSearchProps>(({ className, ...props }, forwardedRef) => {
    const { rootClass } = useContext(ComboboxRootContext);
    const mergedClassName = clsx(rootClass ? `${rootClass}-search` : undefined, className) || undefined;
    return (
        <ComboboxPrimitive.Search
            className={mergedClassName}
            ref={forwardedRef}
            {...props}
        >
        </ComboboxPrimitive.Search>
    );
});

ComboboxSearch.displayName = 'ComboboxSearch';

export default ComboboxSearch;
