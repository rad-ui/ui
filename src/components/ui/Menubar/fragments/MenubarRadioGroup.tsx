import React, { forwardRef, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import MenubarContext from '../contexts/MenubarContext';

export type MenubarRadioGroupProps = ComponentPropsWithoutRef<typeof MenuPrimitive.RadioGroup>;

const MenubarRadioGroup = forwardRef<HTMLDivElement, MenubarRadioGroupProps>(({ className, ...props }, ref) => {
    const context = React.useContext(MenubarContext);
    const rootClass = context?.rootClass ?? '';
    return <MenuPrimitive.RadioGroup ref={ref} className={clsx(rootClass && `${rootClass}-radio-group`, className) || undefined} data-slot="menubar-radio-group" {...props} />;
});

MenubarRadioGroup.displayName = 'MenubarRadioGroup';

export default MenubarRadioGroup;
