'use client';
import React, { useState, useRef, useCallback, useMemo, useLayoutEffect } from 'react';
import clsx from 'clsx';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import { KEYBOARD_KEYS } from '~/core/utils/keyboard';
import TableContext, {
    ColumnWidths,
    TableContextValue,
    TableResizeHandleVisibility
} from '../context/TableContext';

const COMPONENT_NAME = 'Table';

export type TableRootProps = React.ComponentPropsWithoutRef<'div'> & {
    customRootClass?: string;
    resizable?: boolean;
    defaultColumnWidths?: number[] | ColumnWidths;
    columnWidths?: number[] | ColumnWidths;
    onColumnWidthsChange?: (widths: ColumnWidths) => void;
    minColumnWidth?: number;
    resizeHandleVisibility?: TableResizeHandleVisibility;
};

export type { TableResizeHandleVisibility };

export const useTable = () => {
    const context = React.useContext(TableContext);
    if (!context) {
        throw new Error('Table components must be used within a Table.Root');
    }
    return context;
};

function normalizeColumnWidths(
    input?: number[] | ColumnWidths
): ColumnWidths {
    if (!input) {
        return {};
    }

    if (Array.isArray(input)) {
        return Object.fromEntries(
            input.map((width, index) => [index, width])
        );
    }

    return input;
}

function scaleWidthsToTable(
    widths: ColumnWidths,
    columnCount: number,
    tableWidth: number
): ColumnWidths {
    const normalizedWidths = Array.from({ length: columnCount }, (_, index) => (
        widths[index] ?? 0
    ));

    const totalWidth = normalizedWidths.reduce((sum, width) => sum + width, 0);
    if (totalWidth <= 0 || tableWidth <= 0) {
        return widths;
    }

    const scale = tableWidth / totalWidth;

    return Object.fromEntries(
        normalizedWidths.map((width, index) => [index, Math.max(1, Math.round(width * scale))])
    );
}

function createEqualColumnWidths(columnCount: number, tableWidth: number): ColumnWidths {
    const equalWidth = Math.max(1, Math.floor(tableWidth / columnCount));

    return Object.fromEntries(
        Array.from({ length: columnCount }, (_, index) => [index, equalWidth])
    );
}

