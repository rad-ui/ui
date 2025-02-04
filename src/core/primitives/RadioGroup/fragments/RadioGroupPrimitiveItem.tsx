import React, { PropsWithChildren, useContext } from 'react';
import RadioGroupContext from '../context/RadioGroupContext';

import RadioPrimitive from '~/core/primitives/Radio';

type RadioGroupItemProps = PropsWithChildren<{
    value: string;
}>;

const RadioGroupPrimitiveItem = ({ value, children, ...props }: RadioGroupPrimitiveItemProps) => {
    const { setCheckedItem, checkedItem, onChange } = useContext(RadioGroupContext);

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckedItem(value);

        if (typeof onChange === 'function') {
            onChange(value);
        }
    };

    return (
        <div {...props}>
            <RadioPrimitive value={value} name='radio' checked={checkedItem === value} onChange={handleOnChange} />
            <label htmlFor={value}>{children}</label>
        </div>
    );
};

export default RadioGroupPrimitiveItem;
