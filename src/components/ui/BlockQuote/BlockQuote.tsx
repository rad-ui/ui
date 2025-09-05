'use client';
import React from 'react';
import { clsx } from 'clsx';
import { customClassSwitcher } from '~/core';

const COMPONENT_NAME = 'BlockQuote';

export type BlockQuoteProps = {
    children: React.ReactNode;
    customRootClass?: string;
    className?: string;
    color?: string;
    variant?: string;
    size?: string;
    props?: Record<string, any>[]
}
const BlockQuote = ({ children, customRootClass = '', className = '', color = '', variant = '', size = '', ...props }: BlockQuoteProps) => {
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

    return <blockquote className={clsx(rootClass, className)} {...props} {...data_attributes}> {children}</blockquote>;
};

BlockQuote.displayName = COMPONENT_NAME;

export default BlockQuote;
