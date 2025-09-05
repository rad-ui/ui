import React, { useContext } from 'react';

import Floater from '~/core/primitives/Floater';
import MenuPrimitiveRootContext from '../contexts/MenuPrimitiveRootContext';

export type MenuPrimitiveContentProps = {
    children: React.ReactNode;
    className?: string;
};

const MenuPrimitiveContent = React.forwardRef<HTMLDivElement, MenuPrimitiveContentProps>(({ children, className, ...props }, forwardedRef) => {
    const context = useContext(MenuPrimitiveRootContext);
    if (!context || !context.isOpen) return null;
    const { refs, floatingStyles, getFloatingProps, elementsRef, labelsRef, isNested, floatingContext } = context;

    return (

        <Floater.FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
            <Floater.FocusManager
                context={floatingContext}
                modal={false}
                initialFocus={isNested ? -1 : 0}
                returnFocus={!isNested}
            >
                <div
                    ref={Floater.useMergeRefs([refs.setFloating, forwardedRef])}
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
});

MenuPrimitiveContent.displayName = 'MenuPrimitiveContent';
export default MenuPrimitiveContent;
