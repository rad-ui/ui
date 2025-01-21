'use client';
import React from 'react';
import { clsx } from 'clsx';
import { customClassSwitcher } from '~/core';

const COMPONENT_NAME = 'BlockQuote';

export type BlockQuoteProps = {
    children: React.ReactNode;
    customRootClass?: string;
    className?: string;
    color?:string;
    props?: Record<string, any>[]
}
const BlockQuote = ({ children, customRootClass = '', className = '', color = '', ...props }: BlockQuoteProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const data_attributes: Record<string, string> = {};

    if (color) {
        data_attributes['data-accent-color'] = color;
    }

    return <blockquote className={clsx(rootClass, className)} {...props} {...data_attributes}> {children}</blockquote>;
};

BlockQuote.displayName = COMPONENT_NAME;

export default BlockQuote;
