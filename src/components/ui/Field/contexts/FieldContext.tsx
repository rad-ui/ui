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
    setTouched: (touched: boolean) => void;
    setDirty: (dirty: boolean) => void;
    setFocused: (focused: boolean) => void;
    /** Latest validation result, checked silently on every change. */
    validity: FieldValidityData;
    /** True once the result should be shown (after blur, change or submit, per `validationMode`). */
    validityShown: boolean;
    validationMode: FieldValidationMode;
    /** Runs native and custom validation; `show` reveals the result. Returns whether the field is valid. */
    validate: (show?: boolean) => boolean;
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

export const useFieldDescription = (id: string, kind: FieldDescriptionKind) => {
    const { registerDescription } = useFieldContext(kind === 'error' ? 'Error' : 'Description');
    useLayoutEffect(() => registerDescription(id, kind), [registerDescription, id, kind]);
};

export default FieldContext;
