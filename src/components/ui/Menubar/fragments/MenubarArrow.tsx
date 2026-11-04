import React, { forwardRef, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import MenubarContext from '../contexts/MenubarContext';

export type MenubarArrowProps = ComponentPropsWithoutRef<typeof MenuPrimitive.Arrow>;

/** An arrow pointing from the menu to its trigger. Render it inside Content. */
const MenubarArrow = forwardRef<SVGSVGElement, MenubarArrowProps>(({ className, ...props }, ref) => {
    const context = React.useContext(MenubarContext);
    const rootClass = context?.rootClass ?? '';
    return <MenuPrimitive.Arrow ref={ref} className={clsx(rootClass && `${rootClass}-arrow`, className) || undefined} data-slot="menubar-arrow" {...props} />;
});

MenubarArrow.displayName = 'MenubarArrow';

export default MenubarArrow;
