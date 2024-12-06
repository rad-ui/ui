'use client';
import React from 'react';
import { customClassSwitcher } from '~/core';

// Can be rendered as p, label, div, span, etc.
// TODO: Add as prop support
// TODO: Add a core reusable function to check and render an as prop

const COMPONENT_NAME = 'Text';
const componentList = [
    {
        label: 'DIV',
        tag: 'div'
    },
    {
        label: 'SPAN',
        tag: 'span'
    },
    {
        label: 'P',
        tag: 'p'
    },
    {
        label: 'LABEL',
        tag: 'label'
    },
]
export type TextProps = {
    children: React.ReactNode;
    customRootClass?: string;
    className?: string;
    as?: string;
} & React.ComponentProps<'p'>;

const Text = ({ children, customRootClass = '', className = '', as=undefined, ...props }: TextProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    if (!componentList.find((item) => item.tag === as)) as='p'

    const { tag: Tag } = componentList.find((item) => item.tag === as);
    return <Tag className={`${rootClass} ${className}`} {...props}>{children}</Tag>;
};

Text.displayName = COMPONENT_NAME;

export default Text;
