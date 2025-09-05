'use client';
import React, { useContext, useEffect, useState, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import Floater from '~/core/primitives/Floater';
import MenuPrimitiveRootContext from '../contexts/MenuPrimitiveRootContext';

export type MenuPrimitivePortalElement = HTMLDivElement;
export type MenuPrimitivePortalProps = { children: React.ReactNode } & ComponentPropsWithoutRef<typeof Floater.Portal>;

const MenuPrimitivePortal = forwardRef<MenuPrimitivePortalElement, MenuPrimitivePortalProps>(({ children, ...props }, ref) => {
    const context = useContext(MenuPrimitiveRootContext);
    if (!context) return null;
    const { isOpen } = context;
    const [rootElementFound, setRootElementFound] = useState(false);
    const rootElement = (document.querySelector('#rad-ui-theme-container') || document.body) as HTMLElement | null;

    useEffect(() => {
        if (rootElement) {
            setRootElementFound(true);
        }
    }, [rootElement]);

    if (!isOpen || !rootElementFound) return null;
    return (
        <Floater.Portal root={rootElement} {...props}>
            <div ref={ref}>
                {children}
            </div>
        </Floater.Portal>
    );
});

MenuPrimitivePortal.displayName = 'MenuPrimitivePortal';

export default MenuPrimitivePortal;
