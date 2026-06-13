'use client';
import React from 'react';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import { createDataAttributes } from '~/core/hooks/createDataAttribute';
import clsx from 'clsx';

const COMPONENT_NAME = 'Quote';

export type QuoteProps = React.ComponentPropsWithoutRef<'q'> & {
    customRootClass?: string;
    truncate?: boolean;
};

const Quote = React.forwardRef<React.ElementRef<'q'>, QuoteProps>(
    ({ children, customRootClass, className, truncate = false, ...props }, ref) => {
        const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);
        const dataAttributes = createDataAttributes('quote', { truncate: truncate || undefined });
        return (
            <q ref={ref} className={clsx(rootClass, className)} {...dataAttributes} {...props}>
                {children}
            </q>
        );
    }
);

Quote.displayName = COMPONENT_NAME;

export default Quote;
