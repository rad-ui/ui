'use client';

import React from 'react';
import type { TransitionStatus } from '~/core/hooks/useTransitionStatus';

export interface MenuPrimitiveRootPrimitiveContextProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refs: {
    reference: React.MutableRefObject<any>;
    floating: React.MutableRefObject<HTMLElement | null>;
    domReference: React.MutableRefObject<Element | null>;
    setReference(node: any): void;
    setFloating(node: HTMLElement | null): void;
    setPositionReference(node: Element): void;
  };
  floatingStyles: React.CSSProperties;
  /** Where the menu ended up, after flipping. */
  resolvedPlacement?: string;
  maxHeight: number | undefined;
  getReferenceProps: (userProps?: any) => any;
  getFloatingProps: (userProps?: any) => any;
  getItemProps: (userProps?: any) => any;
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
  listRef: React.MutableRefObject<any[]>;
  elementsRef: React.MutableRefObject<any[]>;
  labelsRef: React.MutableRefObject<any[]>;
  virtualItemRef: React.MutableRefObject<any>;
  nodeId: any;
  isNested: boolean;
  floatingContext: any;
  rtl: boolean;
  /** Reading direction, applied to the (portaled) menu content. */
  dir?: 'ltr' | 'rtl';
  /** Returns the top-level trigger of this menu tree (the sub trigger's root, for submenus). */
  getRootTrigger: () => Element | null;
  /** True while open or running an exit animation. */
  transitionMounted: boolean;
  transitionStatus: TransitionStatus;
  /** The top-level menu blocks the page while open. */
  modal?: boolean;
}

const MenuPrimitiveRootPrimitiveContext = React.createContext<MenuPrimitiveRootPrimitiveContextProps|null>(null);

export default MenuPrimitiveRootPrimitiveContext;
