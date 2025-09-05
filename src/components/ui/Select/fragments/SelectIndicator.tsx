'use client';
import React, { useContext } from 'react';
import clsx from 'clsx';
import { SelectRootContext } from '../contexts/SelectRootContext';

type SelectIndicatorProps = React.ComponentPropsWithoutRef<'div'>;

const SelectIndicator = React.forwardRef<React.ElementRef<'div'>, SelectIndicatorProps>(({ className, ...rest }, ref) => {
    const { rootClass } = useContext(SelectRootContext);
    const mergedClassName = clsx(rootClass && `${rootClass}-item-indicator`, className);
    return (
        <div className={mergedClassName} ref={ref} {...rest}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M13.3332 4L5.99984 11.3333L2.6665 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
    );
});

SelectIndicator.displayName = 'SelectIndicator';

export default SelectIndicator;
