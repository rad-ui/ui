import React, { forwardRef, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import ContextMenuContext from '../contexts/ContextMenuContext';

export type ContextMenuGroupProps = ComponentPropsWithoutRef<typeof MenuPrimitive.Group>;

const ContextMenuGroup = forwardRef<HTMLDivElement, ContextMenuGroupProps>(({ className, ...props }, ref) => {
    const context = React.useContext(ContextMenuContext);
    const rootClass = context?.rootClass ?? '';
    return <MenuPrimitive.Group ref={ref} className={clsx(rootClass && `${rootClass}-group`, className) || undefined} data-slot="context-menu-group" {...props} />;
});

ContextMenuGroup.displayName = 'ContextMenuGroup';

export default ContextMenuGroup;
