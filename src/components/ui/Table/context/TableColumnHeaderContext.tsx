import { createContext } from 'react';

export interface TableColumnHeaderContextValue {
    columnIndex: number;
}

const TableColumnHeaderContext = createContext<TableColumnHeaderContextValue | null>(null);

export default TableColumnHeaderContext;
