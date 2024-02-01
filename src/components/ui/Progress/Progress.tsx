import React, {PropsWithChildren, CSSProperties} from 'react';
import {ProgressContext, useProgressContext} from './ProgressContext';

interface RootProps extends PropsWithChildren {
  value: number;
  maxValue?: number;
  minValue?: number
  className?: string,
}

function Root({value = 0, minValue = 0, maxValue = 100, children, className = ''}: RootProps) {
    return (
        <ProgressContext.Provider value={{value, maxValue, minValue}}>
            <div className={`bg-gray-300 overflow-hidden ${className}`}>
                {children}
            </div>
        </ProgressContext.Provider>
    );
}

interface IndicatorProps {
    className?: string,
    style?: CSSProperties
    renderLabel?(value: number): JSX.Element
}

function Indicator({className = '', style, renderLabel}: IndicatorProps) {
    const {value, maxValue, minValue} = useProgressContext();

    return (
        <div
            role="progressbar"
            className={`h-full w-full ${className}`}
            aria-valuenow={value}
            aria-valuemax={maxValue}
            aria-valuemin={minValue}
            style={style}
        >
            {renderLabel && renderLabel(value)}
        </div>
    );
}

export {Root, Indicator};
