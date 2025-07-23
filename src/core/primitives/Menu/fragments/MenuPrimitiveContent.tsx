import React, { useEffect, useContext } from 'react';

import Floater from '~/core/primitives/Floater';
import MenuPrimitiveRootContext from '../contexts/MenuPrimitiveRootContext';

const MenuPrimitiveContent = ({ children, className }: any) => {
    const context = useContext(MenuPrimitiveRootContext);
    if (!context || !context.isOpen) return null;
    const { isOpen, refs, floatingStyles, getFloatingProps, elementsRef, labelsRef, nodeId, isNested } = context;
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
