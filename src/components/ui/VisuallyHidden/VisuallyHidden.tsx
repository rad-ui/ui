'use client';
import React from 'react';
import Primitive from '~/core/primitives/Primitive';
import { customClassSwitcher } from '~/core';
import { clsx } from 'clsx';
const COMPONENT_NAME = 'VisuallyHidden';

export type VisuallyHiddenProps = {
    children: React.ReactNode;
    customRootClass?: string;
    className?: string;
    props: Record<string, any>[];
}

const VisuallyHidden = ({ children, customRootClass, className, ...props }: VisuallyHiddenProps) => {

    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    return <Primitive.div  className={clsx(rootClass, className)} {...props}>{children}</Primitive.div>

}
VisuallyHidden.displayName = COMPONENT_NAME;

export default VisuallyHidden;