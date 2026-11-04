import React, { forwardRef, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import ContextMenuContext from '../contexts/ContextMenuContext';

export type ContextMenuCheckboxItemProps = ComponentPropsWithoutRef<typeof MenuPrimitive.CheckboxItem>;

const ContextMenuCheckboxItem = forwardRef<HTMLButtonElement, ContextMenuCheckboxItemProps>(({ className, ...props }, ref) => {
    const context = React.useContext(ContextMenuContext);
    const rootClass = context?.rootClass ?? '';
    return <MenuPrimitive.CheckboxItem ref={ref} className={clsx(rootClass && `${rootClass}-item`, rootClass && `${rootClass}-checkbox-item`, className) || undefined} data-slot="context-menu-checkbox-item" {...props} />;
});

ContextMenuCheckboxItem.displayName = 'ContextMenuCheckboxItem';

export default ContextMenuCheckboxItem;
