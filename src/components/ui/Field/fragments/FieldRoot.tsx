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
     * pattern, min/max...) pass. Return an error message, several, or null.
     */
    validate?: (value: unknown) => string | string[] | null | undefined;
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

    const validate = React.useCallback((show = false) => {
        const control = controlRef.current as ValidatableElement | null;
        if (show) setValidityShown(true);
        if (!control || typeof control.setCustomValidity !== 'function' || !control.validity) return true;

        const value = isCheckable(control) ? control.checked : control.value;
        control.setCustomValidity('');
        let errors: string[] = [];
        // Disabled controls are barred from constraint validation.
        if (control.willValidate !== false && control.validity.valid && validateRef.current) {
            const result = validateRef.current(value);
            errors = (Array.isArray(result) ? result : [result]).filter((message): message is string => Boolean(message));
            // Feeding the message to the browser blocks native form submission too.
            if (errors.length) control.setCustomValidity(errors[0]);
        }
        const state = snapshotValidity(control);
        if (!errors.length && !state.valid && control.validationMessage) errors = [control.validationMessage];
        setValidity({ state, errors, value });
        return state.valid;
    }, []);

    const invalid = invalidProp || (validityShown && validity.state?.valid === false);
    const valid = !invalid && validityShown && validity.state?.valid === true;

    const stateAttributes = React.useMemo(() => createDataAttributes('field', {
        invalid,
        valid,
        disabled,
        required,
        touched,
        dirty,
        focused
    }) as Record<string, string>, [invalid, valid, disabled, required, touched, dirty, focused]);

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
        controlRef,
        stateAttributes
    }), [rootClass, controlId, describedBy, registerDescription, name, invalid, disabled, required, touched, dirty, focused, validity, validityShown, validationMode, validate, stateAttributes]);

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
