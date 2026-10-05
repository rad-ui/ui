'use client';

import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import { composeAttributes, createDataAccentColorAttribute, createDataAttributes } from '~/core/hooks/createDataAttribute';
import FieldsetContext from '../contexts/FieldsetContext';

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
    'aria-describedby': ariaDescribedByProp,
    ...props
}, ref) => {
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);
    // Description and message parts register their ids so the group's accessible
    // description includes them (a legend only provides the group's name).
    const [describedByIds, setDescribedByIds] = React.useState<string[]>([]);
    const registerDescription = React.useCallback((id: string) => {
        setDescribedByIds((ids) => (ids.includes(id) ? ids : [...ids, id]));
        return () => setDescribedByIds((ids) => ids.filter((existing) => existing !== id));
    }, []);
    const ariaDescribedBy = [ariaDescribedByProp, ...describedByIds].filter(Boolean).join(' ') || undefined;
    const contextValue = React.useMemo(() => ({ rootClass, invalid, registerDescription }), [rootClass, invalid, registerDescription]);
    const dataAttributes = createDataAttributes('fieldset', {
        disabled,
        invalid,
        size,
        variant
    });
    const accentAttributes = createDataAccentColorAttribute(color);
    const composedAttributes = composeAttributes(dataAttributes, accentAttributes, {
        'aria-invalid': invalid || undefined,
        'aria-describedby': ariaDescribedBy,
        'data-slot': 'fieldset-root'
    });

    return (
        <FieldsetContext.Provider value={contextValue}>
            <fieldset
                ref={ref}
                className={clsx(rootClass, className)}
                {...props}
                disabled={disabled}
                {...composedAttributes}
            >
                {children}
            </fieldset>
        </FieldsetContext.Provider>
    );
});

FieldsetRoot.displayName = COMPONENT_NAME;

export default FieldsetRoot;
