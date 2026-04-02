'use client';
import React, { useContext, isValidElement, cloneElement } from 'react';
import clsx from 'clsx';
import { AccordionContext } from '../contexts/AccordionContext';
import { mergeProps, composeRefs } from '~/core/utils/mergeProps';

export type AccordionHeaderProps = React.ComponentPropsWithoutRef<'h3'> & {
    asChild?: boolean;
};

const AccordionHeader = React.forwardRef<HTMLHeadingElement, AccordionHeaderProps>(
    ({ children, className = '', asChild = false, ...props }, ref) => {
        const { rootClass } = useContext(AccordionContext);
        const mergedClass = clsx(`${rootClass}-header`, className);

        if (asChild && isValidElement(children)) {
            const child = children as React.ReactElement;
            const merged = mergeProps({ className: mergedClass }, child.props as Record<string, unknown>);
            return cloneElement(child, {
                ...merged,
                ref: composeRefs(ref, (child as React.ReactElement & { ref?: React.Ref<HTMLElement> }).ref)
            });
        }

        return (
            <h3 ref={ref} className={mergedClass} {...props}>
                {children}
            </h3>
        );
    });

AccordionHeader.displayName = 'AccordionHeader';

export default AccordionHeader;
