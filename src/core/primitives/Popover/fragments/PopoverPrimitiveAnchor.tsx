'use client';

import React, { forwardRef, useContext } from 'react';
import Primitive from '~/core/primitives/Primitive';
import Floater from '~/core/primitives/Floater';
import { PopoverPrimitiveContext } from '../context/PopoverPrimitiveContext';

export type PopoverPrimitiveAnchorProps = React.ComponentPropsWithoutRef<typeof Primitive.div> & {
    asChild?: boolean;
};

const PopoverPrimitiveAnchor = forwardRef<HTMLDivElement, PopoverPrimitiveAnchorProps>(({
    children,
    asChild = false,
    ...props
}, ref) => {
    const { setAnchorNode } = useContext(PopoverPrimitiveContext);

    const mergedRef = Floater.useMergeRefs([
        ref,
        (node: HTMLElement | null) => {
            setAnchorNode(node);
        }
    ]);

    return (
        <Primitive.div ref={mergedRef} asChild={asChild} {...props}>
            {children}
        </Primitive.div>
    );
});

PopoverPrimitiveAnchor.displayName = 'PopoverPrimitiveAnchor';

export default PopoverPrimitiveAnchor;
