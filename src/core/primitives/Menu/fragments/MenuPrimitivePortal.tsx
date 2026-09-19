'use client';
import React, { useContext, useEffect, useState, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import Floater from '~/core/primitives/Floater';
import MenuPrimitiveRootContext from '../contexts/MenuPrimitiveRootContext';
import ThemeContext from '~/components/ui/Theme/ThemeContext';

export type MenuPrimitivePortalElement = HTMLDivElement;
export type MenuPrimitivePortalProps = { children: React.ReactNode } & ComponentPropsWithoutRef<typeof Floater.Portal>;

const MenuPrimitivePortal = forwardRef<MenuPrimitivePortalElement, MenuPrimitivePortalProps>(
    ({ children, ...props }, ref) => {
        const context = useContext(MenuPrimitiveRootContext);
        const themeContext = useContext(ThemeContext);
        const [rootElementFound, setRootElementFound] = useState(false);
        const rootElement = (
            themeContext?.portalRootRef.current
            ?? themeContext?.containerRef.current
            ?? document.body
        ) as HTMLElement | null;

        useEffect(() => {
            if (rootElement) {
                setRootElementFound(true);
            }
        }, [rootElement]);

        if (!context) return null;
        const { isOpen } = context;
        if (!isOpen || !rootElementFound) return null;
        return (
            <Floater.Portal root={rootElement} {...props}>
                <div ref={ref}>{children}</div>
            </Floater.Portal>
        );
    }
);

MenuPrimitivePortal.displayName = 'MenuPrimitivePortal';

export default MenuPrimitivePortal;
