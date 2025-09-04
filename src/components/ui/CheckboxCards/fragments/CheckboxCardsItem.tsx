import React from 'react';
import clsx from 'clsx';
import CheckboxGroupPrimitive from '~/core/primitives/CheckboxGroup/CheckboxGroupPrimitive';
import CheckboxCardsRootContext from '../context/CheckboxCardsRootContext';

export type CheckboxCardsItemProps = React.ComponentPropsWithoutRef<typeof CheckboxGroupPrimitive.Trigger>;

const CheckboxCardsItem = React.forwardRef<
    React.ElementRef<typeof CheckboxGroupPrimitive.Trigger>,
    CheckboxCardsItemProps
>(({ children, className = '', value, ...props }, ref) => {
    const { rootClass } = React.useContext(CheckboxCardsRootContext);

    return (
        <CheckboxGroupPrimitive.Trigger
            ref={ref}
            className={clsx(`${rootClass}-item`, className)}
            value={value}
            {...props}
        >
            {children}
        </CheckboxGroupPrimitive.Trigger>
    );
});

CheckboxCardsItem.displayName = 'CheckboxCardsItem';

export default CheckboxCardsItem;
