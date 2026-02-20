'use client';
import React, { useContext } from 'react';
import { ComboboxRootContext } from '../contexts/ComboboxRootContext';

type ComboboxIndicatorElement = React.ElementRef<'div'>;
type ComboboxIndicatorProps = React.ComponentPropsWithoutRef<'div'>;

const ComboboxIndicator = React.forwardRef<ComboboxIndicatorElement, ComboboxIndicatorProps>((props, forwardedRef) => {
    const { rootClass } = useContext(ComboboxRootContext);
    return (
        <div className={`${rootClass}-item-indicator`} ref={forwardedRef} {...props}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.3332 4L5.99984 11.3333L2.6665 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
    );
});

ComboboxIndicator.displayName = 'ComboboxIndicator';

export default ComboboxIndicator;
