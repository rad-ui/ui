'use client';

import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import { createDataAttributes } from '~/core/hooks/createDataAttribute';
import FieldContext, {
    FieldDescriptionKind,
    FieldValidationMode,
    FieldValidityData,
    FieldValidityKey,
    FieldValidityState
} from '../contexts/FieldContext';

const COMPONENT_NAME = 'Field';

export type FieldRootElement = ElementRef<typeof Primitive.div>;
export type FieldRootProps = {
    /**
     * Forces the field invalid, for example after a server error: the control
     * gets aria-invalid and Field.Error renders. Validation can also mark it invalid.
     */
    invalid?: boolean;
    /**
     * Custom validation, run after the browser's own checks (required, type,
     * pattern, min/max...) pass. Return an error message, several, or null,
     * or a promise of one for async checks such as "is this username taken".
     */
    validate?: (value: unknown) => FieldValidateResult | Promise<FieldValidateResult>;
    /**
     * With `validationMode="onChange"`, wait this many ms after the last change
     * before validating, so async checks don't run on every keystroke.
     */
    validationDebounceTime?: number;
    /**
     * When validation results are shown. `onSubmit` (default) waits for a form
     * submit attempt, `onBlur` shows them when the control loses focus, and
     * `onChange` on every change. Once shown, they update as the user types.
     */
    validationMode?: FieldValidationMode;
    /** Disables the control and marks every part with data-disabled. */
    disabled?: boolean;
    /** Marks the control required. */
    required?: boolean;
    /** Form field name, passed to the control. */
    name?: string;
    /** Overrides the generated root class. */
    customRootClass?: string;
} & ComponentPropsWithoutRef<typeof Primitive.div>;

type ValidatableElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

type FieldValidateResult = string | string[] | null | undefined;

const VALIDITY_KEYS: FieldValidityKey[] = [
    'badInput',
    'customError',
    'patternMismatch',
    'rangeOverflow',
    'rangeUnderflow',
    'stepMismatch',
    'tooLong',
    'tooShort',
    'typeMismatch',
    'valueMissing'
];

const isCheckable = (control: ValidatableElement): control is HTMLInputElement =>
    control instanceof HTMLInputElement && (control.type === 'checkbox' || control.type === 'radio');

const snapshotValidity = (control: ValidatableElement): FieldValidityState => {
    const barred = control.willValidate === false;
    const state = { valid: barred || control.validity.valid } as FieldValidityState;
    VALIDITY_KEYS.forEach((key) => { state[key] = !barred && Boolean(control.validity[key]); });
    return state;
};

