'use client';
import React from 'react';
import clsx from 'clsx';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';

const COMPONENT_NAME = 'BlockQuote';

export type BlockQuoteProps = React.ComponentPropsWithoutRef<'blockquote'> & {
    customRootClass?: string;
    color?: string;
    variant?: string;
    size?: string;
};

const BlockQuote = React.forwardRef<React.ElementRef<'blockquote'>, BlockQuoteProps>(
    ({ children, customRootClass = '', className = '', color = '', variant = '', size = '', ...props }, ref) => {
        const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);

        const data_attributes: Record<string, string> = {};

        if (variant) {
            data_attributes['data-variant'] = variant;
        }

        if (size) {
            data_attributes['data-size'] = size;
        }

        if (color) {
            data_attributes['data-color'] = color;
        }

        return (
            <blockquote ref={ref} className={clsx(rootClass, className)} {...props} {...data_attributes}>
                {children}
            </blockquote>
        );
    }
);

BlockQuote.displayName = COMPONENT_NAME;

export default BlockQuote;
