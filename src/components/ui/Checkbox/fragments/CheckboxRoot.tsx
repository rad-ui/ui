import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import CheckboxPrimitiveRoot from '~/core/primitives/Checkbox/fragments/CheckboxPrimitiveRoot';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import CheckboxContext from '../context/CheckboxContext';
import clsx from 'clsx';
import { createDataAttributes, composeAttributes, createDataAccentColorAttribute } from '~/core/hooks/createDataAttribute';
import { useFieldControlProps, useFieldInteraction } from '~/components/ui/Field/contexts/FieldContext';
import composeEventHandlers from '~/core/hooks/composeEventHandlers';

const COMPONENT_NAME = 'Checkbox';

export type CheckboxRootElement = ElementRef<typeof CheckboxPrimitiveRoot>;
export type CheckboxRootProps = {
    customRootClass?: string;
    color?: string;
    variant?: string;
    size?: string;
} & ComponentPropsWithoutRef<typeof CheckboxPrimitiveRoot>;

const CheckboxRoot = forwardRef<CheckboxRootElement, CheckboxRootProps>((fieldAwareProps, ref) => {
    const { children, className = '', customRootClass, color = '', variant, size, onCheckedChange, onFocus, onBlur, ...props } = useFieldControlProps(fieldAwareProps);
    // Mirror the checked state (kept by the primitive) so a surrounding Field can track it.
    const [uncontrolledChecked, setUncontrolledChecked] = React.useState<boolean | 'indeterminate' | null>(props.defaultChecked ?? false);
    const checkedState = props.indeterminate ? 'indeterminate' : (props.checked !== undefined ? props.checked : uncontrolledChecked);
    const field = useFieldInteraction(checkedState, checkedState === true);
    const handleCheckedChange = React.useCallback((next: boolean | 'indeterminate' | null) => {
        setUncontrolledChecked(next);
        onCheckedChange?.(next);
    }, [onCheckedChange]);
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);

    const dataAttributes = createDataAttributes('checkbox', { variant, size });
    const accentAttributes = createDataAccentColorAttribute(color);
    const composedAttributes = composeAttributes(dataAttributes, accentAttributes, {
        'data-slot': 'checkbox-root'
    });

    return <CheckboxContext.Provider value={{ rootClass }}>
        <CheckboxPrimitiveRoot
            ref={ref}
            className={clsx(rootClass, className)}
            {...field.stateAttributes}
            {...props}
            {...composedAttributes}
            onCheckedChange={handleCheckedChange}
            onFocus={composeEventHandlers(onFocus, field.onFocus)}
            onBlur={composeEventHandlers(onBlur, field.onBlur)}
        >
            {children}
        </CheckboxPrimitiveRoot>
    </CheckboxContext.Provider>;
});

CheckboxRoot.displayName = COMPONENT_NAME;

export default CheckboxRoot;
