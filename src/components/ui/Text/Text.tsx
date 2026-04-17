'use client';
import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import clsx from 'clsx';

// Can be rendered as p, label, div, span, etc.
// TODO: Add as prop support
// TODO: Add a core reusable function to check and render an as prop

const COMPONENT_NAME = 'Text';

const TAGS = ['div', 'span', 'p', 'label'];

export type TextProps = {
    children: React.ReactNode;
    customRootClass?: string;
    className?: string;
    as?: string;
} & ComponentPropsWithoutRef<'p'>;

type TextElement = ElementRef<'p'>;

const Text = forwardRef<TextElement, TextProps>(
    (
        { children, customRootClass = '', className = '', as = 'p', ...props },
        ref
    ) => {
        const rootClassName = useComponentClass(customRootClass, COMPONENT_NAME);

        if (!TAGS.includes(as)) {
            as = 'p';
        }

        return React.createElement(
            as,
            { ref, className: clsx(rootClassName, className), ...props },
            children
        );
    }
);

Text.displayName = COMPONENT_NAME;

export default Text;
