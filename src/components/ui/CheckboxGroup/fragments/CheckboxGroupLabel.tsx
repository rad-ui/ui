import React, { useContext } from 'react';
import CheckboxGroupRootContext from '../context/CheckboxGroupRootContext';
import CheckboxGroupItemContext from '../context/CheckboxGroupItemContext';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';

export type CheckboxGroupLabelProps = {
    children: React.ReactNode
    className?: string
}

const CheckboxGroupLabel = ({ children, className = '' }: CheckboxGroupLabelProps) => {
    const { rootClass } = useContext(CheckboxGroupRootContext);
    const { checked, setChecked } = useContext(CheckboxGroupItemContext);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();

        setChecked(!checked);
    };

    return (
        <Primitive.label className={clsx(`${rootClass}-label`, className)} onClick={handleClick}>
            {children}
        </Primitive.label>
    );
};

export default CheckboxGroupLabel;
