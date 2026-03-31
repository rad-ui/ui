'use client';
import React from 'react';
import { customClassSwitcher } from '~/core';
import clsx from 'clsx';

const COMPONENT_NAME = 'Quote';

export type QuoteProps = React.ComponentPropsWithoutRef<'q'> & {
    customRootClass?: string;
    detach?: boolean;
};

const Quote = React.forwardRef<React.ElementRef<'q'>, QuoteProps>(
    ({ children, customRootClass, detach = false, className, ...props }, ref) => {
        const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME, detach);
        return (
            <q ref={ref} className={clsx(rootClass, className)} {...props}>
                {children}
            </q>
        );
    }
);

Quote.displayName = COMPONENT_NAME;

export default Quote;
