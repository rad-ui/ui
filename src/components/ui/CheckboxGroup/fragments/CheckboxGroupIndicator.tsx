import React, { useContext, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import CheckboxGroupRootContext from '../context/CheckboxGroupRootContext';
import clsx from 'clsx';
import { Check, Minus } from 'lucide-react';
import CheckboxGroupPrimitiveTriggerContext from '~/core/primitives/CheckboxGroup/context/CheckboxGroupPrimitiveTriggerContext';

export type CheckboxGroupIndicatorElement = ElementRef<'svg'>;
export type CheckboxGroupIndicatorProps = ComponentPropsWithoutRef<'svg'>;

const CheckboxGroupIndicator = forwardRef<CheckboxGroupIndicatorElement, CheckboxGroupIndicatorProps>(({ className, ...props }, ref) => {
    const { rootClass } = useContext(CheckboxGroupRootContext);
    const { isIndeterminate } = useContext(CheckboxGroupPrimitiveTriggerContext);
    // A parent checkbox with only some items checked shows a dash.
    const Icon = isIndeterminate ? Minus : Check;
    return (
        <Icon ref={ref} width={15} height={15} className={clsx(rootClass && `${rootClass}-tick-icon`, className)} data-slot="checkbox-group-indicator" {...props} />
    );
});

CheckboxGroupIndicator.displayName = 'CheckboxGroupIndicator';

export default CheckboxGroupIndicator;
