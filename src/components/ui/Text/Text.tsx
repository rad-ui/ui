'use client';
import React from 'react';
import { customClassSwitcher } from '~/core';

// Can be rendered as p, label, div, span, etc.
// TODO: Add as prop support
// TODO: Add a core reusable function to check and render an as prop

const COMPONENT_NAME = 'Text';

const TAGS = ['div' , 'span' ,'p','label']

export type TextProps = {
    children: React.ReactNode;
    customRootClass?: string;
    className?: string;
    as?: string;
} & React.ComponentProps<'p'>;

const Text = ({ children, customRootClass = '', className = '', as= 'p', ...props }: TextProps) => {
    const rootClassName = customClassSwitcher(customRootClass, COMPONENT_NAME);

    if (!TAGS.includes(as)) as = 'p'

    return React.createElement(
        as,
        { className: `${rootClassName} ${className}`, ...props },
        children
    );
};

Text.displayName = COMPONENT_NAME;

export default Text;
