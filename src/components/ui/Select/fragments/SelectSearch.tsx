import React, { useContext } from 'react';
import SelectPrimitive from '~/core/primitives/Select/Select';
import clsx from 'clsx';
import { SelectRootContext } from '../contexts/SelectRootContext';

type SelectSearchProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Search>;

const SelectSearch = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Search>, SelectSearchProps>(
    ({ className, ...rest }, ref) => {
        const { rootClass } = useContext(SelectRootContext);
        const mergedClassName = clsx(rootClass && `${rootClass}-search`, className);
        return (
            <SelectPrimitive.Search
                className={mergedClassName}
                ref={ref}
                {...rest}
            >

            </SelectPrimitive.Search>
        );
    }
);

SelectSearch.displayName = 'SelectSearch';

export default SelectSearch;
