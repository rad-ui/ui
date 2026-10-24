import React, { forwardRef, ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import DropdownMenuContext from '../contexts/DropdownMenuContext';

export type DropdownMenuRadioGroupProps = ComponentPropsWithoutRef<typeof MenuPrimitive.RadioGroup>;

const DropdownMenuRadioGroup = forwardRef<HTMLDivElement, DropdownMenuRadioGroupProps>(({ className, ...props }, ref) => {
    const context = React.useContext(DropdownMenuContext);
    const rootClass = context?.rootClass ?? '';
    return <MenuPrimitive.RadioGroup ref={ref} className={clsx(rootClass && `${rootClass}-radio-group`, className) || undefined} data-slot="dropdown-menu-radio-group" {...props} />;
});

DropdownMenuRadioGroup.displayName = 'DropdownMenuRadioGroup';

export default DropdownMenuRadioGroup;
