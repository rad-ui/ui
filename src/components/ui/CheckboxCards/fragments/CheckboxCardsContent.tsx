import React from 'react';
import CheckboxGroupPrimitive from '~/core/primitives/CheckboxGroup/CheckboxGroupPrimitive';
import CheckboxCardsRootContext from '../context/CheckboxCardsRootContext';

export type CheckboxCardsContentProps = React.ComponentPropsWithoutRef<typeof CheckboxGroupPrimitive.Content>;

const CheckboxCardsContent = React.forwardRef<
    React.ElementRef<typeof CheckboxGroupPrimitive.Content>,
    CheckboxCardsContentProps
>(({ children, ...props }, ref) => {
    const { rootClass } = React.useContext(CheckboxCardsRootContext);

    return (
        <CheckboxGroupPrimitive.Content
            ref={ref}
            className={`${rootClass}-content`}
            {...props}
        >
            {children}
        </CheckboxGroupPrimitive.Content>
    );
});

CheckboxCardsContent.displayName = 'CheckboxCardsContent';

export default CheckboxCardsContent;
