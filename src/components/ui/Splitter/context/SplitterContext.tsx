import { createContext } from 'react';

export type SplitterOrientation = 'horizontal' | 'vertical';

export interface SplitterContextValue {
  orientation: SplitterOrientation;
  sizes: number[];
  setSizes: (sizes: number[]) => void;
  getHandleValueAttributes: (handleIndex: number) => {
    'aria-valuemin': number;
    'aria-valuemax': number;
    'aria-valuenow': number;
  };
  startDrag: (handleIndex: number, event: React.MouseEvent | React.TouchEvent) => void;
  handleKeyDown: (handleIndex: number, event: React.KeyboardEvent) => void;
  isDragging: boolean;
  activeHandleIndex: number | null;
  rootClass: string;
  registerPanelConstraints?: (index: number, minSize?: number, maxSize?: number) => () => void;
  registerPanelId?: (index: number, id: string) => () => void;
  getPanelId?: (index: number) => string;
  disabled?: boolean;
}

const SplitterContext = createContext<SplitterContextValue | null>(null);

export default SplitterContext;
