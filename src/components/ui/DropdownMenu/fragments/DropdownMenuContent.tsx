import React from 'react';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import DropdownMenuContext from '../contexts/DropdownMenuContext';
import clsx from 'clsx';

type DropdownMenuContentElement = React.ElementRef<typeof MenuPrimitive.Content>;
export type DropdownMenuContentProps = React.ComponentPropsWithoutRef<typeof MenuPrimitive.Content>;

const DropdownMenuContent = React.forwardRef<DropdownMenuContentElement, DropdownMenuContentProps>(({ children, className, ...props }, forwardedRef) => {
    const context = React.useContext(DropdownMenuContext);
    if (!context) {
        console.log('DropdownMenuContent should be used in the DropdownMenuRoot');
        return null;
    }
    const { rootClass } = context;
    return (
        <MenuPrimitive.Content ref={forwardedRef} className={clsx(`${rootClass}-content`, className)} {...props}>
            {children}
        </MenuPrimitive.Content>
    );
});

DropdownMenuContent.displayName = 'DropdownMenuContent';

export default DropdownMenuContent;
