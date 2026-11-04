'use client';
import React, { useContext } from 'react';
import Primitive from '../../Primitive';
import { ComboboxPrimitiveContext } from '../contexts/ComboboxPrimitiveContext';
import { markAsComboboxSearchPart } from '../contexts/ComboboxSearchPart';

export type ComboboxStatusState = {
    /** Options showing for the current text. */
    count: number;
    /** The typed text. */
    query: string;
};

export type ComboboxPrimitiveStatusProps = Omit<React.ComponentPropsWithoutRef<typeof Primitive.div>, 'children'> & {
    /** What to announce, from the number of matching options. Defaults to "N results". */
    children?: React.ReactNode | ((state: ComboboxStatusState) => React.ReactNode);
};

const defaultMessage = ({ count }: ComboboxStatusState) => `${count} ${count === 1 ? 'result' : 'results'}`;

/**
 * A polite live region that announces how many options match as the user types,
 * such as "3 results". Visually hide it if it shouldn't show.
 */
const ComboboxPrimitiveStatus = React.forwardRef<HTMLDivElement, ComboboxPrimitiveStatusProps>(({ children, ...props }, ref) => {
    const { search, hiddenIndices, labelsRef, labelsVersion, isOpen } = useContext(ComboboxPrimitiveContext);
    const count = React.useMemo(() => labelsRef.current.filter((label, index) => label != null && !hiddenIndices.includes(index)).length,
        // labelsVersion changes when options register, so the ref is read again.
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [hiddenIndices, labelsVersion]);
    // Only speak while the list is open and the user has typed, so it isn't noise on open.
    const state = { count, query: search };
    const message = isOpen && search
        ? (typeof children === 'function' ? children(state) : children ?? defaultMessage(state))
        : null;

    return (
        <Primitive.div ref={ref} role="status" aria-live="polite" aria-atomic="true" data-count={count} {...props}>
            {message}
        </Primitive.div>
    );
});

ComboboxPrimitiveStatus.displayName = 'ComboboxPrimitiveStatus';
markAsComboboxSearchPart(ComboboxPrimitiveStatus);

export default ComboboxPrimitiveStatus;
