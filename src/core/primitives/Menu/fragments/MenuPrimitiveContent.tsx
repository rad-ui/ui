import React, { useContext, forwardRef } from 'react';

import Floater from '~/core/primitives/Floater';
import MenuPrimitiveRootContext from '../contexts/MenuPrimitiveRootContext';
import { MenuPrimitivePortalContext } from '../contexts/MenuPrimitivePortalContext';

export type MenuPrimitiveContentProps = {
    children: React.ReactNode;
    className?: string;
    forceMount?: boolean;
};

const MenuPrimitiveContent = forwardRef<HTMLDivElement, MenuPrimitiveContentProps>(
    ({ children, className, forceMount = false, ...props }, propRef) => {
        const context = useContext(MenuPrimitiveRootContext);
        const { forceMount: portalForceMount } = useContext(MenuPrimitivePortalContext);
        const mergedRef = Floater.useMergeRefs([
            context?.refs.setFloating,
            propRef
        ]);
        if (!context) return null;
        const {
            isOpen,
            floatingStyles,
            getFloatingProps,
            elementsRef,
            labelsRef,
            isNested,
            floatingContext
        } = context;
        const shouldRender = isOpen || forceMount || portalForceMount;

        if (!shouldRender) return null;

        const content = (
            <div
                ref={mergedRef}
                style={{
                    ...floatingStyles,
                    visibility: isOpen ? undefined : 'hidden',
                    pointerEvents: isOpen ? undefined : 'none'
                }}
                data-state={isOpen ? 'open' : 'closed'}
                {...getFloatingProps()}
                className={className}
                {...props}
            >
                <div style={{ overflowY: 'auto', overflowX: 'hidden' }}>
                    {children}
                </div>
            </div>
        );

        if (!isOpen) {
            return (
                <Floater.FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
                    {content}
                </Floater.FloatingList>
            );
        }

        return (
            <Floater.FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
                <Floater.FocusManager
                    context={floatingContext}
                    modal={false}
                    initialFocus={isNested ? -1 : 0}
                    returnFocus={!isNested}
                >
                    {content}
                </Floater.FocusManager>
            </Floater.FloatingList>
        );
    }
);

MenuPrimitiveContent.displayName = 'MenuPrimitiveContent';
export default MenuPrimitiveContent;
