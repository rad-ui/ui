'use client';

import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';
import useLayoutEffect from '~/core/hooks/useLayoutEffect';
import { mergeRefs } from '~/core/utils/mergeRefs';
import { useFieldContext } from '../contexts/FieldContext';

export type FieldControlElement = ElementRef<typeof Primitive.input>;
export type FieldControlProps = ComponentPropsWithoutRef<typeof Primitive.input>;

/**
 * The form control. Renders an <input> by default; pass `asChild` to wire up another control,
 * such as Rad UI's TextField or TextArea, a native select, or your own input.
 */
const FieldControl = forwardRef<FieldControlElement, FieldControlProps>(({
    className,
    id: idProp,
    name: nameProp,
    disabled: disabledProp,
    required: requiredProp,
    'aria-describedby': ariaDescribedByProp,
    'aria-invalid': ariaInvalidProp,
    onFocus,
    onBlur,
    onChange,
    onInvalid,
    ...props
}, ref) => {
    const {
        rootClass,
        controlId,
        setControlId,
        describedBy,
        name,
        invalid,
        disabled,
        required,
        setTouched,
        setDirty,
        setFocused,
        validate,
        validateDebounced,
        validityShown,
        validationMode,
        controlRef,
        clearFormError,
        stateAttributes
    } = useFieldContext('Control');
    const mergedRef = React.useMemo(() => mergeRefs(ref, controlRef as React.Ref<HTMLInputElement>), [ref, controlRef]);

    // Check silently on mount, so a custom `validate` error blocks native form
    // submission before the user has touched the field.
    React.useEffect(() => {
        validate(false);
    }, [validate]);

    // A control with its own id keeps it; the Label follows.
    useLayoutEffect(() => {
        setControlId(idProp);
        return () => setControlId(undefined);
    }, [idProp, setControlId]);

    const ariaDescribedBy = [ariaDescribedByProp, describedBy].filter(Boolean).join(' ') || undefined;

    return (
        <Primitive.input
            ref={mergedRef}
            id={idProp ?? controlId}
            name={nameProp ?? name}
            disabled={disabledProp ?? (disabled || undefined)}
            required={requiredProp ?? (required || undefined)}
            aria-describedby={ariaDescribedBy}
            aria-invalid={ariaInvalidProp ?? (invalid || undefined)}
            className={clsx(rootClass && `${rootClass}-control`, className)}
            {...props}
            {...stateAttributes}
            data-slot="field-control"
            onFocus={(event: React.FocusEvent<HTMLInputElement>) => {
                onFocus?.(event);
                setFocused(true);
            }}
            onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
                onBlur?.(event);
                setFocused(false);
                setTouched(true);
                validate(validationMode === 'onBlur' || validityShown);
            }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                onChange?.(event);
                setDirty(true);
                const fieldName = nameProp ?? name;
                if (fieldName) clearFormError?.(fieldName);
                validateDebounced(validationMode === 'onChange' || validityShown);
            }}
            onInvalid={(event: React.FormEvent<HTMLInputElement>) => {
                onInvalid?.(event);
                // A submit attempt found the field invalid: show the result.
                setTouched(true);
                validate(true);
            }}
        />
    );
});

FieldControl.displayName = 'FieldControl';

export default FieldControl;
