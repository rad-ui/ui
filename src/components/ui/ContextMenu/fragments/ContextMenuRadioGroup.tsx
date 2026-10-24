import React, { forwardRef, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import ContextMenuContext from '../contexts/ContextMenuContext';

export type ContextMenuRadioGroupProps = ComponentPropsWithoutRef<typeof MenuPrimitive.RadioGroup>;

const ContextMenuRadioGroup = forwardRef<HTMLDivElement, ContextMenuRadioGroupProps>(({ className, ...props }, ref) => {
    const context = React.useContext(ContextMenuContext);
    const rootClass = context?.rootClass ?? '';
    return <MenuPrimitive.RadioGroup ref={ref} className={clsx(rootClass && `${rootClass}-radio-group`, className) || undefined} data-slot="context-menu-radio-group" {...props} />;
});

ContextMenuRadioGroup.displayName = 'ContextMenuRadioGroup';

export default ContextMenuRadioGroup;
