import React from 'react';
import MenuPrimitive, { MenuPrimitiveProps } from '~/core/primitives/Menu/MenuPrimitive';
import { customClassSwitcher } from '~/core';
import clsx from 'clsx';
import Floater from '~/core/primitives/Floater';
import MenubarContext from '../contexts/MenubarContext';

export type MenubarRootProps = {
  children: React.ReactNode;
  customRootClass?: string;
  className?: string;
  dir?: 'ltr' | 'rtl';
  loop?: boolean;
};

const COMPONENT_NAME = 'Menubar';

const MenubarRoot = ({ children, customRootClass, className, dir, loop, ...props }:MenubarRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    return (
        <MenubarContext.Provider value={{ rootClass }} >
            <Floater.Composite className={clsx(`${rootClass}-root`, className)} dir={dir} loop={loop} {...props}>
                {children}
            </Floater.Composite>
        </MenubarContext.Provider>
    );
};

export default MenubarRoot;
