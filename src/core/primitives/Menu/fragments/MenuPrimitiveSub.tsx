import React from 'react';
import { MenuComponentRoot } from './MenuPrimitiveRoot';

export type MenuPrimitiveSubProps = {
    children: React.ReactNode
    className?: string
    open?: boolean
    onOpenChange?: (open: boolean) => void
    defaultOpen?: boolean
}

const MenuPrimitiveSub = ({ children, className, open, onOpenChange, defaultOpen = false }: MenuPrimitiveSubProps) => {
    return (
        <MenuComponentRoot className={className} open={open} onOpenChange={onOpenChange} defaultOpen={defaultOpen}>
            {children}
        </MenuComponentRoot>
    );
};

export default MenuPrimitiveSub;
