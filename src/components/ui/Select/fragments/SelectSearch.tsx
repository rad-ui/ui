import React, { useContext } from 'react';
import SelectPrimitive from '~/core/primitives/Select/Select';
import { SelectRootContext } from '../contexts/SelectRootContext';

type SelectSearchProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Search>;

const SelectSearch = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Search>, SelectSearchProps>(
    (props, ref) => {
        const { rootClass } = useContext(SelectRootContext);
        return (
            <SelectPrimitive.Search
                className={`${rootClass}-search`}
                ref={ref}
                {...props}
            >

            </SelectPrimitive.Search>
        );
    }
);

SelectSearch.displayName = 'SelectSearch';

export default SelectSearch;
