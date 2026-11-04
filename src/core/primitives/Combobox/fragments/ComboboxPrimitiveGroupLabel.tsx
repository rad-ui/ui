'use client';
import React from 'react';
import Primitive from '../../Primitive';
import useLayoutEffect from '~/core/hooks/useLayoutEffect';
import { useComboboxGroupContext } from '../contexts/ComboboxGroupContext';

export type ComboboxPrimitiveGroupLabelProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;

/** A heading for a Group of options; it names the group and can't be selected. */
const ComboboxPrimitiveGroupLabel = React.forwardRef<HTMLDivElement, ComboboxPrimitiveGroupLabelProps>(({ id, ...props }, ref) => {
    const group = useComboboxGroupContext();
    const setHasLabel = group?.setHasLabel;
    useLayoutEffect(() => {
        if (!setHasLabel) return;
        setHasLabel(true);
        return () => setHasLabel(false);
    }, [setHasLabel]);
    return <Primitive.div ref={ref} id={id ?? group?.labelId} role="presentation" {...props} />;
});

ComboboxPrimitiveGroupLabel.displayName = 'ComboboxPrimitiveGroupLabel';

export default ComboboxPrimitiveGroupLabel;
