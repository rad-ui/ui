'use client';
import { createContext } from 'react';

type DialogPrimitiveContextType = {
  isOpen: boolean;
  handleOpenChange: (open: boolean) => void;
  rootClass: string;
  handleOverlayClick: () => void;
};

export const DialogPrimitiveContext = createContext<DialogPrimitiveContextType>({
    isOpen: false,
    handleOpenChange: () => {},
    rootClass: '',
    handleOverlayClick: () => {}
});
