'use client';
import { createContext } from 'react';

type DialogPrimitiveContextType = {
  isOpen: boolean;
  handleOpenChange: (open: boolean) => void;
  handleOverlayClick: () => void;
  getItemProps: (userProps?: Record<string, unknown>) => any;
  getReferenceProps: (userProps?: Record<string, unknown>) => any;
  getFloatingProps: (userProps?: Record<string, unknown>) => any;
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
    getItemProps: (userProps = {}) => userProps,
    getReferenceProps: (userProps = {}) => userProps,
    getFloatingProps: (userProps = {}) => userProps,
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
