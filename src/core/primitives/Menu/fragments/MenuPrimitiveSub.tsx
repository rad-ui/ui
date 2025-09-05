import React from 'react';
import { MenuComponentRoot } from './MenuPrimitiveRoot';

export type MenuPrimitiveSubProps = {
    children: React.ReactNode
    className?: string
    open?: boolean
    onOpenChange?: (open: boolean) => void
    defaultOpen?: boolean
}

const MenuPrimitiveSub = React.forwardRef<HTMLDivElement, MenuPrimitiveSubProps>(({ children, className, open, onOpenChange, defaultOpen = false, ...props }, forwardedRef) => {
    return (
        <MenuComponentRoot ref={forwardedRef} className={className} open={open} onOpenChange={onOpenChange} defaultOpen={defaultOpen} {...props}>
            {children}
        </MenuComponentRoot>
    );
});

MenuPrimitiveSub.displayName = 'MenuPrimitiveSub';

export default MenuPrimitiveSub;
