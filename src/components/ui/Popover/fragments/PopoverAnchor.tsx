'use client';

import React, { forwardRef, useContext } from 'react';
import clsx from 'clsx';
import PopoverPrimitive from '~/core/primitives/Popover';
import { PopoverContext } from '../context/PopoverContext';

export type PopoverAnchorElement = React.ElementRef<typeof PopoverPrimitive.Anchor>;
export type PopoverAnchorProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Anchor>;

const PopoverAnchor = forwardRef<PopoverAnchorElement, PopoverAnchorProps>(({ className = '', ...props }, ref) => {
    const { rootClass } = useContext(PopoverContext);

    return (
        <PopoverPrimitive.Anchor
            ref={ref}
            className={clsx(rootClass && `${rootClass}-anchor`, className)}
            {...props}
        />
    );
});

PopoverAnchor.displayName = 'PopoverAnchor';

export default PopoverAnchor;
