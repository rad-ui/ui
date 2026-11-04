import React, { forwardRef, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import ContextMenuContext from '../contexts/ContextMenuContext';

export type ContextMenuGroupLabelProps = ComponentPropsWithoutRef<typeof MenuPrimitive.GroupLabel>;

const ContextMenuGroupLabel = forwardRef<HTMLDivElement, ContextMenuGroupLabelProps>(({ className, ...props }, ref) => {
    const context = React.useContext(ContextMenuContext);
    const rootClass = context?.rootClass ?? '';
    return <MenuPrimitive.GroupLabel ref={ref} className={clsx(rootClass && `${rootClass}-label`, className) || undefined} data-slot="context-menu-label" {...props} />;
});

ContextMenuGroupLabel.displayName = 'ContextMenuGroupLabel';

export default ContextMenuGroupLabel;
