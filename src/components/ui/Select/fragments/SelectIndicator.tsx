'use client';
import React, { useContext } from 'react';
import { SelectRootContext } from '../contexts/SelectRootContext';
import { Check } from 'lucide-react';

type SelectIndicatorElement = React.ElementRef<'div'>;
export type SelectIndicatorProps = React.ComponentPropsWithoutRef<'div'>;

const SelectIndicator = React.forwardRef<SelectIndicatorElement, SelectIndicatorProps>((props, forwardedRef) => {
    const { rootClass } = useContext(SelectRootContext);
    return (
        <div className={`${rootClass}-item-indicator`} ref={forwardedRef} {...props}>
            <Check width={16} height={16} />
        </div>
    );
});

SelectIndicator.displayName = 'SelectIndicator';

export default SelectIndicator;
