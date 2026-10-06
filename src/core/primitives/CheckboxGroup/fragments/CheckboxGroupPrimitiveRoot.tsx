import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import { useControllableState } from '~/core/hooks/useControllableState';
import CheckboxGroupPrimitiveContext from '../context/CheckboxGroupPrimitiveContext';
import { mergeRefs } from '~/core/utils/mergeRefs';

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
} & ComponentPropsWithoutRef<'div'>;

const CheckboxGroupPrimitiveRoot = forwardRef<CheckboxGroupPrimitiveRootElement, CheckboxGroupPrimitiveRootProps>(({ dir, orientation, loop, defaultValue = [], value, onValueChange, children, name, required, disabled, className = '', ...props }, ref) => {
    const [checkedValues, setCheckedValues] = useControllableState(
        value,
        defaultValue,
        onValueChange
    );
    const rootRef = React.useRef<HTMLDivElement>(null);
    const defaultValueRef = React.useRef(defaultValue);

    // Return to the initial selection when the owning form resets, like native checkboxes.
    React.useEffect(() => {
        const form = rootRef.current?.closest('form');
        if (!form) return;
        const handleReset = () => setCheckedValues(defaultValueRef.current);
        form.addEventListener('reset', handleReset);
        return () => form.removeEventListener('reset', handleReset);
    }, [setCheckedValues]);

    return (
        <div ref={mergeRefs(ref, rootRef)} className={className} data-disabled={disabled ? '' : undefined} {...props}>
            {/* Checkboxes are often stacked vertically, so arrow keys move in both axes by default. */}
            <RovingFocusGroup.Root dir={dir} orientation={orientation ?? 'both'} loop={loop ?? true}>
                <CheckboxGroupPrimitiveContext.Provider value={{ checkedValues, setCheckedValues, name, required, disabled }}>
                    <RovingFocusGroup.Group>
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
