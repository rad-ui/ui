'use client';
import clsx from 'clsx';
import React, { useContext } from 'react';
import { SelectRootContext } from '../contexts/SelectRootContext';
import useLayoutEffect from '~/core/hooks/useLayoutEffect';

export type SelectLabelProps = React.ComponentPropsWithoutRef<'label'>;

/** The select's visible label. It names the trigger, and clicking it focuses the trigger. */
const SelectLabel = React.forwardRef<HTMLLabelElement, SelectLabelProps>(({ className, onClick, ...props }, ref) => {
    const { rootClass, triggerId, labelId, setHasLabel } = useContext(SelectRootContext);
    useLayoutEffect(() => {
        setHasLabel?.(true);
        return () => setHasLabel?.(false);
    }, [setHasLabel]);
    return (
        <label
            ref={ref}
            id={labelId}
            htmlFor={triggerId}
            className={clsx(rootClass ? `${rootClass}-label` : undefined, className) || undefined}
            data-slot="select-label"
            {...props}
            onClick={(event) => {
                onClick?.(event);
                // A label activates a button it points at, which would open the list: focus it instead.
                if (event.defaultPrevented) return;
                event.preventDefault();
                (event.currentTarget.ownerDocument.getElementById(triggerId ?? '') as HTMLElement | null)?.focus();
            }}
        />
    );
});

SelectLabel.displayName = 'SelectLabel';

export default SelectLabel;
