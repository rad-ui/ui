'use client';
import React from 'react';
import SelectPrimitive from '~/core/primitives/Select/Select';

export type SelectPortalProps = {
  children: React.ReactNode;
};

const SelectPortal = ({ children }: SelectPortalProps) => {
    const rootElement = document.querySelector('#rad-ui-theme-container') || document.body as HTMLElement | null;

    return (
        <SelectPrimitive.Portal>
            {children}
        </SelectPrimitive.Portal>

    );
};

export default SelectPortal;
