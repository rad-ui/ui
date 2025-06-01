'use client';
import React, { useContext, useEffect, useState } from 'react';
import Floater from '~/core/primitives/Floater';
import { SelectPrimitiveContext } from '../contexts/SelectPrimitiveContext';

function SelectPrimitivePortal({ children }: { children: React.ReactNode }) {
    const { isOpen } = useContext(SelectPrimitiveContext);
    const [rootElementFound, setRootElementFound] = useState(false);
    const rootElement = document.querySelector('#rad-ui-theme-container') || document.body as HTMLElement | null;

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

export default SelectPrimitivePortal;
