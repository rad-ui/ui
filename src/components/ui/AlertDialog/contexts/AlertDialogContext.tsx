'use client';
import { createContext } from 'react';

export type AlertDialogContextType = {
  rootClass: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  titleId?: string;
  descriptionId?: string;
  setTitleId: (id: string) => void;
  setDescriptionId: (id: string) => void;
};

export const AlertDialogContext = createContext<AlertDialogContextType>({
    rootClass: '',
    isOpen: false,
    setIsOpen: () => {},
    titleId: undefined,
    descriptionId: undefined,
    setTitleId: () => {},
    setDescriptionId: () => {}
});
