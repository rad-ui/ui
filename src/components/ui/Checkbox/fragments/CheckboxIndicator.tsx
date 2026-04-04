import React, { useContext, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import CheckboxPrimitiveIndicator from '~/core/primitives/Checkbox/fragments/CheckboxPrimitiveIndicator';
import CheckboxContext from '../context/CheckboxContext';
import clsx from 'clsx';
import { Check } from 'lucide-react';

export type CheckboxIndicatorElement = ElementRef<typeof CheckboxPrimitiveIndicator>;
export type CheckboxIndicatorProps = {
    children?: React.ReactNode;
    className?: string;
} & Omit<ComponentPropsWithoutRef<typeof CheckboxPrimitiveIndicator>, 'children'>;

const CheckboxIndicator = forwardRef<CheckboxIndicatorElement, CheckboxIndicatorProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass } = useContext(CheckboxContext);
    return <CheckboxPrimitiveIndicator ref={ref} {...props}>
        <Check
            width={15}
            height={15}
            className={clsx(`${rootClass}-indicator`, className)}
        />
        {children}
    </CheckboxPrimitiveIndicator>;
});

CheckboxIndicator.displayName = 'CheckboxIndicator';

export default CheckboxIndicator;
