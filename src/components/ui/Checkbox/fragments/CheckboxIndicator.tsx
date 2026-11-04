import React, { useContext, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import CheckboxPrimitiveIndicator from '~/core/primitives/Checkbox/fragments/CheckboxPrimitiveIndicator';
import CheckboxContext from '../context/CheckboxContext';
import clsx from 'clsx';
import { Check, Minus } from 'lucide-react';
import CheckboxPrimitiveContext from '~/core/primitives/Checkbox/context/CheckboxPrimitiveContext';

export type CheckboxIndicatorElement = ElementRef<typeof CheckboxPrimitiveIndicator>;
export type CheckboxIndicatorProps = {
    children?: React.ReactNode;
    className?: string;
} & Omit<ComponentPropsWithoutRef<typeof CheckboxPrimitiveIndicator>, 'children'>;

const CheckboxIndicator = forwardRef<CheckboxIndicatorElement, CheckboxIndicatorProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass } = useContext(CheckboxContext);
    const { isChecked } = useContext(CheckboxPrimitiveContext);
    const Icon = isChecked === 'indeterminate' || isChecked === null ? Minus : Check;
    // Your own children replace the default mark. The default icon is 1em, so it follows the
    // font size when no theme is loaded; the theme sizes it to the box.
    return <CheckboxPrimitiveIndicator
        ref={ref}
        {...props}
        className={clsx(rootClass && `${rootClass}-indicator`, className)}
        data-slot="checkbox-indicator"
    >
        {children ?? <Icon width="1em" height="1em" aria-hidden="true" />}
    </CheckboxPrimitiveIndicator>;
});

CheckboxIndicator.displayName = 'CheckboxIndicator';

export default CheckboxIndicator;
