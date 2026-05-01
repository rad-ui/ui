'use client';

import React, { forwardRef, useContext } from 'react';
import Floater from '~/core/primitives/Floater';
import { PopoverPrimitiveContext } from '../context/PopoverPrimitiveContext';

export type PopoverPrimitiveArrowProps = Omit<React.ComponentPropsWithoutRef<typeof Floater.Arrow>, 'context'>;

const PopoverPrimitiveArrow = forwardRef<SVGSVGElement, PopoverPrimitiveArrowProps>(({
    width = 10,
    height = 5,
    ...props
}, ref) => {
    const { floatingContext, setArrowNode } = useContext(PopoverPrimitiveContext);

    const mergedRef = Floater.useMergeRefs([
        ref,
        (node: SVGSVGElement | null) => {
            setArrowNode(node);
        }
    ]);

    return <Floater.Arrow ref={mergedRef} context={floatingContext} width={width} height={height} {...props} />;
});

PopoverPrimitiveArrow.displayName = 'PopoverPrimitiveArrow';

export default PopoverPrimitiveArrow;
