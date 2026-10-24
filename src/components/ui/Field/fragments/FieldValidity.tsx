'use client';

import React from 'react';
import { FieldValidityData, useFieldContext } from '../contexts/FieldContext';

export type FieldValidityRenderProps = FieldValidityData & {
    /** Whether the field currently counts as invalid (shown result or the `invalid` prop). */
    invalid: boolean;
    /** Whether the result is being shown yet, per `validationMode`. */
    shown: boolean;
};

export type FieldValidityProps = {
    children: (validity: FieldValidityRenderProps) => React.ReactNode;
};

/** Renders custom UI from the field's validity, such as a password strength list. */
const FieldValidity = ({ children }: FieldValidityProps) => {
    const { validity, validityShown, invalid } = useFieldContext('Validity');
    return <>{children({ ...validity, invalid, shown: validityShown })}</>;
};

FieldValidity.displayName = 'FieldValidity';

export default FieldValidity;
