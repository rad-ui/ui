'use client';
import React, { useContext } from 'react';
import Primitive from '../../Primitive';
import { ComboboxPrimitiveContext } from '../contexts/ComboboxPrimitiveContext';

export type ComboboxPrimitiveClearProps = React.ComponentPropsWithoutRef<typeof Primitive.button> & {
    /** Keep the button rendered while there's nothing to clear. */
    forceMount?: boolean;
};

/** A button that clears the selection and typed text. It hides while there's nothing to clear. */
const ComboboxPrimitiveClear = React.forwardRef<HTMLButtonElement, ComboboxPrimitiveClearProps>(({ forceMount = false, onClick, children, ...props }, ref) => {
    const { selectedValue, selectedValues, search, clearValue, disabled } = useContext(ComboboxPrimitiveContext);
    const hasValue = Boolean(selectedValue || search || selectedValues.length);
    if (!hasValue && !forceMount) return null;
    return (
        <Primitive.button
            ref={ref}
            type="button"
            aria-label="Clear"
            disabled={disabled || !hasValue || undefined}
            data-disabled={disabled || !hasValue ? '' : undefined}
            {...props}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                onClick?.(event);
                if (event.defaultPrevented) return;
                clearValue();
            }}
        >
            {children ?? '×'}
        </Primitive.button>
    );
});

ComboboxPrimitiveClear.displayName = 'ComboboxPrimitiveClear';

export default ComboboxPrimitiveClear;
