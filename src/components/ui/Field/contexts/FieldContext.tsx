'use client';

import React from 'react';
import useLayoutEffect from '~/core/hooks/useLayoutEffect';

export type FieldDescriptionKind = 'description' | 'error';

/** The ValidityState flags a Field.Error can `match`. */
export type FieldValidityKey =
    | 'badInput'
    | 'customError'
    | 'patternMismatch'
    | 'rangeOverflow'
    | 'rangeUnderflow'
    | 'stepMismatch'
    | 'tooLong'
    | 'tooShort'
    | 'typeMismatch'
    | 'valueMissing';

export type FieldValidityState = Record<FieldValidityKey, boolean> & { valid: boolean };

export type FieldValidityData = {
    /** A snapshot of the control's ValidityState, or null before the first check. */
    state: FieldValidityState | null;
    /** Messages from `validate`, or the browser's validation message. */
    errors: string[];
    /** The value that was checked. */
    value: unknown;
};

export type FieldValidationMode = 'onSubmit' | 'onBlur' | 'onChange';

export type FieldContextValue = {
    rootClass: string;
    /** The id the control renders with; Label points at it with htmlFor. */
    controlId: string;
    /** A Control with its own id reports it so the Label still points at it. */
    setControlId: (id: string | undefined) => void;
    /** Ids of mounted Description and Error parts, in mount order, for aria-describedby. */
    describedBy: string | undefined;
    registerDescription: (id: string, kind: FieldDescriptionKind) => () => void;
    name?: string;
    invalid: boolean;
    disabled: boolean;
    required: boolean;
    touched: boolean;
    dirty: boolean;
    focused: boolean;
    /** The control holds a value: non-empty text, a checked box or a picked option. */
    filled: boolean;
    setTouched: (touched: boolean) => void;
    setDirty: (dirty: boolean) => void;
    setFocused: (focused: boolean) => void;
    setFilled: (filled: boolean) => void;
    /** Latest validation result, checked silently on every change. */
    validity: FieldValidityData;
    /** True once the result should be shown (after blur, change or submit, per `validationMode`). */
    validityShown: boolean;
    validationMode: FieldValidationMode;
    /** Runs native and custom validation; `show` reveals the result. Returns whether the field is valid. */
    validate: (show?: boolean) => boolean;
    /** `validate` after the root's `validationDebounceTime`. */
    validateDebounced: (show?: boolean) => void;
    /** True while an async `validate` is pending. */
    validating: boolean;
    /** Messages Field.Error shows by default: Form errors first, then validation errors. */
    errorMessages: string[];
    /** Clears this field's Form error once the user edits it. */
    clearFormError?: (name: string) => void;
    /** The control element, registered by Field.Control. */
    controlRef: React.MutableRefObject<HTMLElement | null>;
    /** Shared data-* state, spread on every part so each can be styled on its own. */
    stateAttributes: Record<string, string>;
};

const FieldContext = React.createContext<FieldContextValue | null>(null);

export const useFieldContext = (part: string): FieldContextValue => {
    const context = React.useContext(FieldContext);
    if (!context) {
        throw new Error(`Field.${part} must be rendered inside Field.Root.`);
    }
    return context;
};

const sameValue = (a: unknown, b: unknown) =>
    Object.is(a, b) || (Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((item, index) => Object.is(item, b[index])));

/**
 * For Rad UI controls other than Field.Control (Checkbox, Switch, Select, NumberField):
 * reports focus, blur, edits and whether the control is filled to the surrounding
 * Field, so `data-focused`, `data-touched`, `data-dirty` and `data-filled` follow it.
 * Spread `stateAttributes` on the control and call the handlers from its own.
 * Outside a Field it does nothing.
 */
export const useFieldInteraction = (value: unknown, filled: boolean) => {
    const field = React.useContext(FieldContext);
    const setFilled = field?.setFilled;
    const setDirty = field?.setDirty;
    const setFocused = field?.setFocused;
    const setTouched = field?.setTouched;
    const initialRef = React.useRef(value);
    const lastRef = React.useRef(value);

    useLayoutEffect(() => {
        setFilled?.(filled);
    }, [setFilled, filled]);

    React.useEffect(() => {
        if (sameValue(lastRef.current, value)) return;
        lastRef.current = value;
        // Back at the starting value (a reset) clears dirty; any other edit sets it.
        setDirty?.(!sameValue(initialRef.current, value));
    }, [setDirty, value]);

    const onFocus = React.useCallback(() => setFocused?.(true), [setFocused]);
    const onBlur = React.useCallback(() => {
        setFocused?.(false);
        setTouched?.(true);
    }, [setFocused, setTouched]);

    return { stateAttributes: field?.stateAttributes ?? null, onFocus, onBlur };
};

export const useFieldDescription = (id: string, kind: FieldDescriptionKind) => {
    const { registerDescription } = useFieldContext(kind === 'error' ? 'Error' : 'Description');
    useLayoutEffect(() => registerDescription(id, kind), [registerDescription, id, kind]);
};

export default FieldContext;

type FieldControlProps = {
    id?: string;
    name?: string;
    disabled?: boolean;
    required?: boolean;
    'aria-describedby'?: string;
    'aria-invalid'?: boolean | 'true' | 'false' | 'grammar' | 'spelling';
};

/**
 * Lets a Rad UI control (Checkbox, Switch, Select, NumberField) placed inside
 * Field.Root pick up the field's id (so Field.Label points at it), name,
 * disabled, required, description and invalid state. Its own props win.
 * Outside a Field it returns the props unchanged.
 */
export const useFieldControlProps = <P extends FieldControlProps>(props: P): P => {
    const field = React.useContext(FieldContext);
    if (!field) return props;
    return {
        ...props,
        id: props.id ?? field.controlId,
        name: props.name ?? field.name,
        disabled: props.disabled ?? (field.disabled || undefined),
        required: props.required ?? (field.required || undefined),
        'aria-describedby': [props['aria-describedby'], field.describedBy].filter(Boolean).join(' ') || undefined,
        'aria-invalid': props['aria-invalid'] ?? (field.invalid || undefined)
    };
};
