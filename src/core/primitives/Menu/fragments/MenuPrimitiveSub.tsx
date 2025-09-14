import React, { forwardRef, useContext } from 'react';
import { MenuComponentRoot, MenuPrimitiveRootElement, MenuPrimitiveRootProps } from './MenuPrimitiveRoot';
import MenuPrimitiveRootContext from '../contexts/MenuPrimitiveRootContext';

export type MenuPrimitiveSubProps = {
    children: React.ReactNode
    className?: string
    open?: boolean
    onOpenChange?: (open: boolean) => void
    defaultOpen?: boolean
} & MenuPrimitiveRootProps;

const MenuPrimitiveSub = forwardRef<MenuPrimitiveRootElement, MenuPrimitiveSubProps>(({ children, className, open, onOpenChange, defaultOpen = false, ...props }, ref) => {
    const context = useContext(MenuPrimitiveRootContext);
    return (
        <MenuComponentRoot ref={ref} className={className} open={open} onOpenChange={onOpenChange} defaultOpen={defaultOpen} rtl={context && context.rtl || false} {...props}>
            {children}
        </MenuComponentRoot>
    );
});

MenuPrimitiveSub.displayName = 'MenuPrimitiveSub';

export default MenuPrimitiveSub;
