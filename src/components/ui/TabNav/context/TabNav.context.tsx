import { createContext } from 'react';

interface TabNavContextType {
    rootClass?: string;
}

const TabNavContext = createContext<TabNavContextType>({
    rootClass: '',
});

export default TabNavContext;
