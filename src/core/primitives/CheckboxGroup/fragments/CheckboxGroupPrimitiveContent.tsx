import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import CheckboxGroupPrimitiveTriggerContext from '../context/CheckboxGroupPrimitiveTriggerContext';

export type CheckboxGroupPrimitiveContentElement = ElementRef<'span'>;
export type CheckboxGroupPrimitiveContentProps = ComponentPropsWithoutRef<'span'>;

const CheckboxGroupPrimitiveContent = forwardRef<CheckboxGroupPrimitiveContentElement, CheckboxGroupPrimitiveContentProps>(({ children, className, ...props }, ref) => {
    const { isChecked } = React.useContext(CheckboxGroupPrimitiveTriggerContext);

    return <span ref={ref} className={className} {...props}>
        {isChecked ? children : null}
    </span>;
});

CheckboxGroupPrimitiveContent.displayName = 'CheckboxGroupPrimitiveContent';

export default CheckboxGroupPrimitiveContent;
