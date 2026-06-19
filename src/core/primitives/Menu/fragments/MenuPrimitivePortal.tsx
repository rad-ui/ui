'use client';
import React, { useContext, useLayoutEffect, useRef, useState, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import Floater from '~/core/primitives/Floater';
import ThemeContext from '~/components/ui/Theme/ThemeContext';
import MenuPrimitiveRootContext from '../contexts/MenuPrimitiveRootContext';

export type MenuPrimitivePortalElement = HTMLDivElement;
export type MenuPrimitivePortalProps = {
    children: React.ReactNode;
    container?: Element | null;
} & ComponentPropsWithoutRef<typeof Floater.Portal>;

const MenuPrimitivePortal = forwardRef<MenuPrimitivePortalElement, MenuPrimitivePortalProps>(
    ({ children, container, ...props }, ref) => {
        const context = useContext(MenuPrimitiveRootContext);
        const themeContext = useContext(ThemeContext);
        const rootElementRef = useRef<HTMLElement | null>(null);
        const [isMounted, setIsMounted] = useState(false);

        useLayoutEffect(() => {
            if (container) {
                rootElementRef.current = container as HTMLElement;
            } else {
                rootElementRef.current = themeContext?.portalRootRef.current
                    || document.querySelector('[data-rad-ui-portal-root]') as HTMLElement | null
                    || themeContext?.containerRef.current
                    || document.querySelector('#rad-ui-theme-container') as HTMLElement | null
                    || document.body;
            }
            setIsMounted(true);
        }, [container, themeContext]);

        if (!context) return null;
        const { isOpen } = context;
        if (!isOpen || !isMounted) return null;

        return (
            <Floater.Portal root={rootElementRef.current} {...props}>
                <div ref={ref}>{children}</div>
            </Floater.Portal>
        );
    }
);

MenuPrimitivePortal.displayName = 'MenuPrimitivePortal';

export default MenuPrimitivePortal;
