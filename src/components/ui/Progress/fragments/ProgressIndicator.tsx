"use client";
import React, {
    useContext,
    forwardRef,
    ElementRef,
    ComponentPropsWithoutRef,
} from "react";

import { clsx } from "clsx";
import { ProgressContext } from "../contexts/ProgressContext";
import Primitive from "~/core/primitives/Primitive";

export type ProgressIndicatorElement = ElementRef<typeof Primitive.div>;
export type ProgressIndicatorProps = ComponentPropsWithoutRef<
    typeof Primitive.div
>;

const ProgressIndicator = forwardRef<
    ProgressIndicatorElement,
    ProgressIndicatorProps
>(({ className, style, ...props }, ref) => {
    const { value, minValue, maxValue, rootClass, state } = useContext(ProgressContext);
    // Ensure value stays within bounds in production, use 0 if value is null
    const boundedValue = Math.min(Math.max(value ?? 0, minValue), maxValue);

    // Calculate the percentage of completion
    const percentage = ((boundedValue - minValue) / (maxValue - minValue)) * 100;

    const { asChild, ...rest } = props;

    return (
        <Primitive.div
            role="progressbar"
            className={clsx(`${rootClass}-indicator`, className)}
            style={{ transform: `translateX(-${100 - percentage}%)`, ...style }}
            aria-valuenow={boundedValue}
            aria-valuemax={maxValue}
            aria-valuemin={minValue}
            data-state={state}
            data-value={boundedValue}
            data-max={maxValue}
            data-min={minValue}
            asChild={asChild}
            ref={ref}
            {...rest}
        />
    );
});

ProgressIndicator.displayName = "ProgressIndicator";

export default ProgressIndicator;
