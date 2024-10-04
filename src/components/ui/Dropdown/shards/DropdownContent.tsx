import React, {PropsWithChildren, useContext} from 'react';
import DropdownContext from '../context/DropdownContext';

export const Content = ({children}: PropsWithChildren) => {
    const ctx = useContext(DropdownContext);

    if (ctx === null) throw new Error('Component can only be used within a dropdown');

    const {floatingContentCss, visible, floatingContentRef} = ctx;

    return (
        <div role='menu' aria-hidden={!visible} style={{overflowY: 'auto', ...floatingContentCss}} ref={floatingContentRef}>
            {visible && children}
        </div>
    );
};

