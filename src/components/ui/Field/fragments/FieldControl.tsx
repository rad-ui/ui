'use client';

import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';
import useLayoutEffect from '~/core/hooks/useLayoutEffect';
import { mergeRefs } from '~/core/utils/mergeRefs';
import { useFieldContext } from '../contexts/FieldContext';

export type FieldControlElement = ElementRef<typeof Primitive.input>;
export type FieldControlProps = ComponentPropsWithoutRef<typeof Primitive.input> & {
    /** Called with the control's new value as the user edits it. */
    onValueChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
};

const isFilled = (control: HTMLInputElement) =>
    control.type === 'checkbox' || control.type === 'radio' ? control.checked : control.value !== '';

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
    onValueChange,
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
        setFilled,
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

    // data-filled follows the value, including one set from outside.
    useLayoutEffect(() => {
        const control = controlRef.current as HTMLInputElement | null;
        if (control && 'value' in control) setFilled(isFilled(control));
    }, [controlRef, setFilled, props.value, props.checked]);

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
                onValueChange?.(event.target.value, event);
                setDirty(true);
                setFilled(isFilled(event.target));
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
