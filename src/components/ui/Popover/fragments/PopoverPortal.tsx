'use client';

import React from 'react';
import PopoverPrimitive from '~/core/primitives/Popover';

export type PopoverPortalProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Portal>;

const PopoverPortal = ({ children, ...props }: PopoverPortalProps) => {
    return <PopoverPrimitive.Portal {...props}>{children}</PopoverPrimitive.Portal>;
};

PopoverPortal.displayName = 'PopoverPortal';

export default PopoverPortal;
