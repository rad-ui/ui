import React, { forwardRef, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import ContextMenuContext from '../contexts/ContextMenuContext';

export type ContextMenuRadioItemProps = ComponentPropsWithoutRef<typeof MenuPrimitive.RadioItem>;

const ContextMenuRadioItem = forwardRef<HTMLButtonElement, ContextMenuRadioItemProps>(({ className, ...props }, ref) => {
    const context = React.useContext(ContextMenuContext);
    const rootClass = context?.rootClass ?? '';
    return <MenuPrimitive.RadioItem ref={ref} className={clsx(rootClass && `${rootClass}-item`, rootClass && `${rootClass}-radio-item`, className) || undefined} data-slot="context-menu-radio-item" {...props} />;
});

ContextMenuRadioItem.displayName = 'ContextMenuRadioItem';

export default ContextMenuRadioItem;
