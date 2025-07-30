import React from 'react';
import MenuPrimitive, { MenuPrimitiveProps } from '~/core/primitives/Menu/MenuPrimitive';
import { customClassSwitcher } from '~/core';
import clsx from 'clsx';
import Floater from '~/core/primitives/Floater';
import MenubarContext from '../contexts/MenubarContext';
import Menubar from '../Menubar';

export type MenubarRootProps = {
  children: React.ReactNode;
  customRootClass?: string;
  className?: string;
} & MenuPrimitiveProps.Root;

const COMPONENT_NAME = 'Menubar';

const MenubarRoot = ({ children, customRootClass, className }:MenubarRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    const [activeIndex, setActiveIndex] = React.useState(0);
    return (
        <MenubarContext.Provider value={{ rootClass }} >
            <Floater.Composite>
                {children}
                </Floater.Composite>
        </MenubarContext.Provider>
    );
};

export default MenubarRoot;
