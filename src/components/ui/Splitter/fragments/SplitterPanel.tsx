'use client';
import React, { ReactNode } from 'react';
import { customClassSwitcher } from '~/core';
import { clsx } from 'clsx';
import { useSplitter } from './SplitterRoot';

export interface SplitterPanelProps {
  index: number;
  children: ReactNode;
  className?: string;
  customRootClass?: string;
  minSize?: number;
  maxSize?: number;
}

const SplitterPanel: React.FC<SplitterPanelProps> = ({
    index,
    children,
    className = '',
    customRootClass = ''
}) => {
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
        <div className={`${rootClass}-panel`} style={style}>
            {children}
        </div>
    );
};

export default SplitterPanel;
