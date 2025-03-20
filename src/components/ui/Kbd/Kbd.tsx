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
    props: Record<string, any>[];
}

const Kbd = ({ children, customRootClass, className, size= '', ...props }: KbdProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    
    const data_attributes: Record<string, string> = {};

    if (size) {
        data_attributes['data-kbd-size'] = size;
    }
    return <kbd className={clsx(rootClass, className)} {...data_attributes} {...props}>{children}</kbd>;
};

export default Kbd;
