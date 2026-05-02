'use client';

import React, { forwardRef } from 'react';
import PopoverPrimitive from '~/core/primitives/Popover';

export type PopoverPortalElement = React.ElementRef<'div'>;
export type PopoverPortalProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Portal>;

const PopoverPortal = forwardRef<PopoverPortalElement, PopoverPortalProps>(({ children, ...props }, _ref) => {
    return <PopoverPrimitive.Portal {...props}>{children}</PopoverPrimitive.Portal>;
});

PopoverPortal.displayName = 'PopoverPortal';

export default PopoverPortal;
