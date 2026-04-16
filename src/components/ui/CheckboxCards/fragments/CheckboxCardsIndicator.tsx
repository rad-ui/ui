import React, { useContext, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import CheckboxCardsRootContext from '../context/CheckboxCardsRootContext';
import clsx from 'clsx';
import { Check } from 'lucide-react';

export type CheckboxCardsIndicatorElement = ElementRef<'svg'>;
export type CheckboxCardsIndicatorProps = ComponentPropsWithoutRef<'svg'>;

const CheckboxCardsIndicator = forwardRef<CheckboxCardsIndicatorElement, CheckboxCardsIndicatorProps>(({ className, ...props }, ref) => {
    const { rootClass } = useContext(CheckboxCardsRootContext);
    return (
        <Check ref={ref} width={15} height={15} className={clsx(rootClass && `${rootClass}-tick-icon`, className)} {...props} />
    );
});

CheckboxCardsIndicator.displayName = 'CheckboxCardsIndicator';

export default CheckboxCardsIndicator;
