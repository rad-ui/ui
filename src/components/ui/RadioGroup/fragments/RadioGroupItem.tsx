import React, { PropsWithChildren, useContext } from 'react';
import RadioGroupContext from '../context/RadioGroupContext';

import RadioPrimitive from '~/core/primitives/Radio';

type RadioGroupItemProps = PropsWithChildren<{
    value: string;
}>;

const RadioGroupItem = ({ value, children }: RadioGroupItemProps) => {
    const { setCheckedItem, checkedItem, onChange } = useContext(RadioGroupContext);

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckedItem(value);

        if (typeof onChange === 'function') {
            onChange(value);
        }
    };

    return (
        <div className="rad-ui-radio-group-item">
            <RadioPrimitive value={value} name='radio' checked={checkedItem === value} onChange={handleOnChange} />
            <label htmlFor={value}>{children}</label>
        </div>
    );
};

export default RadioGroupItem;
