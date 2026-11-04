'use client';
import { createContext } from 'react';
import type { OpenChangeReason } from '~/core/utils/openChangeDetails';

type DialogPrimitiveContextType = {
  isOpen: boolean;
  handleOpenChange: (open: boolean, reason?: OpenChangeReason, event?: Event) => void;
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
  floaterContext?: any;
  /** True when this dialog is rendered inside another dialog. */
  nested?: boolean;
  /** How many dialogs nested in this one are open. */
  openChildCount?: number;
  /** Called after the open or close animations finish. */
  onOpenChangeComplete?: (open: boolean) => void;
  /** `true` blocks the page, `'trap-focus'` only traps focus, `false` leaves the page usable. */
  modal?: boolean | 'trap-focus';
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
