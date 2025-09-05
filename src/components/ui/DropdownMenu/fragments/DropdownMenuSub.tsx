import React from 'react';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import DropdownMenuContext from '../contexts/DropdownMenuContext';
import clsx from 'clsx';

type DropdownMenuSubElement = React.ElementRef<typeof MenuPrimitive.Sub>;
export type DropdownMenuSubProps = React.ComponentPropsWithoutRef<typeof MenuPrimitive.Sub>;

const DropdownMenuSub = React.forwardRef<DropdownMenuSubElement, DropdownMenuSubProps>(({ children, className, ...props }, forwardedRef) => {
    const context = React.useContext(DropdownMenuContext);
    if (!context) {
        console.log('DropdownMenuSub should be used in the DropdownMenuRoot');
        return null;
    }
    const { rootClass } = context;
    return (
        <MenuPrimitive.Sub ref={forwardedRef} className={clsx(`${rootClass}-sub`, className)} {...props}>
            {children}
        </MenuPrimitive.Sub>
    );
});

DropdownMenuSub.displayName = 'DropdownMenuSub';

export default DropdownMenuSub;
