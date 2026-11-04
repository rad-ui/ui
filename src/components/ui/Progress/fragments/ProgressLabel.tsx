'use client';
import React, { forwardRef, useContext } from 'react';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';
import useLayoutEffect from '~/core/hooks/useLayoutEffect';
import { ProgressContext } from '../contexts/ProgressContext';

export type ProgressLabelProps = React.ComponentPropsWithoutRef<typeof Primitive.span>;

/** A visible name for the progress; the root is labelled by it. */
const ProgressLabel = forwardRef<HTMLSpanElement, ProgressLabelProps>(({ className, id, ...props }, ref) => {
    const { rootClass, labelId, setHasLabel } = useContext(ProgressContext);
    useLayoutEffect(() => {
        if (!setHasLabel) return;
        setHasLabel(true);
        return () => setHasLabel(false);
    }, [setHasLabel]);
    return <Primitive.span ref={ref} id={id ?? labelId} className={clsx(rootClass && `${rootClass}-label`, className)} data-slot="progress-label" {...props} />;
});

ProgressLabel.displayName = 'ProgressLabel';

export default ProgressLabel;
