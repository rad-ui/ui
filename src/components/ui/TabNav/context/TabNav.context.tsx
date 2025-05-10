import { createContext } from 'react';

interface TabNavContextType {
  rootClass: string;
  tabValue: string;
  handleTabChange: (value: string) => void;
};

const TabNavContext = createContext<TabNavContextType>({
    rootClass: '',
    tabValue: '',
    handleTabChange: () => {},
});

export default TabNavContext;
