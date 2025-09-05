'use client';
import React from 'react';
import { customClassSwitcher } from '~/core';
import { clsx } from 'clsx';
import { useCreateDataAttribute } from '~/core/hooks/createDataAttribute';
const COMPONENT_NAME = 'Kbd';

export type KbdProps = {
    children: React.ReactNode;
    customRootClass?: string;
    className?: string;
    size?: string;
    props?: Record<string, any>[];
}

const Kbd = ({ children, customRootClass, className, size = '', ...props }: KbdProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    const dataAttributes = useCreateDataAttribute('kbd', { size });

    return <kbd className={clsx(rootClass, className)} {...dataAttributes()} {...props}>{children}</kbd>;
};

export default Kbd;
