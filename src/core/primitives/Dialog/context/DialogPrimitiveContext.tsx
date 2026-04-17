'use client';
import { createContext } from 'react';

type DialogPrimitiveContextType = {
  isOpen: boolean;
  handleOpenChange: (open: boolean) => void;
  handleOverlayClick: () => void;
  getItemProps: () => any;
  getReferenceProps: () => any;
  getFloatingProps: () => any;
  refs: {
    setReference: React.RefCallback<HTMLElement> | (() => void);
    setFloating: React.RefCallback<HTMLElement> | (() => void);
  };
  floatingStyles: React.CSSProperties;
  floaterContext?: any
};

export const DialogPrimitiveContext = createContext<DialogPrimitiveContextType>({
    isOpen: false,
    handleOpenChange: () => {},
    handleOverlayClick: () => {},
    getItemProps: () => {},
    getReferenceProps: () => {},
    getFloatingProps: () => {},
    refs: {
        setReference: () => {},
        setFloating: () => {}
    },
    floatingStyles: {
        position: 'absolute'
    }
});
