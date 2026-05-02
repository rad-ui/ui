'use client';

import React, { forwardRef, useContext } from 'react';
import clsx from 'clsx';
import PopoverPrimitive from '~/core/primitives/Popover';
import { PopoverContext } from '../context/PopoverContext';

export type PopoverTriggerElement = React.ElementRef<typeof PopoverPrimitive.Trigger>;
export type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>;

const PopoverTrigger = forwardRef<PopoverTriggerElement, PopoverTriggerProps>(({ className = '', ...props }, ref) => {
    const { rootClass } = useContext(PopoverContext);

    return (
        <PopoverPrimitive.Trigger
            ref={ref}
            className={clsx(rootClass && `${rootClass}-trigger`, className)}
            {...props}
        />
    );
});

PopoverTrigger.displayName = 'PopoverTrigger';

export default PopoverTrigger;
