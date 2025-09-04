import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import CheckboxGroupPrimitive from '~/core/primitives/CheckboxGroup/CheckboxGroupPrimitive';
import CheckboxGroupRootContext from '../context/CheckboxGroupRootContext';

export type CheckboxGroupTriggerElement = ElementRef<typeof CheckboxGroupPrimitive.Trigger>;
export type CheckboxGroupTriggerProps = {
    value?: string;
} & ComponentPropsWithoutRef<typeof CheckboxGroupPrimitive.Trigger>;

const CheckboxGroupTrigger = forwardRef<CheckboxGroupTriggerElement, CheckboxGroupTriggerProps>(({ children, className = '', value, ...props }, ref) => {
    const { rootClass } = React.useContext(CheckboxGroupRootContext);

    return (
        <CheckboxGroupPrimitive.Trigger ref={ref} className={clsx(`${rootClass}-trigger`, className)} value={value} {...props}>
            <CheckboxGroupPrimitive.Content>
                {children}
            </CheckboxGroupPrimitive.Content>
        </CheckboxGroupPrimitive.Trigger>
    );
});

CheckboxGroupTrigger.displayName = 'CheckboxGroupTrigger';

export default CheckboxGroupTrigger;
