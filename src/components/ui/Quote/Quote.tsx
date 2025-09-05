'use client';
import React from 'react';
import { customClassSwitcher } from '~/core';
import { clsx } from 'clsx';

const COMPONENT_NAME = 'Quote';

export type QuoteProps = React.ComponentPropsWithoutRef<'q'> & {
    customRootClass?: string;
};

const Quote = React.forwardRef<React.ElementRef<'q'>, QuoteProps>(
    ({ children, customRootClass, className, ...props }, ref) => {
        const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
        return (
            <q ref={ref} className={clsx(rootClass, className)} {...props}>
                {children}
            </q>
        );
    }
);

Quote.displayName = COMPONENT_NAME;

export default Quote;
