'use client';
import React, { CSSProperties } from 'react';
import Primitive from '~/core/primitives/Primitive';
import { customClassSwitcher } from '~/core';
import { clsx } from 'clsx';

const COMPONENT_NAME = 'VisuallyHidden';

export type VisuallyHiddenProps = {
    children: React.ReactNode;
    customRootClass?: string;
    className?: string;
    asChild?: boolean;
    style?: CSSProperties;
} & React.HTMLAttributes<HTMLDivElement>;

const VISUALLY_HIDDEN_STYLES: CSSProperties = {
    position: 'absolute',
    width: '1px',
    height: '1px',
    margin: '-1px',
    border: '0',
    padding: '0',
    whiteSpace: 'nowrap',
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    overflow: 'hidden',
    pointerEvents: 'none',
    userSelect: 'none'
} as const;

const VisuallyHidden = ({
    children,
    customRootClass,
    className,
    style = {},
    ...props
}: VisuallyHiddenProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    return (
        <Primitive.div
            className={clsx(rootClass, className)}
            style={{ ...VISUALLY_HIDDEN_STYLES, ...style }} // overriding possible
            {...props}
        >
            {children}
        </Primitive.div>
    );
};

VisuallyHidden.displayName = COMPONENT_NAME;

export default VisuallyHidden;
