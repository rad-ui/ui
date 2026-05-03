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
    const {
        placement,
        middlewareData: { arrow, shift },
        elements: { floating }
    } = floatingContext;

    const mergedRef = Floater.useMergeRefs([
        ref,
        (node: SVGSVGElement | null) => {
            setArrowNode(node);
        }
    ]);

    const getArrowProps = (childStyle?: React.CSSProperties): React.ComponentPropsWithoutRef<'svg'> => {
        if (!floating) {
            return {};
        }

        const [placementSide, alignment] = placement.split('-');
        const side = placementSide as 'top' | 'right' | 'bottom' | 'left';
        const isVerticalSide = side === 'top' || side === 'bottom';
        const hasShift = (isVerticalSide && shift?.x) || (!isVerticalSide && shift?.y);
        const computedStaticOffset = hasShift ? null : props.staticOffset;
        const yOffsetProp = computedStaticOffset && alignment === 'end' ? 'bottom' : 'top';
        const isRTL = typeof window !== 'undefined' && getComputedStyle(floating).direction === 'rtl';
        let xOffsetProp = computedStaticOffset && alignment === 'end' ? 'right' : 'left';

        if (computedStaticOffset && isRTL) {
            xOffsetProp = alignment === 'end' ? 'left' : 'right';
        }

        const arrowX = arrow?.x != null ? computedStaticOffset || arrow.x : '';
        const arrowY = arrow?.y != null ? computedStaticOffset || arrow.y : '';
        const computedStrokeWidth = (props.strokeWidth ?? 0) * 2;
        const rotation = {
            top: props.d ? 'rotate(180deg)' : '',
            left: props.d ? 'rotate(90deg)' : 'rotate(-90deg)',
            bottom: props.d ? '' : 'rotate(180deg)',
            right: props.d ? 'rotate(-90deg)' : 'rotate(90deg)'
        }[side];

        return {
            'aria-hidden': true,
            width: props.d ? width : width + computedStrokeWidth,
            height,
            viewBox: `0 0 ${width} ${height > width ? height : width}`,
            style: {
                position: 'absolute',
                pointerEvents: 'none',
                [xOffsetProp]: arrowX,
                [yOffsetProp]: arrowY,
                [side]: isVerticalSide || props.d ? '100%' : `calc(100% - ${computedStrokeWidth / 2}px)`,
                transform: [rotation, childStyle?.transform].filter(Boolean).join(' '),
                ...childStyle
            }
        };
    };

    if (asChild) {
        const childrenArray = React.Children.toArray(children);

        if (childrenArray.length !== 1 || !React.isValidElement(childrenArray[0])) {
            console.warn('PopoverPrimitiveArrow: asChild requires exactly one valid React element child.');
            return null;
        }

        const child = childrenArray[0] as React.ReactElement;
        const arrowProps = getArrowProps(child.props.style as React.CSSProperties | undefined);
        const composedRef = composeRefs(mergedRef, (child as any).ref);
        const mergedProps = mergeProps(arrowProps, child.props);

        return (
            React.cloneElement(child, {
                ...mergedProps,
                ...(composedRef ? { ref: composedRef } : {})
            })
        );
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
