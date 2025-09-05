import React, { useContext, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import CheckboxGroupRootContext from '../context/CheckboxGroupRootContext';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';

export type CheckboxGroupLabelElement = ElementRef<typeof Primitive.label>;
export type CheckboxGroupLabelProps = ComponentPropsWithoutRef<typeof Primitive.label>;

const CheckboxGroupLabel = forwardRef<CheckboxGroupLabelElement, CheckboxGroupLabelProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass } = useContext(CheckboxGroupRootContext);

    return (
        <Primitive.label ref={ref} className={clsx(`${rootClass}-label`, className)} {...props}>
            {children}
        </Primitive.label>
    );
});

CheckboxGroupLabel.displayName = 'CheckboxGroupLabel';

export default CheckboxGroupLabel;
