'use client';
import React from 'react';
import SelectPrimitive from '~/core/primitives/Select/ComboboxPrimitive';

export type SelectPortalProps = {
  children: React.ReactNode;
  container?: HTMLElement | null;
};

type SelectPortalElement = React.ElementRef<typeof SelectPrimitive.Portal>;
type SelectPortalPrimitiveProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Portal> & SelectPortalProps;

const SelectPortal = React.forwardRef<SelectPortalElement, SelectPortalPrimitiveProps>(({ children, container, ...props }, forwardedRef) => {
    return (
        <SelectPrimitive.Portal ref={forwardedRef} container={container} {...props}>
            {children}
        </SelectPrimitive.Portal>

    );
});

SelectPortal.displayName = 'SelectPortal';

export default SelectPortal;
