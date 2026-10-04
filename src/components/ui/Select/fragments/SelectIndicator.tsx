'use client';
import React, { useContext } from 'react';
import clsx from 'clsx';
import { SelectRootContext } from '../contexts/SelectRootContext';
import { Check } from 'lucide-react';

type SelectIndicatorElement = React.ElementRef<'div'>;
export type SelectIndicatorProps = React.ComponentPropsWithoutRef<'div'>;

const SelectIndicator = React.forwardRef<SelectIndicatorElement, SelectIndicatorProps>(({ className, ...props }, forwardedRef) => {
    const { rootClass } = useContext(SelectRootContext);
    return (
        <div className={clsx(rootClass ? `${rootClass}-item-indicator` : undefined, className) || undefined} data-slot="select-item-indicator" ref={forwardedRef} {...props}>
            <Check width={16} height={16} />
        </div>
    );
});

SelectIndicator.displayName = 'SelectIndicator';

export default SelectIndicator;
