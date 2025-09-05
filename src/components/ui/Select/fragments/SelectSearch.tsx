import React, { useContext } from 'react';
import SelectPrimitive from '~/core/primitives/Select/Select';
import { SelectRootContext } from '../contexts/SelectRootContext';

type SelectSearchElement = React.ElementRef<typeof SelectPrimitive.Search>;
type SelectSearchProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Search>;

const SelectSearch = React.forwardRef<SelectSearchElement, SelectSearchProps>((props, forwardedRef) => {
    const { rootClass } = useContext(SelectRootContext);
    return (
        <SelectPrimitive.Search
            className={`${rootClass}-search`}
            ref={forwardedRef}
            {...props}
        >

        </SelectPrimitive.Search>
    );
});

SelectSearch.displayName = 'SelectSearch';

export default SelectSearch;
