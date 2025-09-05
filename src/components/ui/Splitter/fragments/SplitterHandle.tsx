'use client';
import React from 'react';
import { clsx } from 'clsx';
import { useSplitter } from './SplitterRoot';

type SplitterHandleElement = React.ElementRef<'div'>;
export interface SplitterHandleProps extends React.ComponentPropsWithoutRef<'div'> {
  index: number;
  customRootClass?: string;
  'aria-label'?: string;
}

const SplitterHandle = React.forwardRef<SplitterHandleElement, SplitterHandleProps>(({ 
    index,
    className = '',
    customRootClass = '',
    'aria-label': ariaLabel,
    ...props
}, ref) => {
    const { startDrag, orientation, isDragging, activeHandleIndex, handleKeyDown, rootClass } = useSplitter();
    const isHorizontal = orientation === 'horizontal';
    const isActive = isDragging && activeHandleIndex === index;

    return (
        <div
            ref={ref}
            className={clsx(`${rootClass}-handle`, className)}
            role="separator"
            aria-orientation={orientation}
            aria-label={ariaLabel || `${orientation} resize handle`}
            tabIndex={0}
            onMouseDown={(e) => startDrag(index, e)}
            onTouchStart={(e) => startDrag(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            {...props}
        />
    );
});

SplitterHandle.displayName = 'SplitterHandle';

export default SplitterHandle;
