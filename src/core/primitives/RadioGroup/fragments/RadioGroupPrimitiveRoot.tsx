import React, { PropsWithChildren, useState } from 'react';

import RadioGroupContext from '../context/RadioGroupContext';

type RadioGroupRootProps = PropsWithChildren<{
    className?: string;
    customRootClass?: string;
    defaultChecked?: string;
    onChange?: (item: string) => void;
}>;

const RadioGroupPrimitiveRoot = ({ children, defaultChecked = '', onChange = null }: RadioGroupPrimitiveRootProps) => {
    const [checkedItem, setCheckedItem] = useState(defaultChecked);

    const handleOnChange = (item: string) => {
        setCheckedItem(item);

        if (typeof onChange === 'function') {
            onChange(item);
        }
    };

    const sendItems = {
        checkedItem,
        setCheckedItem,
        onChange: handleOnChange
    };

    return <RadioGroupContext.Provider value={sendItems}>
        <div>{children}</div>
    </RadioGroupContext.Provider>;
};

export default RadioGroupPrimitiveRoot;
