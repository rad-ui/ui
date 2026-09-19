import { createContext, type CSSProperties } from 'react';

export type ColumnWidths = Record<number, number>;
export type TableResizeHandleVisibility = 'hover' | 'always';

export interface TableContextValue {
    rootClass: string;
    resizable: boolean;
    resizeHandleVisibility: TableResizeHandleVisibility;
    columnCount: number;
    registerColumnIndex: (columnIndex: number) => void;
    columnWidths: ColumnWidths;
    getColumnStyle: (columnIndex: number) => CSSProperties | undefined;
    startColumnResize: (
        columnIndex: number,
        headerElement: HTMLElement,
        event: React.MouseEvent | React.TouchEvent
    ) => void;
    handleColumnResizeKeyDown: (
        columnIndex: number,
        headerElement: HTMLElement,
        event: React.KeyboardEvent
    ) => void;
    isResizing: boolean;
    activeColumnIndex: number | null;
}

const TableContext = createContext<TableContextValue | null>(null);

export default TableContext;
