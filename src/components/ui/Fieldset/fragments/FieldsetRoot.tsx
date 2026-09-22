'use client';

import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import { composeAttributes, createDataAccentColorAttribute, createDataAttributes } from '~/core/hooks/createDataAttribute';

const COMPONENT_NAME = 'Fieldset';

export type FieldsetRootElement = HTMLFieldSetElement;
export type FieldsetRootProps = {
    customRootClass?: string;
    color?: string;
    size?: string;
    variant?: string;
    invalid?: boolean;
} & React.ComponentPropsWithoutRef<'fieldset'>;

const FieldsetRoot = forwardRef<FieldsetRootElement, FieldsetRootProps>(({
    children,
    className = '',
    customRootClass = '',
    color = '',
    disabled = false,
    invalid = false,
    size = '',
    variant = '',
    ...props
}, ref) => {
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);
    const dataAttributes = createDataAttributes('fieldset', {
        disabled,
        invalid,
        size,
        variant
    });
    const accentAttributes = createDataAccentColorAttribute(color);
    const composedAttributes = composeAttributes(dataAttributes, accentAttributes, {
        'aria-invalid': invalid || undefined,
        'data-slot': 'fieldset-root'
    });

    return (
        <fieldset
            ref={ref}
            className={clsx(rootClass, className)}
            {...props}
            disabled={disabled}
            {...composedAttributes}
        >
            {children}
        </fieldset>
    );
});

FieldsetRoot.displayName = COMPONENT_NAME;

export default FieldsetRoot;
