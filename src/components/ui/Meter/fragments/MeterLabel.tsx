'use client';
import React, { forwardRef, useContext } from 'react';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';
import useLayoutEffect from '~/core/hooks/useLayoutEffect';
import { MeterContext } from '../contexts/MeterContext';

export type MeterLabelProps = React.ComponentPropsWithoutRef<typeof Primitive.span>;

/** A visible name for the meter; the root is labelled by it. */
const MeterLabel = forwardRef<HTMLSpanElement, MeterLabelProps>(({ className, id, ...props }, ref) => {
    const { rootClass, labelId, setHasLabel } = useContext(MeterContext);
    useLayoutEffect(() => {
        if (!setHasLabel) return;
        setHasLabel(true);
        return () => setHasLabel(false);
    }, [setHasLabel]);
    return <Primitive.span ref={ref} id={id ?? labelId} className={clsx(rootClass && `${rootClass}-label`, className)} data-slot="meter-label" {...props} />;
});

MeterLabel.displayName = 'MeterLabel';

export default MeterLabel;
