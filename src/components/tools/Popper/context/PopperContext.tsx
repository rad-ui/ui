// TODO: use native floating.tsx instead of floating-ui/react
import type { ArrowOptions, ElementProps, useDismiss, UseFloatingReturn, useHover, UseInteractionsReturn } from '@floating-ui/react';
import { useRole } from '@floating-ui/react';
import { createContext } from 'react';

export type TPopperContext = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;

  rootClass: string;

  floating: UseFloatingReturn;
  interactions: UseInteractionsReturn;
  role: ReturnType<typeof useRole>;
  dismiss: ReturnType<typeof useDismiss>;
  hover: ReturnType<typeof useHover>;

  // TODO: A better type would be ArrowOptions.element | LegacyRef<SVGSVGElement>
  floatingArrowRef: React.MutableRefObject<null>;
};

const PopperContext = createContext<null | TPopperContext>(null);

export default PopperContext;
