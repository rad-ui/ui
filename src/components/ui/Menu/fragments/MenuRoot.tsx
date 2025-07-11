import React, { useState, useRef, forwardRef, PropsWithChildren } from 'react';
import { MenuContext } from '../context/MenuContext';
import { FloatingNode } from '@floating-ui/react';

const MenuRoot = forwardRef(({ children, ...props }: PropsWithChildren, forwardedRef) => {
    return (
        <MenuContext.Provider value={{}}>
            <div >
                {children}
            </div>
        </MenuContext.Provider>
    );
});

export default MenuRoot;

MenuRoot.displayName = 'MenuRoot';
