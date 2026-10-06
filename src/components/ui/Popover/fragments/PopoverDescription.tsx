'use client';

import React, { forwardRef, useContext, useEffect } from 'react';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';
import Floater from '~/core/primitives/Floater';
import { PopoverContext } from '../context/PopoverContext';

export type PopoverDescriptionElement = React.ElementRef<typeof Primitive.p>;
export type PopoverDescriptionProps = React.ComponentPropsWithoutRef<typeof Primitive.p> & {
    asChild?: boolean;
};

/** Text that describes the popover content (aria-describedby). */
const PopoverDescription = forwardRef<PopoverDescriptionElement, PopoverDescriptionProps>(({ className = '', id, children, ...props }, ref) => {
    const { rootClass, setDescriptionId } = useContext(PopoverContext);
    const generatedId = Floater.useId();
    const resolvedId = id ?? generatedId;

    useEffect(() => {
        setDescriptionId(resolvedId);
        return () => setDescriptionId(undefined);
    }, [resolvedId, setDescriptionId]);

    return (
        <Primitive.p
            ref={ref}
            id={resolvedId}
            className={clsx(rootClass && `${rootClass}-description`, className)}
            data-slot="popover-description"
            {...props}
        >
            {children}
        </Primitive.p>
    );
});

PopoverDescription.displayName = 'PopoverDescription';

export default PopoverDescription;
