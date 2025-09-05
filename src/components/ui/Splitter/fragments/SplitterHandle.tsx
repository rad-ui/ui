'use client';
import React from 'react';
import { clsx } from 'clsx';
import composeEventHandlers from '~/core/hooks/composeEventHandlers';
import { useSplitter } from './SplitterRoot';

type SplitterHandleElement = React.ElementRef<'div'>;
export interface SplitterHandleProps extends React.ComponentPropsWithoutRef<'div'> {
  index: number;
  customRootClass?: string;
  'aria-label'?: string;
}

const SplitterHandle = React.forwardRef<SplitterHandleElement, SplitterHandleProps>(
    ({
        index,
        className = '',
        customRootClass = '',
        'aria-label': ariaLabel,
        onMouseDown,
        onTouchStart,
        onKeyDown,
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
                onMouseDown={composeEventHandlers(onMouseDown, (e) => startDrag(index, e))}
                onTouchStart={composeEventHandlers(onTouchStart, (e) => startDrag(index, e))}
                onKeyDown={composeEventHandlers(onKeyDown, (e) => handleKeyDown(index, e))}
                {...props}
            />
        );
    }
);

SplitterHandle.displayName = 'SplitterHandle';

export default SplitterHandle;
