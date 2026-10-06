'use client';

import React, {
    useContext,
    forwardRef,
    ElementRef,
    ComponentPropsWithoutRef
} from 'react';
import { clsx } from 'clsx';
import Primitive from '~/core/primitives/Primitive';
import { MeterContext } from '../contexts/MeterContext';

export type MeterIndicatorElement = ElementRef<typeof Primitive.div>;
export type MeterIndicatorProps = ComponentPropsWithoutRef<typeof Primitive.div>;

const MeterIndicator = forwardRef<MeterIndicatorElement, MeterIndicatorProps>(
    ({ className, style, ...props }, ref) => {
        const { value, minValue, maxValue, rootClass, state } = useContext(MeterContext);
        const percentage = maxValue === minValue
            ? 0
            : ((value - minValue) / (maxValue - minValue)) * 100;
        const { asChild, ...rest } = props;

        return (
            <Primitive.div
                className={clsx(rootClass && `${rootClass}-indicator`, className)}
                style={{ transform: `translateX(-${100 - percentage}%)`, ...style }}
                data-state={state}
                data-value={value}
                data-min={minValue}
                data-max={maxValue}
                asChild={asChild}
                ref={ref}
                {...rest}
            />
        );
    }
);

MeterIndicator.displayName = 'MeterIndicator';

export default MeterIndicator;
