import React, { ComponentPropsWithoutRef, ElementRef } from 'react';
import Primitive from '~/core/primitives/Primitive';
import clsx from 'clsx';
import { RadioGroupContext } from '../context/RadioGroupContext';

export type RadioGroupLabelElement = ElementRef<typeof Primitive.label>;

export type RadioGroupLabelProps = ComponentPropsWithoutRef<typeof Primitive.label>;

const RadioGroupLabel = React.forwardRef<RadioGroupLabelElement, RadioGroupLabelProps>(
    ({ className = '', asChild = false, children, ...props }, forwardedRef) => {
        const { rootClass } = React.useContext(RadioGroupContext);
        return (
            <Primitive.label
                ref={forwardedRef}
                {...props}
                className={clsx(`${rootClass}-label`, className)}
                asChild={asChild}
            >
                {children}
            </Primitive.label>
        );
    }
);

RadioGroupLabel.displayName = 'RadioGroupLabel';

export default RadioGroupLabel;

