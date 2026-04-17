'use client';
import React from 'react';
import clsx from 'clsx';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';

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
} & React.ComponentPropsWithoutRef<'h1'>;

/**
 * Renders a heading element with customizable tag and styling
 */
const Heading = React.forwardRef<React.ElementRef<'h1'>, HeadingProps>(({
    children,
    as = 'h1',
    customRootClass = '',
    className = '',
    ...props
}, ref) => {
    const rootClass = useComponentClass(customRootClass, as);
    const Tag: HeadingTag = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(as) ? as : 'h1';

    return React.createElement(Tag, {
        className: clsx(rootClass, className),
        ref,
        ...props
    }, children);
});

Heading.displayName = 'Heading';

export default Heading;
