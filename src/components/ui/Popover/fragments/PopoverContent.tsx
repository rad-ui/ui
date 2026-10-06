'use client';

import React, { forwardRef, useContext } from 'react';
import clsx from 'clsx';
import PopoverPrimitive from '~/core/primitives/Popover';
import { PopoverContext } from '../context/PopoverContext';

export type PopoverContentElement = React.ElementRef<typeof PopoverPrimitive.Content>;
export type PopoverContentProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>;

const PopoverContent = forwardRef<PopoverContentElement, PopoverContentProps>(({
    className = '',
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    'aria-describedby': ariaDescribedBy,
    ...props
}, ref) => {
    const { rootClass, titleId, descriptionId } = useContext(PopoverContext);

    // The content is a role="dialog", so give it an accessible name: an explicit
    // aria-label/aria-labelledby wins, otherwise Popover.Title is referenced.

    return (
        <PopoverPrimitive.Content
            ref={ref}
            className={clsx(rootClass && `${rootClass}-content`, className)}
            data-slot="popover-content"
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy ?? (ariaLabel ? undefined : titleId)}
            aria-describedby={ariaDescribedBy ?? descriptionId}
            {...props}
        />
    );
});

PopoverContent.displayName = 'PopoverContent';

export default PopoverContent;
