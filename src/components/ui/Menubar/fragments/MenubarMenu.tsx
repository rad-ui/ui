import React from 'react';
import MenuPrimitive, { MenuPrimitiveProps } from '~/core/primitives/Menu/MenuPrimitive';
import clsx from 'clsx';
import MenubarContext, { MenubarItem } from '../contexts/MenubarContext';
import Floater from '~/core/primitives/Floater';
import MenubarMenuContext from '../contexts/MenubarMenuContext';

export type MenubarMenuProps = {
  children: React.ReactNode;
  className?: string;
} & MenuPrimitiveProps.Root;

const MenubarMenu = ({ children, className, ...props }:MenubarMenuProps) => {
    const context = React.useContext(MenubarContext);
    const id = Floater.useId();

    if (!context) {
        console.log('MenubarMenu should be used in the MenubarRoot');
        return null;
    }
    const { rootClass, registerItem, items, updateItemState } = context;

    React.useEffect(() => {
        if (id) {
            registerItem(id);
        }
    }, [id]);

    const isOpen = items.find((item: MenubarItem) => item.id === id)?.state === 'open';
    return (

        <MenuPrimitive.Root className={clsx(`${rootClass}-menu`, className)} data-id={id} data-active={isOpen} open={isOpen} onOpenChange={(open) => id && updateItemState(id, open ? 'open' : 'closed')} {...props}>
            <MenubarMenuContext.Provider value={{ isOpen }}>
                {children}
            </MenubarMenuContext.Provider>
        </MenuPrimitive.Root>

    );
};

export default MenubarMenu;
