'use client';

import React, { forwardRef, useContext } from 'react';
import clsx from 'clsx';
import PopoverPrimitive from '~/core/primitives/Popover';
import { PopoverContext } from '../context/PopoverContext';

export type PopoverCloseElement = React.ElementRef<typeof PopoverPrimitive.Close>;
export type PopoverCloseProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Close>;

const PopoverClose = forwardRef<PopoverCloseElement, PopoverCloseProps>(({ className = '', ...props }, ref) => {
    const { rootClass } = useContext(PopoverContext);

    return (
        <PopoverPrimitive.Close
            ref={ref}
            className={clsx(rootClass && `${rootClass}-close`, className)}
            {...props}
        />
    );
});

PopoverClose.displayName = 'PopoverClose';

export default PopoverClose;
