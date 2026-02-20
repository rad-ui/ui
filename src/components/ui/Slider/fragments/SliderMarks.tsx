'use client';

import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import { SliderContext } from '../context/SliderContext';

const COMPONENT_NAME = 'SliderMarks';

export type SliderMarksElement = ElementRef<'div'>;
export type SliderMarksProps = {
    children?: React.ReactNode;
    customMarks?: Array<{ value: number; label?: string }>;
} & ComponentPropsWithoutRef<'div'>;

const SliderMarks = forwardRef<SliderMarksElement, SliderMarksProps>(({ children, customMarks, ...props }, ref) => {
    const { rootClass, minValue, maxValue, step, orientation, showStepMarks } = React.useContext(SliderContext);

    if (!showStepMarks && !customMarks) {
        return null;
    }

    // Generate marks
    const marks = [];

    if (customMarks) {
        // Use custom marks
        customMarks.forEach(({ value, label }) => {
            const percent = maxValue === minValue ? 0 : ((value - minValue) / (maxValue - minValue)) * 100;
            marks.push(
                <div
                    key={value}
                    className={`${rootClass}-mark ${rootClass}-mark-custom`}
                    data-testid={`mark-${value}`}
                    style={orientation === 'vertical'
                        ? {
                            bottom: `${percent}%`,
                            left: '50%',
                            transform: 'translateX(-50%)'
                        }
                        : {
                            left: `${percent}%`,
                            top: 0,
                            transform: 'translateX(-50%)'
                        }
                    }
                    data-value={value}
                >
                    {/* Connecting line to track */}
                    <div
                        className={`${rootClass}-mark-line`}
                        style={orientation === 'vertical'
                            ? {
                                width: '2px',
                                height: '12px',
                                position: 'absolute',
                                bottom: '-6px',
                                left: '50%',
                                transform: 'translateX(-50%)'
                            }
                            : {
                                width: '1px',
                                height: '6px',
                                position: 'absolute',
                                top: '100%',
                                left: '50%',
                                transform: 'translateX(-50%)'
                            }
                        }
                    />
                    {/* Label */}
                    {label && (
                        <span
                            className={`${rootClass}-mark-label`}
                            style={orientation === 'vertical'
                                ? {
                                    right: '16px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    whiteSpace: 'nowrap'
                                }
                                : {
                                    top: '8px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    whiteSpace: 'nowrap'
                                }
                            }
                        >
                            {label}
                        </span>
                    )}
                </div>
            );
        });
    } else {
        // Generate step marks
        for (let value = minValue; value <= maxValue; value += step) {
            const percent = maxValue === minValue ? 0 : ((value - minValue) / (maxValue - minValue)) * 100;
            marks.push(
                <div
                    key={value}
                    className={`${rootClass}-mark`}
                    data-testid={`mark-${value}`}
                    style={orientation === 'vertical'
                        ? {
                            bottom: `${percent}%`,
                            left: '50%',
                            transform: 'translateX(-50%)'
                        }
                        : {
                            left: `${percent}%`,
                            top: 0,
                            transform: 'translateX(-50%)'
                        }
                    }
                    data-value={value}
                >
                    {/* Connecting line to track */}
                    <div
                        className={`${rootClass}-mark-line`}
                        style={orientation === 'vertical'
                            ? {
                                width: '2px',
                                height: '8px',
                                position: 'absolute',
                                bottom: '-4px',
                                left: '50%',
                                transform: 'translateX(-50%)'
                            }
                            : {
                                width: '1px',
                                height: '4px',
                                position: 'absolute',
                                top: '100%',
                                left: '50%',
                                transform: 'translateX(-50%)'
                            }
                        }
                    />
                </div>
            );
        }
    }

    return (
        <div
            ref={ref}
            className={`${rootClass}-marks`}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: 'none',
                zIndex: 1
            }}
            {...props}
        >
            {marks}
            {children}
        </div>
    );
});

SliderMarks.displayName = COMPONENT_NAME;

export default SliderMarks;
