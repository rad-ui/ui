'use client';

import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';
import { FieldValidityKey, useFieldContext, useFieldDescription } from '../contexts/FieldContext';

export type FieldErrorElement = ElementRef<typeof Primitive.p>;
export type FieldErrorProps = {
    /** Keep the error rendered while the field is valid (for exit animations or reserved space). */
    forceMount?: boolean;
    /**
     * Show this error only for one validity problem, such as `valueMissing` or
     * `typeMismatch`, so each can have its own message. `true` always shows it.
     * Without it, the error shows whenever the field is invalid.
     */
    match?: boolean | FieldValidityKey;
} & ComponentPropsWithoutRef<typeof Primitive.p>;

const FieldErrorMessage = forwardRef<FieldErrorElement, Omit<FieldErrorProps, 'forceMount' | 'match'> & { active: boolean }>(({
    className,
    id: idProp,
    role,
    active,
    ...props
}, ref) => {
    const generatedId = React.useId();
    const id = idProp ?? generatedId;
    const { rootClass, stateAttributes } = useFieldContext('Error');
    // Only a showing error describes the control; a force-mounted idle one stays out of it.
    return (
        <>
            {active ? <RegisterError id={id} /> : null}
            <Primitive.p
                ref={ref}
                id={id}
                className={clsx(rootClass && `${rootClass}-error`, className)}
                {...props}
                role={role ?? (active ? 'alert' : undefined)}
                hidden={active ? props.hidden : true}
                {...stateAttributes}
                data-slot="field-error"
            />
        </>
    );
});

const RegisterError = ({ id }: { id: string }) => {
    useFieldDescription(id, 'error');
    return null;
};

/**
 * The error message. Renders only while the field is invalid, and is announced
 * when it appears. Without children it shows the validation message.
 */
const FieldError = forwardRef<FieldErrorElement, FieldErrorProps>(({ forceMount = false, match, children, ...props }, ref) => {
    const { invalid, validity, validityShown } = useFieldContext('Error');
    const active = match === true
        ? true
        : typeof match === 'string'
            ? validityShown && Boolean(validity.state?.[match])
            : invalid;
    if (!active && !forceMount) return null;
    return (
        <FieldErrorMessage ref={ref} active={active} {...props}>
            {children ?? (active ? validity.errors[0] : null)}
        </FieldErrorMessage>
    );
});

FieldErrorMessage.displayName = 'FieldErrorMessage';
FieldError.displayName = 'FieldError';

export default FieldError;
