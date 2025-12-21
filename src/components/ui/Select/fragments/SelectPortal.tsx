'use client';
import React from 'react';
import ComboboxPrimitive from '~/core/primitives/Combobox/ComboboxPrimitive';

export type SelectPortalProps = {
  children: React.ReactNode;
  container?: HTMLElement | null;
};

type SelectPortalElement = React.ElementRef<typeof ComboboxPrimitive.Portal>;
type SelectPortalPrimitiveProps = React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Portal> & SelectPortalProps;

const SelectPortal = React.forwardRef<SelectPortalElement, SelectPortalPrimitiveProps>(({ children, container, ...props }, forwardedRef) => {
    return (
        <ComboboxPrimitive.Portal ref={forwardedRef} container={container} {...props}>
            {children}
        </ComboboxPrimitive.Portal>

    );
});

SelectPortal.displayName = 'SelectPortal';

export default SelectPortal;
