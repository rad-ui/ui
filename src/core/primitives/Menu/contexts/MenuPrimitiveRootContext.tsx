'use client';

import React from 'react';

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
}

const MenuPrimitiveRootPrimitiveContext = React.createContext<MenuPrimitiveRootPrimitiveContextProps|null>(null);

export default MenuPrimitiveRootPrimitiveContext;
