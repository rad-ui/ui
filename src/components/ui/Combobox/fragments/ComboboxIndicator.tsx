'use client';
import React, { useContext } from 'react';
import { ComboboxRootContext } from '../contexts/ComboboxRootContext';
import { Check } from 'lucide-react';
import clsx from 'clsx';

type ComboboxIndicatorElement = React.ElementRef<'div'>;
type ComboboxIndicatorProps = React.ComponentPropsWithoutRef<'div'>;

const ComboboxIndicator = React.forwardRef<ComboboxIndicatorElement, ComboboxIndicatorProps>(({ className, ...props }, forwardedRef) => {
    const { rootClass } = useContext(ComboboxRootContext);
    const mergedClassName = clsx(rootClass ? `${rootClass}-item-indicator` : undefined, className) || undefined;
    return (
        <div className={mergedClassName} ref={forwardedRef} {...props}>
            <Check width={16} height={16} />
        </div>
    );
});

ComboboxIndicator.displayName = 'ComboboxIndicator';

export default ComboboxIndicator;
