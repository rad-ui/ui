import { createContext } from 'react';

export type TabsRootContextType = {
  rootClass: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  handleTabChange: (value: string) => void;
} | null;

const TabsRootContext = createContext<TabsRootContextType>(null);

export default TabsRootContext;
