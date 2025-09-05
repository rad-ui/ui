import React from 'react';
import MenuPrimitive from '~/core/primitives/Menu/MenuPrimitive';
import DropdownMenuContext from '../contexts/DropdownMenuContext';

type DropdownMenuPortalElement = React.ElementRef<typeof MenuPrimitive.Portal>;
export type DropdownMenuPortalProps = React.ComponentPropsWithoutRef<typeof MenuPrimitive.Portal>;

const DropdownMenuPortal = React.forwardRef<DropdownMenuPortalElement, DropdownMenuPortalProps>(({ children, ...props }, _forwardedRef) => {
    const context = React.useContext(DropdownMenuContext);
    if (!context) {
        console.log('DropdownMenuPortal should be used in the DropdownMenuRoot');
        return null;
    }
    return (
        <MenuPrimitive.Portal {...props}>
            {children}
        </MenuPrimitive.Portal>
    );
});

DropdownMenuPortal.displayName = 'DropdownMenuPortal';

export default DropdownMenuPortal;
