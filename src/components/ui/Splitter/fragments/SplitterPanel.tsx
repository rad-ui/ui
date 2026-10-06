'use client';
import React from 'react';
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
>(({ index, children, className, style, minSize, maxSize, customRootClass: _customRootClass, id, ...props }, forwardedRef) => {
    const { sizes, orientation, rootClass, registerPanelConstraints, registerPanelId, getPanelId } = useSplitter();
    const panelId = id ?? getPanelId?.(index);

    // A consumer id must be what the handle's aria-controls points at.
    React.useEffect(() => {
        if (!id || !registerPanelId) return;
        return registerPanelId(index, id);
    }, [id, index, registerPanelId]);

    React.useEffect(() => {
        if (!registerPanelConstraints || (minSize === undefined && maxSize === undefined)) return;
        return registerPanelConstraints(index, minSize, maxSize);
    }, [index, minSize, maxSize, registerPanelConstraints]);

    const panelStyle = {
        // Percent bases sum to 100%, and handles take real space too. A shrink factor of 1
        // lets the browser take the handles' space from panels in proportion to their size
        // (shrink is weighted by basis), so the layout never overflows the root.
        flexBasis: `${sizes[index] ?? 0}%`,
        flexGrow: 0,
        flexShrink: 1,
        overflow: 'auto',
        minWidth: orientation === 'horizontal' ? 0 : undefined,
        minHeight: orientation === 'vertical' ? 0 : undefined,
        ...style
    } as React.CSSProperties;

    return (
        <div
            {...props}
            ref={forwardedRef}
            id={panelId}
            className={clsx(rootClass && `${rootClass}-panel`, className)}
            data-orientation={orientation}
            style={panelStyle}
        >
            {children}
        </div>
    );
});

SplitterPanel.displayName = 'SplitterPanel';

export default SplitterPanel;
