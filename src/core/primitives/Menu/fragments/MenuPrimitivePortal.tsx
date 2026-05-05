'use client';
import React, { useContext, useEffect, useState, forwardRef } from 'react';
import Floater from '~/core/primitives/Floater';
import ThemeContext from '~/components/ui/Theme/ThemeContext';
import MenuPrimitiveRootContext from '../contexts/MenuPrimitiveRootContext';
import { MenuPrimitivePortalContext } from '../contexts/MenuPrimitivePortalContext';

export type MenuPrimitivePortalElement = HTMLDivElement;
export type MenuPrimitivePortalProps = Omit<React.ComponentPropsWithoutRef<typeof Floater.Portal>, 'root'> & {
    children: React.ReactNode;
    container?: HTMLElement | null;
    forceMount?: boolean;
    /** @deprecated Use `container` instead. */
    root?: HTMLElement | null;
};

const MenuPrimitivePortal = forwardRef<MenuPrimitivePortalElement, MenuPrimitivePortalProps>(
    ({ children, container, forceMount = false, root, ...props }, ref) => {
        const context = useContext(MenuPrimitiveRootContext);
        const themeContext = useContext(ThemeContext);
        const [rootElementFound, setRootElementFound] = useState(false);
        const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

        useEffect(() => {
            const resolvedRoot = container
                ?? root
                ?? themeContext?.portalRootRef.current
                ?? document.querySelector('[data-rad-ui-portal-root]') as HTMLElement | null
                ?? themeContext?.containerRef.current
                ?? document.querySelector('#rad-ui-theme-container') as HTMLElement | null
                ?? document.body;

            setRootElement(resolvedRoot);

            if (resolvedRoot) {
                setRootElementFound(true);
            }
        }, [container, root, themeContext]);

        if (!context) return null;
        const shouldRender = context.isOpen || forceMount;

        if (!shouldRender || !rootElementFound || !rootElement) return null;
        return (
            <MenuPrimitivePortalContext.Provider value={{ forceMount }}>
                <Floater.Portal root={rootElement} {...props}>
                    <div ref={ref}>{children}</div>
                </Floater.Portal>
            </MenuPrimitivePortalContext.Provider>
        );
    }
);

MenuPrimitivePortal.displayName = 'MenuPrimitivePortal';

export default MenuPrimitivePortal;
