import React from 'react';
import Floater from '~/core/primitives/Floater';

function SelectPrimitivePortal({ children }: { children: React.ReactNode }) {
    const rootElement = document.querySelector('#rad-ui-theme-container') || document.body as HTMLElement | null;
    return (
        <Floater.Portal
            root={rootElement}

        >
            {children}
        </Floater.Portal>
    );
}

export default SelectPrimitivePortal;