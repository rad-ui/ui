import React, { PropsWithChildren, useState } from 'react';
import { customClassSwitcher } from '~/core';
import { clsx } from 'clsx';

import RadioGroupContext from '../context/RadioGroupContext';

const COMPONENT_NAME = 'RadioGroup';

type RadioGroupRootProps = PropsWithChildren<{
    className?: string;
    customRootClass?: string;
    defaultChecked?: string;
    onChange?: (item: string) => void;
}>;

const RadioGroupRoot = ({ children, defaultChecked = '', className, customRootClass = '', onChange = null }: RadioGroupRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
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

    return <RadioGroupContext.Provider value={sendItems}><div className={clsx(rootClass, className)}>{children}</div></RadioGroupContext.Provider>;
};

export default RadioGroupRoot;
