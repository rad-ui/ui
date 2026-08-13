import React, { useContext, forwardRef } from 'react';

import Floater from '~/core/primitives/Floater';
import MenuPrimitiveRootContext from '../contexts/MenuPrimitiveRootContext';

export type MenuPrimitiveContentProps = {
    children: React.ReactNode;
    className?: string;
    initialFocus?: number;
    focusManagerDisabled?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const MenuPrimitiveContent = forwardRef<HTMLDivElement, MenuPrimitiveContentProps>(
    ({ children, className, initialFocus, focusManagerDisabled = false, ...props }, propRef) => {
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
            <>
            <Floater.FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
                <Floater.FocusManager
                    context={floatingContext}
                    disabled={focusManagerDisabled}
                    modal={false}
                    initialFocus={initialFocus ?? (isNested ? -1 : 0)}
                    returnFocus={!isNested}
                >         
                    <div
                        ref={mergedRef}
                        {...getFloatingProps({
                            className
                        })}
                        {...props}
                        style={{
                            ...floatingStyles,
                            ...props.style
                        }}
                        className={className}
                    >
                        <div style={{overflowY:"auto", overflowX:"hidden"}}>
                        {children}
                        </div>
                    </div>
                </Floater.FocusManager>
            </Floater.FloatingList>
             </>
        );
    }
);

MenuPrimitiveContent.displayName = 'MenuPrimitiveContent';
export default MenuPrimitiveContent;
