'use client';
import React, { useContext } from 'react';
import ComboboxPrimitive from '~/core/primitives/Combobox/ComboboxPrimitive';
import ThemeContext from '~/components/ui/Theme/ThemeContext';
import type { ComboboxPrimitivePortalProps } from '~/core/primitives/Combobox/fragments/ComboboxPrimitivePortal';

export type SelectPortalProps = {
  children: React.ReactNode;
  container?: HTMLElement | null;
  forceMount?: boolean;
};

type SelectPortalElement = React.ElementRef<typeof ComboboxPrimitive.Portal>;
type SelectPortalPrimitiveProps = Omit<ComboboxPrimitivePortalProps, 'children'> & SelectPortalProps;

const SelectPortal = React.forwardRef<SelectPortalElement, SelectPortalPrimitiveProps>(({ children, container, forceMount, ...props }, forwardedRef) => {
    const themeContext = useContext(ThemeContext);
    const portalContainer = container ?? themeContext?.portalRootRef.current;

    return (
        <ComboboxPrimitive.Portal ref={forwardedRef} container={portalContainer} forceMount={forceMount} {...props}>
            {children}
        </ComboboxPrimitive.Portal>

    );
});

SelectPortal.displayName = 'SelectPortal';

export default SelectPortal;
