import { createContext } from 'react';

export type TabsRootContextType = {
  rootClass: string;
  tabValue: string;
  handleTabChange: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  activationMode?: 'automatic' | 'manual';
} | null;

const TabsRootContext = createContext<TabsRootContextType>(null);

export default TabsRootContext;
