'use client';
import React from 'react';
import clsx from 'clsx';
import { useSplitter } from './SplitterRoot';

export interface SplitterHandleProps extends React.ComponentPropsWithoutRef<'div'> {
  index: number;
  customRootClass?: string;
}

const SplitterHandle = React.forwardRef<
    React.ElementRef<'div'>,
    SplitterHandleProps
>(({ index, className, 'aria-label': ariaLabel, style, ...props }, forwardedRef) => {
    const {
        startDrag,
        orientation,
        isDragging,
        activeHandleIndex,
        handleKeyDown,
        getHandleValueAttributes,
        rootClass
    } = useSplitter();
    const isActive = isDragging && activeHandleIndex === index;
    const valueAttributes = getHandleValueAttributes(index);

    return (
        <div
            {...props}
            ref={forwardedRef}
            className={clsx(rootClass && `${rootClass}-handle`, { active: isActive }, className)}
            role="separator"
            aria-orientation={orientation}
            aria-label={ariaLabel || `${orientation} resize handle`}
            {...valueAttributes}
            tabIndex={0}
            onMouseDown={(e) => startDrag(index, e)}
            onTouchStart={(e) => startDrag(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            style={style}
        />
    );
});

SplitterHandle.displayName = 'SplitterHandle';

export default SplitterHandle;
