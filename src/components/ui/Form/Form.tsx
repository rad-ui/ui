'use client';

import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import type { FieldValidationMode } from '~/components/ui/Field/contexts/FieldContext';
import FormContext, { FormErrors, FormFieldEntry } from './contexts/FormContext';

const COMPONENT_NAME = 'Form';

export type FormValues = Record<string, FormDataEntryValue | FormDataEntryValue[]>;

export type FormElement = ElementRef<typeof Primitive.form>;
export type FormProps = {
    /**
     * Errors keyed by field `name`, typically from the server. Each shows on its
     * Field and clears when the user edits that field.
     */
    errors?: FormErrors;
    /** Called when the user edits a field that has an error from `errors`. */
    onClearErrors?: (errors: FormErrors) => void;
    /**
     * Called with the form's values once every field is valid. Providing it
     * prevents the browser's default submission.
     */
    onFormSubmit?: (values: FormValues, event: React.FormEvent<HTMLFormElement>) => void;
    /** Default `validationMode` for every Field inside. Defaults to `onSubmit`. */
    validationMode?: FieldValidationMode;
    /** Overrides the generated root class. */
    customRootClass?: string;
} & ComponentPropsWithoutRef<typeof Primitive.form>;

const readValues = (form: HTMLFormElement): FormValues => {
    const values: FormValues = {};
    new FormData(form).forEach((value, key) => {
        const existing = values[key];
        if (existing === undefined) values[key] = value;
        else values[key] = Array.isArray(existing) ? [...existing, value] : [existing, value];
    });
    return values;
};

const byDocumentOrder = (a: HTMLElement | null, b: HTMLElement | null) => {
    if (!a || !b) return 0;
    return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
};

/**
 * A form that validates its Fields before submitting. Invalid fields show their
 * errors and the first one is focused; server errors passed as `errors` show on
 * the matching Field until the user edits it.
 */
const Form = forwardRef<FormElement, FormProps>(({
    children,
    className,
    customRootClass = '',
    errors: errorsProp,
    onClearErrors,
    onFormSubmit,
    validationMode,
    onSubmit,
    noValidate = true,
    ...props
}, ref) => {
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);
    const fieldsRef = React.useRef(new Map<string, FormFieldEntry>());

    // New `errors` (a new server response) replace the cleared set. Compared by
    // content, so an inline object doesn't bring cleared errors back on every render.
    const [errors, setErrors] = React.useState<FormErrors>(errorsProp ?? {});
    const errorsKey = JSON.stringify(errorsProp ?? {});
    React.useEffect(() => {
        setErrors(JSON.parse(errorsKey));
    }, [errorsKey]);

    const onClearErrorsRef = React.useRef(onClearErrors);
    onClearErrorsRef.current = onClearErrors;
    const clearError = React.useCallback((name: string) => {
        setErrors((current) => {
            if (current[name] === undefined) return current;
            const next = { ...current };
            delete next[name];
            onClearErrorsRef.current?.(next);
            return next;
        });
    }, []);

    const registerField = React.useCallback((id: string, entry: FormFieldEntry) => {
        fieldsRef.current.set(id, entry);
        return () => { fieldsRef.current.delete(id); };
    }, []);

    const contextValue = React.useMemo(() => ({
        errors,
        clearError,
        registerField,
        validationMode
    }), [errors, clearError, registerField, validationMode]);

    // Set after pending async checks pass, so the resubmit skips straight to submitting.
    const skipValidationRef = React.useRef(false);

    const submit = (event: React.FormEvent<HTMLFormElement>) => {
        onSubmit?.(event);
        if (onFormSubmit) {
            event.preventDefault();
            onFormSubmit(readValues(event.currentTarget), event);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        if (skipValidationRef.current) {
            skipValidationRef.current = false;
            submit(event);
            return;
        }
        const form = event.currentTarget;
        const invalidControls: Array<HTMLElement | null> = [];
        const pendingChecks: Array<Promise<HTMLElement | null>> = [];
        const fieldControls = new Set<Element | null>();
        fieldsRef.current.forEach((field) => {
            fieldControls.add(field.controlRef.current);
            const valid = field.validate(true);
            const pending = field.pending();
            if (pending) pendingChecks.push(pending.then((settled) => (settled ? null : field.controlRef.current)));
            else if (!valid) invalidControls.push(field.controlRef.current);
        });
        // Controls outside a Field still get the browser's checks, which `noValidate` turns off.
        Array.from(form.elements).forEach((element) => {
            const control = element as HTMLInputElement;
            if (fieldControls.has(control) || !control.willValidate || typeof control.checkValidity !== 'function') return;
            if (!control.checkValidity()) invalidControls.push(control);
        });

        const focusFirst = (controls: Array<HTMLElement | null>) => {
            const first = controls.filter(Boolean).sort(byDocumentOrder)[0];
            if (!first) return;
            first.focus();
            // A control without a Field has nowhere to show its error but the browser's bubble.
            if (!fieldControls.has(first)) (first as HTMLInputElement).reportValidity?.();
        };

        if (invalidControls.length) {
            event.preventDefault();
            focusFirst(invalidControls);
            return;
        }
        if (pendingChecks.length) {
            // Wait for async checks such as "is this username taken", then submit if they pass.
            event.preventDefault();
            const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLElement | null;
            Promise.all(pendingChecks).then((results) => {
                if (!form.isConnected) return;
                const failed = results.filter(Boolean);
                if (failed.length) {
                    focusFirst(failed);
                    return;
                }
                skipValidationRef.current = true;
                if (submitter && submitter.isConnected) form.requestSubmit(submitter);
                else form.requestSubmit();
            });
            return;
        }
        submit(event);
    };

    return (
        <FormContext.Provider value={contextValue}>
            <Primitive.form
                ref={ref}
                className={clsx(rootClass, className)}
                // Fields show their own errors, so the browser's bubbles are off.
                noValidate={noValidate}
                {...props}
                onSubmit={handleSubmit}
                data-slot="form"
            >
                {children}
            </Primitive.form>
        </FormContext.Provider>
    );
});

Form.displayName = COMPONENT_NAME;

export type { FormErrors } from './contexts/FormContext';
export default Form;
