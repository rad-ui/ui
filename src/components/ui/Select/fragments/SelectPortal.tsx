'use client';
import React, { useContext } from 'react';
import ComboboxPrimitive from '~/core/primitives/Combobox/ComboboxPrimitive';
import ThemeContext from '~/components/ui/Theme/ThemeContext';

export type SelectPortalProps = {
  children: React.ReactNode;
  container?: HTMLElement | null;
};

type SelectPortalElement = React.ElementRef<typeof ComboboxPrimitive.Portal>;
type SelectPortalPrimitiveProps = React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Portal> & SelectPortalProps;

const SelectPortal = React.forwardRef<SelectPortalElement, SelectPortalPrimitiveProps>(({ children, container, ...props }, forwardedRef) => {
    const themeContext = useContext(ThemeContext);
    const portalContainer = container ?? themeContext?.portalRootRef.current;

    return (
        <ComboboxPrimitive.Portal ref={forwardedRef} container={portalContainer} {...props}>
            {children}
        </ComboboxPrimitive.Portal>

    );
});

SelectPortal.displayName = 'SelectPortal';

export default SelectPortal;
