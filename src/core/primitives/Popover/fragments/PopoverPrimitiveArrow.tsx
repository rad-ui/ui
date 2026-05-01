'use client';

import React, { forwardRef, useContext } from 'react';
import Floater from '~/core/primitives/Floater';
import { PopoverPrimitiveContext } from '../context/PopoverPrimitiveContext';
import { composeRefs, mergeProps } from '~/core/utils/mergeProps';

export type PopoverPrimitiveArrowProps = Omit<React.ComponentPropsWithoutRef<typeof Floater.Arrow>, 'context'> & {
    asChild?: boolean;
};

const PopoverPrimitiveArrow = forwardRef<SVGSVGElement, PopoverPrimitiveArrowProps>(({
    children,
    asChild = false,
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

    if (asChild) {
        const childrenArray = React.Children.toArray(children);

        if (childrenArray.length !== 1 || !React.isValidElement(childrenArray[0])) {
            console.warn('PopoverPrimitiveArrow: asChild requires exactly one valid React element child.');
            return null;
        }

        const child = childrenArray[0] as React.ReactElement;
        const arrow = (
            <Floater.Arrow
                ref={mergedRef}
                context={floatingContext}
                width={width}
                height={height}
                {...props}
            />
        );

        const childRef = (child as any).ref;
        const composedRef = composeRefs(mergedRef, childRef);
        const mergedProps = mergeProps(arrow.props, child.props);

        return React.cloneElement(child, {
            ...mergedProps,
            ...(composedRef ? { ref: composedRef } : {})
        });
    }

    return (
        <Floater.Arrow
            ref={mergedRef}
            context={floatingContext}
            width={width}
            height={height}
            {...props}
        />
    );
});

PopoverPrimitiveArrow.displayName = 'PopoverPrimitiveArrow';

export default PopoverPrimitiveArrow;
