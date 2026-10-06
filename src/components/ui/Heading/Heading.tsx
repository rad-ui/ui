'use client';
import React from 'react';
import clsx from 'clsx';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';

export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const HEADING_TAGS: readonly HeadingTag[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

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
    // Resolve the tag first so an invalid `as` falls back to h1 for both the
    // element and its generated class (otherwise it would get e.g. `rad-ui-h7`).
    const Tag: HeadingTag = HEADING_TAGS.includes(as) ? as : 'h1';
    const rootClass = useComponentClass(customRootClass, Tag);

    return React.createElement(Tag, {
        className: clsx(rootClass, className),
        ref,
        ...props
    }, children);
});

Heading.displayName = 'Heading';

export default Heading;
