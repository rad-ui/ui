import React, { forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import DropdownMenuContext from '../contexts/DropdownMenuContext';
import clsx from 'clsx';

export type DropdownMenuContentElement = ElementRef<typeof MenuPrimitive.Content>;
export type DropdownMenuContentProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<typeof MenuPrimitive.Content>;

const DropdownMenuContent = forwardRef<DropdownMenuContentElement, DropdownMenuContentProps>(({ children, className, ...props }, ref) => {
    const context = React.useContext(DropdownMenuContext);
    if (!context) {
        console.warn('DropdownMenuContent should be used in the DropdownMenuRoot');
        return null;
    }
    const { rootClass } = context;
    return (
        <MenuPrimitive.Content ref={ref} className={clsx(`${rootClass}-content`, className)} {...props}>
            {children}
        </MenuPrimitive.Content>
    );
});

DropdownMenuContent.displayName = 'DropdownMenuContent';

export default DropdownMenuContent;
