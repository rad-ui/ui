'use client';
import React from 'react';
import Floater from '~/core/primitives/Floater';

export type DialogPrimitivePortalProps = {
  children: React.ReactNode;
};

const DialogPrimitivePortal = ({ children }: DialogPrimitivePortalProps) => {
    const fallback = document && document.body;
    const rootElement = document.querySelector('#rad-ui-theme-container') || fallback;

    return (
        <Floater.Portal
            root={rootElement}

        >
            {children}
        </Floater.Portal>
    );
};

export default DialogPrimitivePortal;
