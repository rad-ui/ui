import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import { useControllableState } from '~/core/hooks/useControllableState';
import { useFormReset } from '~/core/hooks/useFormReset';
import CheckboxGroupPrimitiveContext from '../context/CheckboxGroupPrimitiveContext';
import { mergeRefs } from '~/core/utils/mergeRefs';
import { useDirection } from '~/core/hooks/useDirection';

export type CheckboxGroupPrimitiveRootElement = ElementRef<'div'>;
export type CheckboxGroupPrimitiveRootProps = {
    name?: string;
    required?: boolean;
    disabled?: boolean;
    dir?: 'ltr' | 'rtl';
    orientation?: 'horizontal' | 'vertical' | 'both';
    loop?: boolean;
    defaultValue?: string[];
    value?: string[];
    onValueChange?: (value: string[]) => void;
    /** Every item's value. Needed for a parent checkbox that checks or clears them all. */
    allValues?: string[];
} & ComponentPropsWithoutRef<'div'>;

const CheckboxGroupPrimitiveRoot = forwardRef<CheckboxGroupPrimitiveRootElement, CheckboxGroupPrimitiveRootProps>(({ dir: dirProp, orientation, loop, defaultValue = [], value, onValueChange, children, name, required, disabled, allValues, className = '', ...props }, ref) => {
    const dir = useDirection(dirProp);
    const [checkedValues, setCheckedValues] = useControllableState(
        value,
        defaultValue,
        onValueChange
    );
    const rootRef = React.useRef<HTMLDivElement>(null);
    const defaultValueRef = React.useRef(defaultValue);

    // Return to the initial selection when the owning form resets, like native checkboxes.
    useFormReset(() => rootRef.current?.closest('form'), () => setCheckedValues(defaultValueRef.current), [setCheckedValues]);

    return (
        <div ref={mergeRefs(ref, rootRef)} className={className} data-disabled={disabled ? '' : undefined} {...props}>
            {/* Checkboxes are often stacked vertically, so arrow keys move in both axes by default. */}
            <RovingFocusGroup.Root dir={dir} orientation={orientation ?? 'both'} loop={loop ?? true}>
                <CheckboxGroupPrimitiveContext.Provider value={{ checkedValues, setCheckedValues, name, required, disabled, allValues }}>
                    {/* Always a wrapper: merged onto a single child, the group role and id would
                        land on that child (often a <label>, which then stops naming its control). */}
                    <RovingFocusGroup.Group asChild={false}>
                        {children}
                    </RovingFocusGroup.Group>
                </CheckboxGroupPrimitiveContext.Provider>
            </RovingFocusGroup.Root>
            {required && (
                // A required group needs at least one checked item. This unnamed input never adds a
                // FormData entry; it only lets native constraint validation block submission.
                <input
                    type="checkbox"
                    aria-hidden="true"
                    tabIndex={-1}
                    required
                    checked={checkedValues.length > 0}
                    disabled={disabled}
                    onChange={() => {}}
                    style={{ position: 'absolute', width: 1, height: 1, margin: 0, opacity: 0, pointerEvents: 'none' }}
                />
            )}
        </div>
    );
});

CheckboxGroupPrimitiveRoot.displayName = 'CheckboxGroupPrimitiveRoot';

export default CheckboxGroupPrimitiveRoot;
