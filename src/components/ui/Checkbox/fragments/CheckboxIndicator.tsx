import React, { useContext } from 'react';
import CheckboxPrimitiveIndicator from '~/core/primitives/Checkbox/fragments/CheckboxPrimitiveIndicator';
import CheckboxContext from '../context/CheckboxContext';
import clsx from 'clsx';

export type CheckboxIndicatorProps = {
    children: React.ReactNode;
    className?: string;
}

const CheckboxIndicator = ({ children, className = '', ...props }: CheckboxIndicatorProps) => {
    const { rootClass } = useContext(CheckboxContext);

    return <CheckboxPrimitiveIndicator className={clsx(`${rootClass}-indicator`, className)} {...props}>
        {children}
    </CheckboxPrimitiveIndicator>;
};

export default CheckboxIndicator;
