import React, { useContext, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import CheckboxGroupRootContext from '../context/CheckboxGroupRootContext';
import clsx from 'clsx';
import { Check } from 'lucide-react';

export type CheckboxGroupIndicatorElement = ElementRef<'svg'>;
export type CheckboxGroupIndicatorProps = ComponentPropsWithoutRef<'svg'>;

const CheckboxGroupIndicator = forwardRef<CheckboxGroupIndicatorElement, CheckboxGroupIndicatorProps>(({ className, ...props }, ref) => {
    const { rootClass } = useContext(CheckboxGroupRootContext);
    return (
        <Check ref={ref} width={15} height={15} className={clsx(rootClass && `${rootClass}-tick-icon`, className)} {...props} />
    );
});

CheckboxGroupIndicator.displayName = 'CheckboxGroupIndicator';

export default CheckboxGroupIndicator;
