import React, { useContext } from 'react';

import Floater from '~/core/primitives/Floater';
import MenuPrimitiveRootContext from '../contexts/MenuPrimitiveRootContext';

export type MenuPrimitiveContentProps = {
    children: React.ReactNode;
    className?: string;
};

const MenuPrimitiveContent = ({ children, className, ...props }: MenuPrimitiveContentProps) => {
    const context = useContext(MenuPrimitiveRootContext);
    if (!context || !context.isOpen) return null;
    const { isOpen, refs, floatingStyles, getFloatingProps, elementsRef, labelsRef, nodeId, isNested, floatingContext } = context;

    return (

        <Floater.FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
            <Floater.FocusManager
                context={floatingContext}
                modal={false}
                initialFocus={isNested ? -1 : 0}
                returnFocus={!isNested}
            >
                <div
                    ref={refs.setFloating}
                    style={floatingStyles}
                    {...getFloatingProps()}
                    className={className}
                    {...props}
                >
                    {children}
                </div>
            </Floater.FocusManager>
        </Floater.FloatingList>

    );
};
export default MenuPrimitiveContent;
