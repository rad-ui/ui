import React, { forwardRef } from 'react';
import { MenuComponentRoot, MenuPrimitiveRootElement, MenuPrimitiveRootProps } from './MenuPrimitiveRoot';

export type MenuPrimitiveSubProps = {
    children: React.ReactNode
    className?: string
    open?: boolean
    onOpenChange?: (open: boolean) => void
    defaultOpen?: boolean
} & MenuPrimitiveRootProps;

const MenuPrimitiveSub = forwardRef<MenuPrimitiveRootElement, MenuPrimitiveSubProps>(({ children, className, open, onOpenChange, defaultOpen = false, ...props }, ref) => {
    return (
        <MenuComponentRoot ref={ref} className={className} open={open} onOpenChange={onOpenChange} defaultOpen={defaultOpen} {...props}>
            {children}
        </MenuComponentRoot>
    );
});

MenuPrimitiveSub.displayName = 'MenuPrimitiveSub';

export default MenuPrimitiveSub;
