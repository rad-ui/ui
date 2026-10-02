'use client';
import React from 'react';
import clsx from 'clsx';
import TableColumnHeaderContext from '../context/TableColumnHeaderContext';
import { useTable } from './TableRoot';

const COMPONENT_NAME = 'TableColumnResizeHandle';

export type TableColumnResizeHandleProps = React.ComponentPropsWithoutRef<'div'> & {
    'aria-label'?: string;
};

export const useTableColumnHeader = () => {
    const context = React.useContext(TableColumnHeaderContext);
    if (!context) {
        throw new Error(
            'Table.ColumnResizeHandle must be used within a Table.ColumnCellHeader with columnIndex'
        );
    }
    return context;
};

const TableColumnResizeHandle = React.forwardRef<
    React.ElementRef<'div'>,
    TableColumnResizeHandleProps
>(({ className, 'aria-label': ariaLabel, ...props }, forwardedRef) => {
    const {
        rootClass,
        resizable,
        resizeHandleVisibility,
        columnCount,
        startColumnResize,
        handleColumnResizeKeyDown,
        isResizing,
        activeColumnIndex
    } = useTable();
    const { columnIndex } = useTableColumnHeader();
    const headerRef = React.useRef<HTMLElement | null>(null);
    const isActive = isResizing && activeColumnIndex === columnIndex;
    const isLastColumn = columnCount > 0 && columnIndex >= columnCount - 1;

    const mergedRef = React.useCallback((node: HTMLDivElement | null) => {
        headerRef.current = node?.closest('th') ?? null;

        if (typeof forwardedRef === 'function') {
            forwardedRef(node);
        } else if (forwardedRef) {
            forwardedRef.current = node;
        }
    }, [forwardedRef]);

    if (!resizable || isLastColumn) {
        return null;
    }

    return (
        <div
            {...props}
            ref={mergedRef}
            data-slot="table-column-resize-handle"
            data-resize-handle-visibility={resizeHandleVisibility}
            data-state={isActive ? 'active' : undefined}
            className={clsx(
                rootClass && `${rootClass}-column-resize-handle`,
                { active: isActive },
                className
            )}
            role="separator"
            aria-orientation="vertical"
            aria-label={ariaLabel || `Resize column ${columnIndex + 1}`}
            tabIndex={0}
            onMouseDown={(event) => {
                if (!headerRef.current) {
                    return;
                }

                startColumnResize(columnIndex, headerRef.current, event);
            }}
            onTouchStart={(event) => {
                if (!headerRef.current) {
                    return;
                }

                startColumnResize(columnIndex, headerRef.current, event);
            }}
            onKeyDown={(event) => {
                if (!headerRef.current) {
                    return;
                }

                handleColumnResizeKeyDown(columnIndex, headerRef.current, event);
            }}
        />
    );
});

TableColumnResizeHandle.displayName = COMPONENT_NAME;

export default TableColumnResizeHandle;
