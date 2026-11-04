'use client';
import React, { useContext } from 'react';
import Primitive from '../../Primitive';
import { ComboboxPrimitiveContext } from '../contexts/ComboboxPrimitiveContext';
import { markAsComboboxSearchPart } from '../contexts/ComboboxSearchPart';

export type ComboboxPrimitiveEmptyProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;

/**
 * Shown when the typed text matches no option, such as "No results". It stays
 * mounted as a polite live region so screen readers announce it.
 */
const ComboboxPrimitiveEmpty = React.forwardRef<HTMLDivElement, ComboboxPrimitiveEmptyProps>(({ children, ...props }, ref) => {
    const { search, hiddenIndices, labelsRef, labelsVersion } = useContext(ComboboxPrimitiveContext);
    const isEmpty = React.useMemo(() => {
        if (!search) return false;
        return !labelsRef.current.some((label, index) => label != null && !hiddenIndices.includes(index));
        // labelsVersion changes when options register, so the ref is read again.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, hiddenIndices, labelsVersion]);

    return (
        <Primitive.div ref={ref} role="status" aria-live="polite" data-empty={isEmpty ? '' : undefined} hidden={!isEmpty} {...props}>
            {isEmpty ? children : null}
        </Primitive.div>
    );
});

ComboboxPrimitiveEmpty.displayName = 'ComboboxPrimitiveEmpty';
markAsComboboxSearchPart(ComboboxPrimitiveEmpty);

export default ComboboxPrimitiveEmpty;
