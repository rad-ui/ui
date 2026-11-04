'use client';
import React from 'react';
import ComboboxPrimitive from '~/core/primitives/Combobox/ComboboxPrimitive';
import type { ComboboxPrimitivePortalProps } from '~/core/primitives/Combobox/fragments/ComboboxPrimitivePortal';

export type AutocompletePortalProps = {
  children: React.ReactNode;
  container?: HTMLElement | null;
  forceMount?: boolean;
};

type AutocompletePortalElement = React.ElementRef<typeof ComboboxPrimitive.Portal>;
type AutocompletePortalPrimitiveProps = Omit<ComboboxPrimitivePortalProps, 'children'> & AutocompletePortalProps;

const AutocompletePortal = React.forwardRef<AutocompletePortalElement, AutocompletePortalPrimitiveProps>(({ children, container, forceMount, ...props }, forwardedRef) => {
    return (
        <ComboboxPrimitive.Portal ref={forwardedRef} container={container} forceMount={forceMount} {...props}>
            {children}
        </ComboboxPrimitive.Portal>

    );
});

AutocompletePortal.displayName = 'AutocompletePortal';

export default AutocompletePortal;
