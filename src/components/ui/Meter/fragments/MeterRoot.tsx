'use client';

import React, {
    forwardRef,
    ElementRef,
    ComponentPropsWithoutRef
} from 'react';
import { clsx } from 'clsx';
import Primitive from '~/core/primitives/Primitive';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import { MeterContext } from '../contexts/MeterContext';

const COMPONENT_NAME = 'Meter';

export type MeterRootElement = ElementRef<typeof Primitive.div>;
export type MeterRootProps = {
    value?: number;
    minValue?: number;
    maxValue?: number;
    lowValue?: number;
    highValue?: number;
    optimumValue?: number;
    getValueLabel?: (value: number, minValue: number, maxValue: number) => string;
    customRootClass?: string;
    children?: React.ReactNode;
} & ComponentPropsWithoutRef<typeof Primitive.div>;

const clamp = (value: number, minValue: number, maxValue: number) => {
    if (maxValue <= minValue) return minValue;
    return Math.min(Math.max(value, minValue), maxValue);
};

const getMeterState = (
    value: number,
    lowValue?: number,
    highValue?: number,
    optimumValue?: number
) => {
    if (optimumValue !== undefined && value === optimumValue) return 'optimum';
    if (lowValue !== undefined && value < lowValue) return 'low';
    if (highValue !== undefined && value > highValue) return 'high';
    return 'normal';
};

const MeterRoot = forwardRef<MeterRootElement, MeterRootProps>(
    (
        {
            value = 0,
            minValue = 0,
            maxValue = 100,
            lowValue,
            highValue,
            optimumValue,
            getValueLabel,
            customRootClass,
            className,
            children,
            ...props
        },
        ref
    ) => {
        const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);
        const boundedValue = clamp(value, minValue, maxValue);
        const state = getMeterState(boundedValue, lowValue, highValue, optimumValue);
        const valueLabel = getValueLabel?.(boundedValue, minValue, maxValue);

        const { asChild, ...rest } = props;

        return (
            <MeterContext.Provider
                value={{
                    value: boundedValue,
                    minValue,
                    maxValue,
                    lowValue,
                    highValue,
                    optimumValue,
                    rootClass,
                    state
                }}
            >
                <Primitive.div
                    role="meter"
                    aria-valuenow={boundedValue}
                    aria-valuemin={minValue}
                    aria-valuemax={maxValue}
                    aria-valuetext={valueLabel}
                    data-state={state}
                    data-value={boundedValue}
                    data-min={minValue}
                    data-max={maxValue}
                    data-low={lowValue}
                    data-high={highValue}
                    data-optimum={optimumValue}
                    className={clsx(rootClass, className)}
                    asChild={asChild}
                    ref={ref}
                    {...rest}
                >
                    {children}
                </Primitive.div>
            </MeterContext.Provider>
        );
    }
);

MeterRoot.displayName = COMPONENT_NAME;

export { clamp as clampMeterValue, getMeterState };
export default MeterRoot;
