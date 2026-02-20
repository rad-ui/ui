import React, { useContext, forwardRef } from 'react';

import Floater from '~/core/primitives/Floater';
import MenuPrimitiveRootContext from '../contexts/MenuPrimitiveRootContext';

export type MenuPrimitiveContentProps = {
    children: React.ReactNode;
    className?: string;
};

const MenuPrimitiveContent = forwardRef<HTMLDivElement, MenuPrimitiveContentProps>(
    ({ children, className, ...props }, propRef) => {
        const context = useContext(MenuPrimitiveRootContext);
        const mergedRef = Floater.useMergeRefs([
            context?.refs.setFloating,
            propRef
        ]);
        if (!context || !context.isOpen) return null;
        const {
            floatingStyles,
            getFloatingProps,
            elementsRef,
            labelsRef,
            isNested,
            floatingContext
        } = context;

        return (
            <Floater.FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
                <Floater.FocusManager
                    context={floatingContext}
                    modal={false}
                    initialFocus={isNested ? -1 : 0}
                    returnFocus={!isNested}
                >
                    <div
                        ref={mergedRef}
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
    }
);

MenuPrimitiveContent.displayName = 'MenuPrimitiveContent';
export default MenuPrimitiveContent;
