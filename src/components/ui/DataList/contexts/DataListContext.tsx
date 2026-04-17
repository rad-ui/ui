import { createContext } from 'react';

interface DataListContextType {
    rootClass?: string;
}

const DataListContext = createContext<DataListContextType>({
    rootClass: 'DataList'
});

export default DataListContext;
