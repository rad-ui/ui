'use client';

import React from 'react';
import type { FieldValidationMode } from '~/components/ui/Field/contexts/FieldContext';

export type FormErrors = Record<string, string | string[] | undefined>;

export type FormFieldEntry = {
    /** Runs the field's validation; `show` reveals the result. Returns whether it's valid. */
    validate: (show?: boolean) => boolean;
    controlRef: React.MutableRefObject<HTMLElement | null>;
};

export type FormContextValue = {
    /** Server errors keyed by field name, minus those cleared by editing. */
    errors: FormErrors;
    /** Clears a field's server error once the user edits it. */
    clearError: (name: string) => void;
    registerField: (id: string, entry: FormFieldEntry) => () => void;
    validationMode?: FieldValidationMode;
};

const FormContext = React.createContext<FormContextValue | null>(null);

export default FormContext;
