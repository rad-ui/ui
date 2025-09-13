'use client';
import React from 'react';
import { customClassSwitcher } from '~/core';
import clsx from 'clsx';
import { useSplitter } from './SplitterRoot';

export interface SplitterHandleProps {
  index: number;
  className?: string;
  customRootClass?: string;
  'aria-label'?: string;
}

const SplitterHandle: React.FC<SplitterHandleProps> = ({
    index,
    className = '',
    customRootClass = '',
    'aria-label': ariaLabel
}) => {
    const { startDrag, orientation, isDragging, activeHandleIndex, handleKeyDown, rootClass } = useSplitter();
    const isHorizontal = orientation === 'horizontal';
    const isActive = isDragging && activeHandleIndex === index;

    return (
        <div
            className={`${rootClass}-handle`}
            role="separator"
            aria-orientation={orientation}
            aria-label={ariaLabel || `${orientation} resize handle`}
            tabIndex={0}
            onMouseDown={(e) => startDrag(index, e)}
            onTouchStart={(e) => startDrag(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}

        />
    );
};

export default SplitterHandle;
