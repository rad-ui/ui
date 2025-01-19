// TODO: use native floating.tsx instead of floating-ui/react
import type { ElementProps, useDismiss, UseFloatingReturn, useHover, UseInteractionsReturn } from '@floating-ui/react';
import { useRole } from '@floating-ui/react';
import { createContext, MutableRefObject } from 'react';

export type TPopperContext = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;

  rootClass: string;

  floating: UseFloatingReturn;
  interactions: UseInteractionsReturn;
  role: ReturnType<typeof useRole>;
  dismiss: ReturnType<typeof useDismiss>;
  hover: ReturnType<typeof useHover>;
};

const PopperContext = createContext<null | TPopperContext>(null);

export default PopperContext;
