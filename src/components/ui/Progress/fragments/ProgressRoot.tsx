'use client';
import React, {
    forwardRef,
    ElementRef,
    ComponentPropsWithoutRef
} from 'react';
import { clsx } from 'clsx';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import { ProgressContext } from '../contexts/ProgressContext';

import Primitive from '~/core/primitives/Primitive';

const COMPONENT_NAME = 'Progress';

export type ProgressRootElement = ElementRef<typeof Primitive.div>;
export type ProgressRootProps = {
    value: number | null;
    minValue: number;
    maxValue: number;
    getValueLabel?: (value: number, minValue: number, maxValue: number) => string;
    customRootClass?: string;
    children: React.ReactNode;
} & ComponentPropsWithoutRef<typeof Primitive.div>;

const STATE_ENUMS = {
    LOADING: 'loading', // a progress is loading when the value is not null and not equal to the maxValue
    COMPLETE: 'complete', // a progress is complete when the value is equal to the maxValue
    INDETERMINATE: 'indeterminate' // a progress is indeterminate when the value is null
} as const;

const getProgressState = (value: number | null, maxValue: number) => {
    if (value === null) {
        return STATE_ENUMS.INDETERMINATE;
    }

    return value === maxValue ? STATE_ENUMS.COMPLETE : STATE_ENUMS.LOADING;
};

const ProgressRoot = forwardRef<ProgressRootElement, ProgressRootProps>(
    (
        {
            value = 0,
            minValue = 0,
            maxValue = 100,
            children,
            customRootClass,
            getValueLabel,
            className,
            ...props
        },
        ref
    ) => {
        const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);
        const ariaLabel = getValueLabel?.(value ?? 0, minValue, maxValue) ?? '';
        const state = getProgressState(value, maxValue);
        const isIndeterminate = value === null;

        const sendValues = {
            value,
            minValue,
            maxValue,
            rootClass,
            getValueLabel,
            ariaLabel,
            state
        };

        const { asChild, ...rest } = props;

        return (
            <ProgressContext.Provider value={sendValues}>
                <Primitive.div
                    role="progressbar"
                    aria-label={ariaLabel}
                    aria-valuetext={ariaLabel}
                    aria-valuenow={isIndeterminate ? undefined : value}
                    aria-valuemin={minValue}
                    aria-valuemax={maxValue}
                    data-state={state}
                    data-value={isIndeterminate ? undefined : value}
                    data-max={maxValue}
                    data-min={minValue}
                    className={clsx(rootClass, className)}
                    asChild={asChild}
                    ref={ref}
                    {...rest}
                >
                    {children}
                </Primitive.div>
            </ProgressContext.Provider>
        );
    }
);

ProgressRoot.displayName = COMPONENT_NAME;

export default ProgressRoot;
