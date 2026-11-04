import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import CheckboxGroupPrimitiveTriggerContext from '../context/CheckboxGroupPrimitiveTriggerContext';
import { stateData } from '~/core/utils/stateAttributes';

export type CheckboxGroupPrimitiveContentElement = ElementRef<'span'>;
export type CheckboxGroupPrimitiveContentProps = ComponentPropsWithoutRef<'span'> & {
    /** Keep the children rendered while unchecked, for exit animations. */
    forceMount?: boolean;
};

const CheckboxGroupPrimitiveContent = forwardRef<CheckboxGroupPrimitiveContentElement, CheckboxGroupPrimitiveContentProps>(({ children, className, forceMount = false, ...props }, ref) => {
    const { isChecked, isIndeterminate } = React.useContext(CheckboxGroupPrimitiveTriggerContext);

    return <span ref={ref} className={className} {...stateData(isIndeterminate ? 'indeterminate' : isChecked ? 'checked' : 'unchecked')} {...props}>
        {isChecked || isIndeterminate || forceMount ? children : null}
    </span>;
});

CheckboxGroupPrimitiveContent.displayName = 'CheckboxGroupPrimitiveContent';

export default CheckboxGroupPrimitiveContent;
