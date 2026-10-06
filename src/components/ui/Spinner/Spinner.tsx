'use client';
import React, { ElementRef, ComponentPropsWithoutRef } from 'react';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import { createDataAttributes } from '~/core/hooks/createDataAttribute';
import clsx from 'clsx';

const COMPONENT_NAME = 'Spinner';

export type SpinnerProps = {
    customRootClass?: string;
    size?: string;
} & ComponentPropsWithoutRef<'span'>;

type SpinnerElement = ElementRef<'span'>;

const DEFAULT_LABEL = 'Loading';

const isTruthyAria = (value: unknown) => value === true || value === 'true';

const Spinner = React.forwardRef<SpinnerElement, SpinnerProps>(({ className, customRootClass = '', size = '', role, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby, 'aria-hidden': ariaHidden, ...props }, ref) => {
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);
    const dataAttributes = createDataAttributes('spinner', { size });
    const mergedClassName = clsx(rootClass, className) || undefined;
    // Announced as a polite status ("Loading") by default. Pass aria-label /
    // aria-labelledby to rename it, or aria-hidden when it is decorative (e.g. inside
    // a button that already has a label), which also drops the role.
    const decorative = isTruthyAria(ariaHidden);
    const a11yProps = decorative
        ? { 'aria-hidden': true as const, role }
        : {
            role: role ?? 'status',
            'aria-label': ariaLabelledby ? ariaLabel : (ariaLabel ?? DEFAULT_LABEL),
            'aria-labelledby': ariaLabelledby
        };

    return (
        // A span (not a div) so Spinner is valid inside phrasing content such as <button> or <p>.
        <span className={rootClass ? `${rootClass}-container` : undefined}>
            <span
                ref={ref}
                className={mergedClassName}
                {...a11yProps}
                {...props}
                {...dataAttributes}>
            </span>
        </span>
    );
});

Spinner.displayName = COMPONENT_NAME;

export default Spinner;
