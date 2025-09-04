import React from 'react';
import CheckboxGroupPrimitiveTriggerContext from '../context/CheckboxGroupPrimitiveTriggerContext';

export type CheckboxGroupPrimitiveContentProps = React.ComponentPropsWithoutRef<'span'>;

const CheckboxGroupPrimitiveContent = React.forwardRef<
    HTMLSpanElement,
    CheckboxGroupPrimitiveContentProps
>(({ children, className, ...props }, ref) => {
    const { isChecked } = React.useContext(CheckboxGroupPrimitiveTriggerContext);

    return (
        <span ref={ref} className={className} {...props}>
            {isChecked ? children : null}
        </span>
    );
});

CheckboxGroupPrimitiveContent.displayName = 'CheckboxGroupPrimitiveContent';

export default CheckboxGroupPrimitiveContent;
