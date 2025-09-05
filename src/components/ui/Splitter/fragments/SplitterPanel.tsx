'use client';
import React from 'react';
import { clsx } from 'clsx';
import { useSplitter } from './SplitterRoot';

type SplitterPanelElement = React.ElementRef<'div'>;
export interface SplitterPanelProps extends React.ComponentPropsWithoutRef<'div'> {
  index: number;
  customRootClass?: string;
  minSize?: number;
  maxSize?: number;
}

const SplitterPanel = React.forwardRef<SplitterPanelElement, SplitterPanelProps>(({ 
    index,
    children,
    className = '',
    customRootClass = '',
    ...props
}, ref) => {
    const { sizes, orientation, rootClass } = useSplitter();

    const style = {
        flexBasis: `${sizes[index]}%`,
        flexGrow: 0,
        flexShrink: 0,
        overflow: 'auto',
        minWidth: orientation === 'horizontal' ? 0 : undefined,
        minHeight: orientation === 'vertical' ? 0 : undefined
    };

    return (
        <div
            ref={ref}
            className={clsx(`${rootClass}-panel`, className)}
            style={style}
            {...props}
        >
            {children}
        </div>
    );
});

SplitterPanel.displayName = 'SplitterPanel';

export default SplitterPanel;
