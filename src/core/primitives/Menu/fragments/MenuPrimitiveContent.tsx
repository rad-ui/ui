import React, { useEffect, useContext } from 'react';

import Floater from '~/core/primitives/Floater';
import MenuPrimitiveRootContext from '../contexts/MenuPrimitiveRootContext';

export type MenuPrimitiveContentProps = {
    children: React.ReactNode;
    className?: string;
};

const MenuPrimitiveContent = ({ children, className }: MenuPrimitiveContentProps) => {
    const context = useContext(MenuPrimitiveRootContext);
    if (!context || !context.isOpen) return null;
    const { isOpen, refs, floatingStyles, getFloatingProps, elementsRef, labelsRef, nodeId, isNested, floatingContext } = context;
    return (
        <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className={className}
        >
            <Floater.FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>

                {children}

            </Floater.FloatingList>
        </div>

    );
};
export default MenuPrimitiveContent;
