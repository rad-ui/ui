'use client';

import React, { useContext } from 'react';
import Primitive from '~/core/primitives/Primitive';
import { SwitchContext } from '../context/SwitchContext';

export type SwitchThumbProps = {
    asChild?: boolean;
    className?: string;
    children?: React.ReactNode;
};

const SwitchThumb = ({ asChild = false, className, children, ...props }: SwitchThumbProps) => {
    const { checked, rootClass, disabled } = useContext(SwitchContext);

    const dataAttributes: Record<string, string> = {};
    dataAttributes['data-state'] = checked ? 'checked' : 'unchecked';
    if (disabled) {
        dataAttributes['data-disabled'] = '';
    }

    return (
        <Primitive.span
            role='switch'
            className={`${rootClass}-indicator ${className || ''}`}
            asChild={asChild}
            {...dataAttributes}
            {...props}
        >
            {children}
        </Primitive.span>
    );
};

export default SwitchThumb;
