'use client';
import React from 'react';
import ComboboxPrimitive from '~/core/primitives/Combobox/ComboboxPrimitive';
import type { ComboboxPrimitivePortalProps } from '~/core/primitives/Combobox/fragments/ComboboxPrimitivePortal';

export type ComboboxPortalProps = {
  children: React.ReactNode;
  container?: HTMLElement | null;
  forceMount?: boolean;
};

type ComboboxPortalElement = React.ElementRef<typeof ComboboxPrimitive.Portal>;
type ComboboxPortalPrimitiveProps = Omit<ComboboxPrimitivePortalProps, 'children'> & ComboboxPortalProps;

const ComboboxPortal = React.forwardRef<ComboboxPortalElement, ComboboxPortalPrimitiveProps>(({ children, container, forceMount, ...props }, forwardedRef) => {
    return (
        <ComboboxPrimitive.Portal ref={forwardedRef} container={container} forceMount={forceMount} {...props}>
            {children}
        </ComboboxPrimitive.Portal>

    );
});

ComboboxPortal.displayName = 'ComboboxPortal';

export default ComboboxPortal;
