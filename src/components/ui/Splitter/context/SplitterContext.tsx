import { createContext } from 'react';

export type SplitterOrientation = 'horizontal' | 'vertical';

export interface SplitterContextValue {
  orientation: SplitterOrientation;
  sizes: number[];
  setSizes: (sizes: number[]) => void;
  startDrag: (handleIndex: number, event: React.MouseEvent | React.TouchEvent) => void;
  handleKeyDown: (handleIndex: number, event: React.KeyboardEvent) => void;
  isDragging: boolean;
  activeHandleIndex: number | null;
  rootClass: string;
}

const SplitterContext = createContext<SplitterContextValue | null>(null);

export default SplitterContext;
