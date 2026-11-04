import React, { forwardRef, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import MenubarContext from '../contexts/MenubarContext';

export type MenubarRadioItemProps = ComponentPropsWithoutRef<typeof MenuPrimitive.RadioItem>;

const MenubarRadioItem = forwardRef<HTMLButtonElement, MenubarRadioItemProps>(({ className, ...props }, ref) => {
    const context = React.useContext(MenubarContext);
    const rootClass = context?.rootClass ?? '';
    return <MenuPrimitive.RadioItem ref={ref} className={clsx(rootClass && `${rootClass}-item`, rootClass && `${rootClass}-radio-item`, className) || undefined} data-slot="menubar-radio-item" {...props} />;
});

MenubarRadioItem.displayName = 'MenubarRadioItem';

export default MenubarRadioItem;
