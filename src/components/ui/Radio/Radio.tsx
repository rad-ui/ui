'use client';
import React from 'react';
import RadioPrimitive, { RadioPrimitiveProps } from '~/core/primitives/Radio';

import clsx from 'clsx';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';

import { createDataAttributes, composeAttributes, createDataAccentColorAttribute } from '~/core/hooks/createDataAttribute';
import useControllableState from '~/core/hooks/useControllableState';
import { mergeRefs } from '~/core/utils/mergeRefs';

const COMPONENT_NAME = 'Radio';

export type RadioElement = React.ElementRef<typeof RadioPrimitive>;

export type RadioProps = Omit<RadioPrimitiveProps, 'size'> & {
    customRootClass?: string;
    className?: string;
    size?: string;
    color?: string;
    variant?: string;
};

const Radio = React.forwardRef<RadioElement, RadioProps>(function Radio(
    { name, value, id, checked, defaultChecked, required, onChange, disabled, asChild, className, customRootClass, variant = '', size = '', color = '', ...props },
    ref
) {
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const isControlled = checked !== undefined;
    const [isChecked, setIsChecked] = useControllableState(checked, Boolean(defaultChecked), () => {
        onChange?.();
    });

    // Native radios uncheck their same-name siblings without firing change on them,
    // so uncontrolled radios listen for a sibling's change to keep their state in sync.
    React.useEffect(() => {
        const input = inputRef.current;
        if (isControlled || !input || !name) return;

        const doc = input.ownerDocument;
        const handleSiblingChange = (event: Event) => {
            const target = event.target;
            if (
                target !== input &&
                target instanceof HTMLInputElement &&
                target.type === 'radio' &&
                target.name === name &&
                target.form === input.form
            ) {
                setIsChecked(false);
            }
        };

        doc.addEventListener('change', handleSiblingChange, true);
        return () => doc.removeEventListener('change', handleSiblingChange, true);
    }, [isControlled, name, setIsChecked]);

    const dataAttributes = createDataAttributes('button', { variant, size });
    const accentAttributes = createDataAccentColorAttribute(color);
    const composedAttributes = composeAttributes(dataAttributes, accentAttributes, {
        'data-slot': 'radio-root',
        'data-state': isChecked ? 'checked' : 'unchecked',
        'data-disabled': disabled ? '' : undefined
    });

    // A radio can only be checked by user interaction; unchecking happens via its siblings.
    const handleChange = () => {
        if (!isChecked) setIsChecked(true);
    };
    return (
        <RadioPrimitive
            ref={mergeRefs(ref, inputRef)}
            name={name}
            id={id}
            value={value}
            checked={isChecked}
            required={required}
            onChange={handleChange}
            disabled={disabled}
            asChild={asChild}
            className={clsx(rootClass, className)}
            {...props}
            data-checked={isChecked}
            {...composedAttributes}
        />

    );
});

Radio.displayName = COMPONENT_NAME;

export default Radio;
