import { createContext } from 'react';

interface TabNavContextType {
    rootClass?: string;
}

const TabNavContext = createContext<TabNavContextType>({
    rootClass: 'TabNav'
});

export default TabNavContext;
