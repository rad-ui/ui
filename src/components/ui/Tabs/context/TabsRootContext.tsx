import { createContext } from 'react';

export type TabsRootContextType = {
  rootClass: string;
  tabValue: string;
  handleTabChange: (value: string) => void;
} | null;

const TabsRootContext = createContext<TabsRootContextType>(null);

export default TabsRootContext;
