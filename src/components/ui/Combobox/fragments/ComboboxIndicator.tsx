'use client';
import React, { useContext } from 'react';
import { ComboboxRootContext } from '../contexts/ComboboxRootContext';
import { Check } from 'lucide-react';

type ComboboxIndicatorElement = React.ElementRef<'div'>;
type ComboboxIndicatorProps = React.ComponentPropsWithoutRef<'div'>;

const ComboboxIndicator = React.forwardRef<ComboboxIndicatorElement, ComboboxIndicatorProps>((props, forwardedRef) => {
    const { rootClass } = useContext(ComboboxRootContext);
    return (
        <div className={`${rootClass}-item-indicator`} ref={forwardedRef} {...props}>
            <Check width={16} height={16} />
        </div>
    );
});

ComboboxIndicator.displayName = 'ComboboxIndicator';

export default ComboboxIndicator;
