'use client';
import React from 'react';
import clsx from 'clsx';
import { useSplitter } from './SplitterRoot';

export interface SplitterHandleProps extends React.ComponentPropsWithoutRef<'div'> {
  index: number;
  /** Disables resizing with this handle (Root `disabled` disables all handles). */
  disabled?: boolean;
  customRootClass?: string;
}

const SplitterHandle = React.forwardRef<
    React.ElementRef<'div'>,
    SplitterHandleProps
>(({
    index,
    className,
    'aria-label': ariaLabel,
    style,
    customRootClass: _customRootClass,
    disabled: disabledProp,
    onMouseDown,
    onTouchStart,
    onKeyDown,
    ...props
}, forwardedRef) => {
    const {
        startDrag,
        orientation,
        isDragging,
        activeHandleIndex,
        handleKeyDown,
        getHandleValueAttributes,
        rootClass,
        getPanelId,
        disabled: rootDisabled
    } = useSplitter();
    const disabled = Boolean(disabledProp || rootDisabled);
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
            data-orientation={orientation}
            data-dragging={isActive ? '' : undefined}
            data-disabled={disabled ? '' : undefined}
            aria-disabled={disabled ? true : undefined}
            aria-controls={getPanelId?.(index)}
            tabIndex={disabled ? -1 : 0}
            onMouseDown={(e) => {
                onMouseDown?.(e);
                if (!e.defaultPrevented && !disabled) startDrag(index, e);
            }}
            onTouchStart={(e) => {
                onTouchStart?.(e);
                if (!e.defaultPrevented && !disabled) startDrag(index, e);
            }}
            onKeyDown={(e) => {
                onKeyDown?.(e);
                if (!e.defaultPrevented && !disabled) handleKeyDown(index, e);
            }}
            style={style}
        />
    );
});

SplitterHandle.displayName = 'SplitterHandle';

export default SplitterHandle;