const FieldRoot = forwardRef<FieldRootElement, FieldRootProps>(({
    children,
    className,
    customRootClass = '',
    invalid: invalidProp = false,
    validate: validateProp,
    validationDebounceTime = 0,
    validationMode = 'onSubmit',
    disabled = false,
    required = false,
    name,
    ...props
}, ref) => {
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);
    const generatedId = React.useId();
    const [customControlId, setControlId] = React.useState<string | undefined>(undefined);
    const controlId = customControlId ?? `${generatedId}-control`;
    const [touched, setTouched] = React.useState(false);
    const [dirty, setDirty] = React.useState(false);
    const [focused, setFocused] = React.useState(false);

    // Description and Error parts register their ids so the control's accessible
    // description lists them, descriptions first and errors after.
    const [descriptions, setDescriptions] = React.useState<{ id: string; kind: FieldDescriptionKind }[]>([]);
    const registerDescription = React.useCallback((id: string, kind: FieldDescriptionKind) => {
        setDescriptions((entries) => (entries.some((entry) => entry.id === id) ? entries : [...entries, { id, kind }]));
        return () => setDescriptions((entries) => entries.filter((entry) => entry.id !== id));
    }, []);
    const describedBy = [
        ...descriptions.filter((entry) => entry.kind === 'description'),
        ...descriptions.filter((entry) => entry.kind === 'error')
    ].map((entry) => entry.id).join(' ') || undefined;

    const controlRef = React.useRef<HTMLElement | null>(null);
    const validateRef = React.useRef(validateProp);
    validateRef.current = validateProp;
    const [validity, setValidity] = React.useState<FieldValidityData>({ state: null, errors: [], value: undefined });
    const [validityShown, setValidityShown] = React.useState(false);
    const [validating, setValidating] = React.useState(false);
    // Each run gets an id so a slow async check can't overwrite a newer result.
    const runIdRef = React.useRef(0);

    const validate = React.useCallback((show = false) => {
        const control = controlRef.current as ValidatableElement | null;
        if (show) setValidityShown(true);
        if (!control || typeof control.setCustomValidity !== 'function' || !control.validity) return true;

        const value = isCheckable(control) ? control.checked : control.value;
        const runId = ++runIdRef.current;
        control.setCustomValidity('');

        const apply = (result: FieldValidateResult) => {
            let errors = (Array.isArray(result) ? result : [result]).filter((message): message is string => Boolean(message));
            // Feeding the message to the browser blocks native form submission too.
            control.setCustomValidity(errors[0] ?? '');
            const state = snapshotValidity(control);
            if (!errors.length && !state.valid && control.validationMessage) errors = [control.validationMessage];
            setValidity({ state, errors, value });
            return state.valid;
        };

        // Disabled controls are barred from constraint validation, and custom
        // checks only run once the browser's own checks pass.
        if (control.willValidate === false || !control.validity.valid || !validateRef.current) {
            setValidating(false);
            return apply(null);
        }
        const result = validateRef.current(value);
        if (result && typeof (result as Promise<FieldValidateResult>).then === 'function') {
            setValidating(true);
            const settle = (settled: FieldValidateResult) => {
                if (runId !== runIdRef.current) return;
                setValidating(false);
                apply(settled);
            };
            (result as Promise<FieldValidateResult>).then(settle, () => settle(null));
            // Still checking: not valid yet, so a Form submit waits for the result.
            return false;
        }
        setValidating(false);
        return apply(result as FieldValidateResult);
    }, []);

    // Debounced validation for onChange mode, used by Field.Control.
    const debounceTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
    React.useEffect(() => () => {
        if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    }, []);
    const validateDebounced = React.useCallback((show = false) => {
        if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
        if (validationDebounceTime <= 0) {
            validate(show);
            return;
        }
        debounceTimerRef.current = setTimeout(() => validate(show), validationDebounceTime);
    }, [validate, validationDebounceTime]);

    const invalid = invalidProp || (validityShown && validity.state?.valid === false);
    const valid = !invalid && validityShown && validity.state?.valid === true;

    const stateAttributes = React.useMemo(() => createDataAttributes('field', {
        invalid,
        valid,
        disabled,
        required,
        touched,
        dirty,
        focused,
        validating
    }) as Record<string, string>, [invalid, valid, disabled, required, touched, dirty, focused, validating]);

    const contextValue = React.useMemo(() => ({
        rootClass,
        controlId,
        setControlId,
        describedBy,
        registerDescription,
        name,
        invalid,
        disabled,
        required,
        touched,
        dirty,
        focused,
        setTouched,
        setDirty,
        setFocused,
        validity,
        validityShown,
        validationMode,
        validate,
        validateDebounced,
        validating,
        controlRef,
        stateAttributes
    }), [rootClass, controlId, describedBy, registerDescription, name, invalid, disabled, required, touched, dirty, focused, validity, validityShown, validationMode, validate, validateDebounced, validating, stateAttributes]);

    return (
        <FieldContext.Provider value={contextValue}>
            <Primitive.div
                ref={ref}
                className={clsx(rootClass, className)}
                {...props}
                {...stateAttributes}
                data-slot="field-root"
            >
                {children}
            </Primitive.div>
        </FieldContext.Provider>
    );
});

FieldRoot.displayName = COMPONENT_NAME;

export default FieldRoot;
