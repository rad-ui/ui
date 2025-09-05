'use client';
import React from 'react';
import { clsx } from 'clsx';
import { customClassSwitcher } from '~/core';

export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

/**
 * Heading component that renders HTML heading elements (h1-h6)
 * with customizable styling.
 */
export type HeadingProps = {
    /** HTML heading tag to render */
    as?: HeadingTag;
    /** Custom root class for specialized styling */
    customRootClass?: string;
    /** Additional class names to apply */
    className?: string;
    /** Content of the heading */
    children?: React.ReactNode;
} & React.HTMLAttributes<HTMLHeadingElement>;

/**
 * Renders a heading element with customizable tag and styling
 */
const Heading = ({
    children,
    as = 'h1',
    customRootClass = '',
    className = '',
    ...props
}: HeadingProps) => {
    const rootClass = customClassSwitcher(customRootClass, as);

    // Check if the heading tag is valid
    if (!['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(as)) {
        as = 'h1';
    }

    return React.createElement(as, {
        className: clsx(rootClass, className),
        ...props
    }, children);
};

Heading.displayName = 'Heading';

export default Heading;
