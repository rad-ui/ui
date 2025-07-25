import React from 'react';
import Primitive from '~/core/primitives/Primitive';
import clsx from 'clsx';
import { RadioGroupContext } from '../context/RadioGroupContext';

export type RadioGroupLabelProps = {
    children?: React.ReactNode
    className?: string
    asChild?: boolean
}

const RadioGroupLabel = ({ className = '', asChild = false, children, ...props }: RadioGroupLabelProps) => {
    const { rootClass } = React.useContext(RadioGroupContext);
    return <Primitive.label {...props} className={clsx(`${rootClass}-label`, className)} asChild={asChild}> {children} </Primitive.label>;
};

export default RadioGroupLabel;
