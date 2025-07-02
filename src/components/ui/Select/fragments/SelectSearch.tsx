import React, { useContext } from 'react';
import SelectPrimitive from '~/core/primitives/Select/Select';
import { SelectRootContext } from '../contexts/SelectRootContext';

function SelectSearch() {
    const { rootClass } = useContext(SelectRootContext);
    return (
        <SelectPrimitive.Search
            className={`${rootClass}-search`}
        >

        </SelectPrimitive.Search>
    );
}

export default SelectSearch;
