import { createContext, Dispatch, SetStateAction } from "react";

type CollapsibleContextType = {
  rootClass?: string;
  open?: boolean;
  onOpenChange?: Dispatch<SetStateAction<boolean>>;
  disabled?: boolean;
  defaultOpen?: boolean;
};

const defaultContext: CollapsibleContextType = {
  rootClass: "",
  open: false,
  onOpenChange: () => {},
  disabled: false,
  defaultOpen: false,
};

export const CollapsibleContext =
  createContext<CollapsibleContextType>(defaultContext);