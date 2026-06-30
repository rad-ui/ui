'use client';
import React, { useContext, useEffect, useRef, useState, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
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

        useEffect(() => {
            rootElementRef.current = (container as HTMLElement | null)
                ?? themeContext?.portalRootRef.current
                ?? themeContext?.containerRef.current
                ?? document.body;
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
