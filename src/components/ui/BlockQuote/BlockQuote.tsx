'use client';
import React from 'react';

import {customClassSwitcher} from '~/core';

const COMPONENT_NAME = 'BlockQuote';

interface BlockQuoteProps {
    children: React.ReactNode;
    customRootClass?: string;
    className?: string;
    props: Record<string, any>[]
}
const BlockQuote = ({children, customRootClass, className, ...props}: BlockQuoteProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    return <blockquote className={`${rootClass} ${className}`} {...props}>{children}</blockquote>;
};

BlockQuote.displayName = COMPONENT_NAME;

export default BlockQuote;
