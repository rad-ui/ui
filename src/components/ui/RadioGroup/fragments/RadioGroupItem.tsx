import React, { PropsWithChildren } from 'react';

import RadioPrimitive from '~/core/primitives/Radio';

type RadioGroupItemProps = PropsWithChildren<{
    value: string;
}>;

const RadioGroupItem = ({ value, children }: RadioGroupItemProps) => {
    return (
        <div>
            <RadioPrimitive value={value} name='radio' />
            <label htmlFor={value}>{children}</label>
        </div>
    );
};

export default RadioGroupItem;
