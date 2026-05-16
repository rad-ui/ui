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
    setReference: React.RefCallback<any> | (() => void);
    setFloating: React.RefCallback<any> | (() => void);
    reference?: { current?: any };
    floating?: { current?: any };
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
        setFloating: () => {},
        reference: { current: null },
        floating: { current: null }
    },
    floatingStyles: {
        position: 'absolute'
    }
});
