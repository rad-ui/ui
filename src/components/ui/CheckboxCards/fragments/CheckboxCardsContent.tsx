import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import CheckboxGroupPrimitive from '~/core/primitives/CheckboxGroup/CheckboxGroupPrimitive';
import CheckboxCardsRootContext from '../context/CheckboxCardsRootContext';
import clsx from 'clsx';

export type CheckboxCardsContentElement = ElementRef<typeof CheckboxGroupPrimitive.Content>;
export type CheckboxCardsContentProps = ComponentPropsWithoutRef<typeof CheckboxGroupPrimitive.Content>;

const CheckboxCardsContent = forwardRef<CheckboxCardsContentElement, CheckboxCardsContentProps>(({ children, className, ...props }, ref) => {
    const { rootClass } = React.useContext(CheckboxCardsRootContext);
    const mergedClassName = clsx(rootClass ? `${rootClass}-content` : undefined, className) || undefined;

    return (
        <CheckboxGroupPrimitive.Content ref={ref} className={mergedClassName} {...props} >{children}</CheckboxGroupPrimitive.Content>
    );
});

CheckboxCardsContent.displayName = 'CheckboxCardsContent';

export default CheckboxCardsContent;
