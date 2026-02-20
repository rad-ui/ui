'use client';
import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import { customClassSwitcher } from '~/core';
import clsx from 'clsx';
import { useCreateDataAttribute } from '~/core/hooks/createDataAttribute';

const COMPONENT_NAME = 'Kbd';

export type KbdElement = ElementRef<'kbd'>;
export interface KbdProps extends ComponentPropsWithoutRef<'kbd'> {
    customRootClass?: string;
    size?: string;
}

const Kbd = forwardRef<KbdElement, KbdProps>(({ children, customRootClass, className, size = '', ...props }, ref) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const dataAttributes = useCreateDataAttribute('kbd', { size });

    return <kbd ref={ref} className={clsx(rootClass, className)} {...dataAttributes()} {...props}>{children}</kbd>;
});

Kbd.displayName = COMPONENT_NAME;

export default Kbd;