const TableRoot = React.forwardRef<React.ElementRef<'div'>, TableRootProps>(({
    children,
    className = '',
    customRootClass = '',
    resizable = false,
    defaultColumnWidths,
    columnWidths: controlledColumnWidths,
    onColumnWidthsChange,
    minColumnWidth = 48,
    resizeHandleVisibility = 'hover',
    ...props
}, ref) => {
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);
    const tableRef = useRef<HTMLTableElement | null>(null);
    const [uncontrolledColumnWidths, setUncontrolledColumnWidths] = useState<ColumnWidths>(
        () => normalizeColumnWidths(defaultColumnWidths)
    );
    const [columnCount, setColumnCount] = useState(0);
    const [isResizing, setIsResizing] = useState(false);
    const [activeColumnIndex, setActiveColumnIndex] = useState<number | null>(null);
    const columnWidthsRef = useRef<ColumnWidths>({});
    const columnCountRef = useRef(0);
    const hasInitializedWidthsRef = useRef(false);

    const isControlled = controlledColumnWidths !== undefined;
    const columnWidths = isControlled
        ? normalizeColumnWidths(controlledColumnWidths)
        : uncontrolledColumnWidths;

    columnWidthsRef.current = columnWidths;
    columnCountRef.current = columnCount;

    const updateColumnWidths = useCallback((nextWidths: ColumnWidths) => {
        if (!isControlled) {
            setUncontrolledColumnWidths(nextWidths);
        }

        onColumnWidthsChange?.(nextWidths);
    }, [isControlled, onColumnWidthsChange]);

    const registerColumnIndex = useCallback((columnIndex: number) => {
        setColumnCount((currentCount) => Math.max(currentCount, columnIndex + 1));
    }, []);

    const getColumnStyle = useCallback((columnIndex: number) => {
        if (!resizable) {
            return undefined;
        }

        const width = columnWidths[columnIndex];
        if (width === undefined) {
            return undefined;
        }

        return { width };
    }, [columnWidths, resizable]);

    useLayoutEffect(() => {
        if (
            !resizable
            || isControlled
            || !tableRef.current
            || columnCount === 0
            || hasInitializedWidthsRef.current
        ) {
            return;
        }

        const tableWidth = tableRef.current.offsetWidth;
        if (tableWidth <= 0) {
            return;
        }

        const initialWidths = Object.keys(columnWidthsRef.current).length > 0
            ? scaleWidthsToTable(columnWidthsRef.current, columnCount, tableWidth)
            : createEqualColumnWidths(columnCount, tableWidth);

        hasInitializedWidthsRef.current = true;
        updateColumnWidths(initialWidths);
    }, [columnCount, isControlled, resizable, updateColumnWidths]);

    const getNeighborHeader = useCallback((headerElement: HTMLElement, offset: number) => {
        let sibling = headerElement;

        for (let step = 0; step < Math.abs(offset); step += 1) {
            sibling = offset < 0
                ? sibling.previousElementSibling as HTMLElement
                : sibling.nextElementSibling as HTMLElement;

            if (!sibling) {
                return null;
            }
        }

        return sibling;
    }, []);

    const getColumnWidth = useCallback((
        columnIndex: number,
        headerElement?: HTMLElement | null
    ) => (
        columnWidthsRef.current[columnIndex] ?? headerElement?.offsetWidth ?? minColumnWidth
    ), [minColumnWidth]);

    const applyPairedColumnResize = useCallback((
        leftColumnIndex: number,
        delta: number,
        startLeftWidth: number,
        startRightWidth: number
    ) => {
        const rightColumnIndex = leftColumnIndex + 1;
        if (rightColumnIndex >= columnCountRef.current) {
            return;
        }

        const maxLeftGrowth = startRightWidth - minColumnWidth;
        const maxLeftShrink = startLeftWidth - minColumnWidth;
        const clampedDelta = Math.max(-maxLeftShrink, Math.min(maxLeftGrowth, delta));
        const nextLeftWidth = startLeftWidth + clampedDelta;
        const nextRightWidth = startRightWidth - clampedDelta;

        updateColumnWidths({
            ...columnWidthsRef.current,
            [leftColumnIndex]: nextLeftWidth,
            [rightColumnIndex]: nextRightWidth
        });
    }, [minColumnWidth, updateColumnWidths]);

    const startColumnResize = useCallback((
        columnIndex: number,
        headerElement: HTMLElement,
        event: React.MouseEvent | React.TouchEvent
    ) => {
        if (!resizable || columnIndex >= columnCountRef.current - 1) {
            return;
        }

        event.preventDefault();

        const startPosition = 'clientX' in event
            ? event.clientX
            : event.touches[0].clientX;
        const rightHeader = getNeighborHeader(headerElement, 1);
        const startLeftWidth = getColumnWidth(columnIndex, headerElement);
        const startRightWidth = getColumnWidth(columnIndex + 1, rightHeader);

        setIsResizing(true);
        setActiveColumnIndex(columnIndex);

        const handleMove = (moveEvent: MouseEvent | TouchEvent) => {
            const currentPosition = 'clientX' in moveEvent
                ? moveEvent.clientX
                : moveEvent.touches[0].clientX;

            applyPairedColumnResize(
                columnIndex,
                currentPosition - startPosition,
                startLeftWidth,
                startRightWidth
            );
        };

        const handleEnd = () => {
            setIsResizing(false);
            setActiveColumnIndex(null);

            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('mouseup', handleEnd);
            document.removeEventListener('touchmove', handleMove);
            document.removeEventListener('touchend', handleEnd);
        };

        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleEnd);
        document.addEventListener('touchmove', handleMove);
        document.addEventListener('touchend', handleEnd);
    }, [applyPairedColumnResize, getNeighborHeader, resizable]);

    const handleColumnResizeKeyDown = useCallback((
        columnIndex: number,
        headerElement: HTMLElement,
        event: React.KeyboardEvent
    ) => {
        if (!resizable || columnIndex >= columnCountRef.current - 1) {
            return;
        }

        const step = event.shiftKey ? 20 : 5;
        let delta = 0;

        if (event.key === KEYBOARD_KEYS.ARROW_LEFT) {
            delta = -step;
        } else if (event.key === KEYBOARD_KEYS.ARROW_RIGHT) {
            delta = step;
        }

        if (delta === 0) {
            return;
        }

        event.preventDefault();

        const rightHeader = getNeighborHeader(headerElement, 1);
        applyPairedColumnResize(
            columnIndex,
            delta,
            getColumnWidth(columnIndex, headerElement),
            getColumnWidth(columnIndex + 1, rightHeader)
        );
    }, [applyPairedColumnResize, getColumnWidth, getNeighborHeader, resizable]);

    const contextValue = useMemo<TableContextValue>(() => ({
        rootClass,
        resizable,
        resizeHandleVisibility,
        columnCount,
        registerColumnIndex,
        columnWidths,
        getColumnStyle,
        startColumnResize,
        handleColumnResizeKeyDown,
        isResizing,
        activeColumnIndex
    }), [
        activeColumnIndex,
        columnCount,
        columnWidths,
        getColumnStyle,
        handleColumnResizeKeyDown,
        isResizing,
        registerColumnIndex,
        resizeHandleVisibility,
        resizable,
        rootClass,
        startColumnResize
    ]);

    return (
        <TableContext.Provider value={contextValue}>
            <div
                ref={ref}
                className={clsx(rootClass && `${rootClass}-wrapper`, className)}
                data-resizable={resizable ? '' : undefined}
                data-resizing={resizable && isResizing ? '' : undefined}
                data-resize-handle-visibility={resizable ? resizeHandleVisibility : undefined}
                {...props}
            >
                <table
                    ref={tableRef}
                    className={clsx(rootClass)}
                    data-resizable={resizable ? '' : undefined}
                    style={resizable ? { tableLayout: 'fixed', width: '100%' } : undefined}
                >
                    {resizable && columnCount > 0 && (
                        <colgroup>
                            {Array.from({ length: columnCount }, (_, columnIndex) => (
                                <col
                                    key={columnIndex}
                                    style={getColumnStyle(columnIndex)}
                                />
                            ))}
                        </colgroup>
                    )}
                    {children}
                </table>
            </div>
        </TableContext.Provider>
    );
});

TableRoot.displayName = COMPONENT_NAME;

export default TableRoot;
