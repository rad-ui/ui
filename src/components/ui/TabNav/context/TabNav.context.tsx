import { createContext } from 'react';

interface TabNavContextType {
    rootClass?: string;
    tabNavValue: string;
  handleTabNavChange: (value: string) => void;
};


const TabNavContext = createContext<TabNavContextType>({
    rootClass: '',
    tabNavValue: '',
    handleTabNavChange: () => {},
});

export default TabNavContext;
