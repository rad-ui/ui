import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import CheckboxGroupPrimitive from '~/core/primitives/CheckboxGroup/CheckboxGroupPrimitive';
import CheckboxCardsRootContext from '../context/CheckboxCardsRootContext';

export type CheckboxCardsItemElement = ElementRef<typeof CheckboxGroupPrimitive.Trigger>;
export type CheckboxCardsItemProps = {
    value: string;
} & ComponentPropsWithoutRef<typeof CheckboxGroupPrimitive.Trigger>;

const CheckboxCardsItem = forwardRef<CheckboxCardsItemElement, CheckboxCardsItemProps>(({ children, className = '', value, ...props }, ref) => {
    const { rootClass } = React.useContext(CheckboxCardsRootContext);

    return (
        <CheckboxGroupPrimitive.Trigger ref={ref} className={clsx(`${rootClass}-item`, className)} value={value} {...props}>
            {children}
        </CheckboxGroupPrimitive.Trigger>
    );
});

CheckboxCardsItem.displayName = 'CheckboxCardsItem';

export default CheckboxCardsItem;
