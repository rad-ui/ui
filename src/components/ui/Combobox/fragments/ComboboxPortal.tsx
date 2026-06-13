'use client';
import React from 'react';
import ComboboxPrimitive from '~/core/primitives/Combobox/ComboboxPrimitive';

export type ComboboxPortalProps = {
  children: React.ReactNode;
  container?: HTMLElement | null;
};

type ComboboxPortalElement = React.ElementRef<typeof ComboboxPrimitive.Portal>;
type ComboboxPortalPrimitiveProps = React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Portal> & ComboboxPortalProps;

const ComboboxPortal = React.forwardRef<ComboboxPortalElement, ComboboxPortalPrimitiveProps>(({ children, container, ...props }, forwardedRef) => {
    return (
        <ComboboxPrimitive.Portal ref={forwardedRef} container={container} {...props}>
            {children}
        </ComboboxPrimitive.Portal>

    );
});

ComboboxPortal.displayName = 'ComboboxPortal';

export default ComboboxPortal;
