import { createContext } from 'react';

export type ToolbarRootContextType = {
  rootClass: string;
  orientation: 'horizontal' | 'vertical';
} | null;

const ToolbarRootContext = createContext<ToolbarRootContextType>(null);

export default ToolbarRootContext;
