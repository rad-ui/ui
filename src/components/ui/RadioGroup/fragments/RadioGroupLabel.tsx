import React from 'react';
import Primitive from '~/core/primitives/Primitive';
import clsx from 'clsx';
import { RadioGroupContext } from '../context/RadioGroupContext';

export type RadioGroupLabelElement = React.ElementRef<typeof Primitive.label>;

export type RadioGroupLabelProps = React.ComponentPropsWithoutRef<typeof Primitive.label>;

const RadioGroupLabel = React.forwardRef<RadioGroupLabelElement, RadioGroupLabelProps>(
    ({ className = '', asChild = false, children, ...props }, ref) => {
        const { rootClass } = React.useContext(RadioGroupContext);
        return <Primitive.label ref={ref} {...props} className={clsx(`${rootClass}-label`, className)} asChild={asChild}> {children} </Primitive.label>;
    }
);

RadioGroupLabel.displayName = 'RadioGroupLabel';

export default RadioGroupLabel;
