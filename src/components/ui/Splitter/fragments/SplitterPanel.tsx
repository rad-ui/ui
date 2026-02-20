'use client';
import React from 'react';
import { customClassSwitcher } from '~/core';
import clsx from 'clsx';
import { useSplitter } from './SplitterRoot';

export interface SplitterPanelProps extends React.ComponentPropsWithoutRef<'div'> {
  index: number;
  customRootClass?: string;
  minSize?: number;
  maxSize?: number;
}

const SplitterPanel = React.forwardRef<
    React.ElementRef<'div'>,
    SplitterPanelProps
>(({ index, children, className, style, ...props }, forwardedRef) => {
    const { sizes, orientation, rootClass } = useSplitter();

    const panelStyle = {
        flexBasis: `${sizes[index]}%`,
        flexGrow: 0,
        flexShrink: 0,
        overflow: 'auto',
        minWidth: orientation === 'horizontal' ? 0 : undefined,
        minHeight: orientation === 'vertical' ? 0 : undefined,
        ...style
    } as React.CSSProperties;

    return (
        <div
            {...props}
            ref={forwardedRef}
            className={clsx(`${rootClass}-panel`, className)}
            style={panelStyle}
        >
            {children}
        </div>
    );
});

SplitterPanel.displayName = 'SplitterPanel';

export default SplitterPanel;
