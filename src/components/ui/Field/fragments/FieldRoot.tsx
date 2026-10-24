'use client';

import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import { createDataAttributes } from '~/core/hooks/createDataAttribute';
import FieldContext, { FieldDescriptionKind } from '../contexts/FieldContext';

const COMPONENT_NAME = 'Field';

export type FieldRootElement = ElementRef<typeof Primitive.div>;
export type FieldRootProps = {
    /** Marks the field invalid: the control gets aria-invalid and Field.Error renders. */
    invalid?: boolean;
    /** Disables the control and marks every part with data-disabled. */
    disabled?: boolean;
    /** Marks the control required. */
    required?: boolean;
    /** Form field name, passed to the control. */
    name?: string;
    /** Overrides the generated root class. */
    customRootClass?: string;
} & ComponentPropsWithoutRef<typeof Primitive.div>;

const FieldRoot = forwardRef<FieldRootElement, FieldRootProps>(({
    children,
    className,
    customRootClass = '',
    invalid = false,
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

    const stateAttributes = React.useMemo(() => createDataAttributes('field', {
        invalid,
        disabled,
        required,
        touched,
        dirty,
        focused
    }) as Record<string, string>, [invalid, disabled, required, touched, dirty, focused]);

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
        stateAttributes
    }), [rootClass, controlId, describedBy, registerDescription, name, invalid, disabled, required, touched, dirty, focused, stateAttributes]);

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
