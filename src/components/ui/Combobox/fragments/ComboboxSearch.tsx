import React, { useContext } from 'react';
import ComboboxPrimitive from '~/core/primitives/Combobox/ComboboxPrimitive';
import { ComboboxRootContext } from '../contexts/ComboboxRootContext';

type ComboboxSearchElement = React.ElementRef<typeof ComboboxPrimitive.Search>;
type ComboboxSearchProps = React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Search>;

const ComboboxSearch = React.forwardRef<ComboboxSearchElement, ComboboxSearchProps>((props, forwardedRef) => {
    const { rootClass } = useContext(ComboboxRootContext);
    return (
        <ComboboxPrimitive.Search
            className={`${rootClass}-search`}
            ref={forwardedRef}
            {...props}
        >

        </ComboboxPrimitive.Search>
    );
});

ComboboxSearch.displayName = 'ComboboxSearch';

export default ComboboxSearch;
