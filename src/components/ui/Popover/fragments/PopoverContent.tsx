'use client';

import React, { forwardRef, useContext } from 'react';
import clsx from 'clsx';
import PopoverPrimitive from '~/core/primitives/Popover';
import { PopoverContext } from '../context/PopoverContext';

export type PopoverContentElement = React.ElementRef<typeof PopoverPrimitive.Content>;
export type PopoverContentProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>;

const PopoverContent = forwardRef<PopoverContentElement, PopoverContentProps>(({ className = '', ...props }, ref) => {
    const { rootClass } = useContext(PopoverContext);

    return (
        <PopoverPrimitive.Content
            ref={ref}
            className={clsx(rootClass && `${rootClass}-content`, className)}
            {...props}
        />
    );
});

PopoverContent.displayName = 'PopoverContent';

export default PopoverContent;
