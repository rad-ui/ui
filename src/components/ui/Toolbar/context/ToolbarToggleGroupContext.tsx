import { createContext } from 'react';

export type ToolbarToggleGroupType = 'single' | 'multiple';

export type ToolbarToggleGroupContextType = {
  type: ToolbarToggleGroupType;
  value: any[];
  setValue: (value: any[]) => void;
  rootClass: string;
  disabled: boolean;
} | null;

const ToolbarToggleGroupContext = createContext<ToolbarToggleGroupContextType>(null);

export default ToolbarToggleGroupContext;
