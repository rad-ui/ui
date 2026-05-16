'use client';

import React, { forwardRef, useContext } from 'react';
import ButtonPrimitive from '~/core/primitives/Button';
import { PopoverPrimitiveContext } from '../context/PopoverPrimitiveContext';

export type PopoverPrimitiveCloseProps = React.ComponentPropsWithoutRef<typeof ButtonPrimitive> & {
    asChild?: boolean;
};

const PopoverPrimitiveClose = forwardRef<HTMLButtonElement, PopoverPrimitiveCloseProps>(({
    children,
    asChild = false,
    onClick,
    ...props
}, ref) => {
    const { handleOpenChange } = useContext(PopoverPrimitiveContext);

    return (
        <ButtonPrimitive
            ref={ref}
            asChild={asChild}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                onClick?.(event);
                if (!event.defaultPrevented) {
                    handleOpenChange(false);
                }
            }}
            {...props}
        >
            {children}
        </ButtonPrimitive>
    );
});

PopoverPrimitiveClose.displayName = 'PopoverPrimitiveClose';

export default PopoverPrimitiveClose;
