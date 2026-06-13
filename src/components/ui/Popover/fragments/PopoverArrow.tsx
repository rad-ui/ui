'use client';

import React, { forwardRef, useContext } from 'react';
import clsx from 'clsx';
import PopoverPrimitive from '~/core/primitives/Popover';
import { PopoverContext } from '../context/PopoverContext';

export type PopoverArrowElement = React.ElementRef<typeof PopoverPrimitive.Arrow>;
export type PopoverArrowProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Arrow>;

const PopoverArrow = forwardRef<PopoverArrowElement, PopoverArrowProps>(({ className = '', ...props }, ref) => {
    const { rootClass } = useContext(PopoverContext);

    return (
        <PopoverPrimitive.Arrow
            ref={ref}
            className={clsx(rootClass && `${rootClass}-arrow`, className)}
            {...props}
        />
    );
});

PopoverArrow.displayName = 'PopoverArrow';

export default PopoverArrow;
