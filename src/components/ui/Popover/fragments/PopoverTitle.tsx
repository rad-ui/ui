'use client';

import React, { forwardRef, useContext, useEffect } from 'react';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';
import Floater from '~/core/primitives/Floater';
import { PopoverContext } from '../context/PopoverContext';

export type PopoverTitleElement = React.ElementRef<typeof Primitive.h2>;
export type PopoverTitleProps = React.ComponentPropsWithoutRef<typeof Primitive.h2> & {
    asChild?: boolean;
};

/** Heading that labels the popover content (aria-labelledby). */
const PopoverTitle = forwardRef<PopoverTitleElement, PopoverTitleProps>(({ className = '', id, children, ...props }, ref) => {
    const { rootClass, setTitleId } = useContext(PopoverContext);
    const generatedId = Floater.useId();
    const resolvedId = id ?? generatedId;

    useEffect(() => {
        setTitleId(resolvedId);
        return () => setTitleId(undefined);
    }, [resolvedId, setTitleId]);

    return (
        <Primitive.h2
            ref={ref}
            id={resolvedId}
            className={clsx(rootClass && `${rootClass}-title`, className)}
            data-slot="popover-title"
            {...props}
        >
            {children}
        </Primitive.h2>
    );
});

PopoverTitle.displayName = 'PopoverTitle';

export default PopoverTitle;
