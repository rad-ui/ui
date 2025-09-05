'use client';
import React, { CSSProperties } from 'react';
import Primitive from '~/core/primitives/Primitive';
import { customClassSwitcher } from '~/core';
import { clsx } from 'clsx';

const COMPONENT_NAME = 'VisuallyHidden';

type VisuallyHiddenElement = React.ElementRef<typeof Primitive.div>;
export type VisuallyHiddenProps = React.ComponentPropsWithoutRef<typeof Primitive.div> & {
    customRootClass?: string;
};

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

const VisuallyHidden = React.forwardRef<VisuallyHiddenElement, VisuallyHiddenProps>(({ children, customRootClass, className, style = {}, ...props }, ref) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    return (
        <Primitive.div
            ref={ref}
            className={clsx(rootClass, className)}
            style={{ ...VISUALLY_HIDDEN_STYLES, ...style }} // overriding possible
            {...props}
        >
            {children}
        </Primitive.div>
    );
});

VisuallyHidden.displayName = COMPONENT_NAME;

export default VisuallyHidden;
