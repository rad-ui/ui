'use client';
import React, { useContext } from 'react';
import clsx from 'clsx';
import { X } from 'lucide-react';
import { ComboboxPrimitiveContext } from '~/core/primitives/Combobox/contexts/ComboboxPrimitiveContext';
import { ComboboxRootContext } from '../contexts/ComboboxRootContext';

export type ComboboxChip = {
    value: string;
    label: string;
    /** Deselects this value. */
    remove: () => void;
};

type ComboboxChipsElement = React.ElementRef<'div'>;
export type ComboboxChipsProps = Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> & {
    /** Custom chip rendering. Defaults to the label and a remove button. */
    children?: (chip: ComboboxChip) => React.ReactNode;
    /** Accessible label for each remove button. Defaults to "Remove <label>". */
    getRemoveLabel?: (label: string) => string;
};

/**
 * The selected values of a `multiple` Combobox as removable chips. Place it
 * next to the trigger; it renders nothing while no value is selected.
 */
const ComboboxChips = React.forwardRef<ComboboxChipsElement, ComboboxChipsProps>(({
    className,
    children,
    getRemoveLabel = (label) => `Remove ${label}`,
    ...props
}, forwardedRef) => {
    const { rootClass } = useContext(ComboboxRootContext);
    const { selectedValues, selectedLabels, removeValue, disabled } = useContext(ComboboxPrimitiveContext);

    if (!selectedValues?.length) return null;

    return (
        <div
            ref={forwardedRef}
            role="list"
            className={clsx(rootClass ? `${rootClass}-chips` : undefined, className) || undefined}
            data-slot="combobox-chips"
            {...props}
        >
            {selectedValues.map((value, index) => {
                const label = selectedLabels[index] ?? value;
                const remove = () => removeValue(value);
                return (
                    <span
                        key={value}
                        role="listitem"
                        className={clsx(rootClass ? `${rootClass}-chip` : undefined) || undefined}
                        data-slot="combobox-chip"
                        data-value={value}
                    >
                        {children ? children({ value, label, remove }) : (
                            <>
                                <span>{label}</span>
                                <button
                                    type="button"
                                    className={clsx(rootClass ? `${rootClass}-chip-remove` : undefined) || undefined}
                                    aria-label={getRemoveLabel(label)}
                                    disabled={disabled || undefined}
                                    onClick={remove}
                                    data-slot="combobox-chip-remove"
                                >
                                    <X width={12} height={12} aria-hidden="true" />
                                </button>
                            </>
                        )}
                    </span>
                );
            })}
        </div>
    );
});

ComboboxChips.displayName = 'ComboboxChips';

export default ComboboxChips;
