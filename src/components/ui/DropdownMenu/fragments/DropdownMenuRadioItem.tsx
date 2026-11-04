import React, { forwardRef, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import DropdownMenuContext from '../contexts/DropdownMenuContext';

export type DropdownMenuRadioItemProps = ComponentPropsWithoutRef<typeof MenuPrimitive.RadioItem>;

const DropdownMenuRadioItem = forwardRef<HTMLButtonElement, DropdownMenuRadioItemProps>(({ className, ...props }, ref) => {
    const context = React.useContext(DropdownMenuContext);
    const rootClass = context?.rootClass ?? '';
    return <MenuPrimitive.RadioItem ref={ref} className={clsx(rootClass && `${rootClass}-item`, rootClass && `${rootClass}-radio-item`, className) || undefined} data-slot="dropdown-menu-radio-item" {...props} />;
});

DropdownMenuRadioItem.displayName = 'DropdownMenuRadioItem';

export default DropdownMenuRadioItem;
