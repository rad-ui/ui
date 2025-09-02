'use client';
import React, { useContext, useEffect, useState } from 'react';
import Floater from '~/core/primitives/Floater';
import MenuPrimitiveRootContext from '../contexts/MenuPrimitiveRootContext';

function MenuPrimitivePortal({ children }: { children: React.ReactNode }) {
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
        <Floater.Portal root={rootElement}>
            {children}
        </Floater.Portal>
    );
}

export default MenuPrimitivePortal;
