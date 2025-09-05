import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import CheckboxGroupPrimitive from '~/core/primitives/CheckboxGroup/CheckboxGroupPrimitive';
import CheckboxCardsRootContext from '../context/CheckboxCardsRootContext';

export type CheckboxCardsContentElement = ElementRef<typeof CheckboxGroupPrimitive.Content>;
export type CheckboxCardsContentProps = ComponentPropsWithoutRef<typeof CheckboxGroupPrimitive.Content>;

const CheckboxCardsContent = forwardRef<CheckboxCardsContentElement, CheckboxCardsContentProps>(({ children, ...props }, ref) => {
    const { rootClass } = React.useContext(CheckboxCardsRootContext);

    return (
        <CheckboxGroupPrimitive.Content ref={ref} className={`${rootClass}-content`} {...props} >{children}</CheckboxGroupPrimitive.Content>
    );
});

CheckboxCardsContent.displayName = 'CheckboxCardsContent';

export default CheckboxCardsContent;
