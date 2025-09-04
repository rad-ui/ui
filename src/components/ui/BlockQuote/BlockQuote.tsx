'use client';
import React from 'react';
import { clsx } from 'clsx';
import { customClassSwitcher } from '~/core';

const COMPONENT_NAME = 'BlockQuote';

export type BlockQuoteProps = React.ComponentPropsWithoutRef<'blockquote'> & {
    customRootClass?: string;
    color?: string;
    variant?: string;
    size?: string;
};

const BlockQuote = React.forwardRef<React.ElementRef<'blockquote'>, BlockQuoteProps>(
    ({ children, customRootClass = '', className = '', color = '', variant = '', size = '', ...props }, ref) => {
        const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

        const data_attributes: Record<string, string> = {};

        if (variant) {
            data_attributes['data-block-quote-variant'] = variant;
        }

        if (size) {
            data_attributes['data-block-quote-size'] = size;
        }

        if (color) {
            data_attributes['data-rad-ui-accent-color'] = color;
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
