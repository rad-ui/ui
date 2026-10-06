'use client';
import React, { useContext, useEffect, useState, forwardRef, ComponentPropsWithoutRef } from 'react';
import Floater from '~/core/primitives/Floater';
import MenuPrimitiveRootContext from '../contexts/MenuPrimitiveRootContext';
import { MenuPrimitivePortalContext } from '../contexts/MenuPrimitivePortalContext';
import ThemeContext from '~/components/ui/Theme/ThemeContext';

export type MenuPrimitivePortalElement = HTMLDivElement;
export type MenuPrimitivePortalProps = Omit<ComponentPropsWithoutRef<typeof Floater.Portal>, 'root'> & {
    children: React.ReactNode;
    /** Element to portal into. Defaults to the Theme's portal root, then the Theme container, then `document.body`. */
    container?: HTMLElement | null;
    /** Keep the portal (and content) mounted while closed, e.g. for exit animations. */
    forceMount?: boolean;
    /** @deprecated Use `container`. */
    root?: HTMLElement | null;
};

const MenuPrimitivePortal = forwardRef<MenuPrimitivePortalElement, MenuPrimitivePortalProps>(
    ({ children, container, forceMount = false, root, ...props }, ref) => {
        const context = useContext(MenuPrimitiveRootContext);
        const themeContext = useContext(ThemeContext);
        // Resolve the portal root after mount: `document` does not exist during server rendering.
        const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

        useEffect(() => {
            setRootElement(
                (container
                ?? root
                ?? themeContext?.portalRootRef.current
                ?? themeContext?.containerRef.current
                ?? document.body) as HTMLElement
            );
        }, [container, root, themeContext]);

        if (!context) return null;
        if ((!context.isOpen && !forceMount) || !rootElement) return null;
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
