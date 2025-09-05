'use client';
import React from 'react';
import SelectPrimitive from '~/core/primitives/Select/Select';

export type SelectPortalProps = {
  children: React.ReactNode;
};

type SelectPortalElement = React.ElementRef<typeof SelectPrimitive.Portal>;
type SelectPortalPrimitiveProps = React.ComponentPropsWithoutRef<typeof SelectPrimitive.Portal> & SelectPortalProps;

const SelectPortal = React.forwardRef<SelectPortalElement, SelectPortalPrimitiveProps>(({ children, ...props }, forwardedRef) => {
    return (
        <SelectPrimitive.Portal ref={forwardedRef} {...props}>
            {children}
        </SelectPrimitive.Portal>

    );
});

SelectPortal.displayName = 'SelectPortal';

export default SelectPortal;
