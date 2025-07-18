import React, { useContext } from 'react';
import CheckboxGroupRootContext from '../context/CheckboxGroupRootContext';
<<<<<<< HEAD
import CheckboxGroupItemContext from '../context/CheckboxGroupItemContext';
=======
>>>>>>> feat/checkbox-group
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';

export type CheckboxGroupLabelProps = {
    children: React.ReactNode
    className?: string
}

const CheckboxGroupLabel = ({ children, className = '' }: CheckboxGroupLabelProps) => {
    const { rootClass } = useContext(CheckboxGroupRootContext);

    return (
        <Primitive.label className={clsx(`${rootClass}-label`, className)} >
            {children}
        </Primitive.label>
    );
};

export default CheckboxGroupLabel;
