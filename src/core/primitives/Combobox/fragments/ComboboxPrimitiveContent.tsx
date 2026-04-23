'use client';
import React, { useContext } from 'react';
import { ComboboxPrimitiveContext } from '../contexts/ComboboxPrimitiveContext';
import Floater from '~/core/primitives/Floater';

export type ComboboxPrimitiveContentProps = {
    children: React.ReactNode;
    className?: string;
    position?: string;
    [key: string]: any;
}

const ComboboxPrimitiveContent = React.forwardRef<
    React.ElementRef<'div'>,
    ComboboxPrimitiveContentProps & React.ComponentPropsWithoutRef<'div'>
>(({ children, className, style, ...props }, forwardedRef) => {
    const { isOpen, elementsRef, labelsRef, floatingContext, refs, getFloatingProps, floatingStyles, isPositioned } = useContext(ComboboxPrimitiveContext);
    const mergedRef = Floater.useMergeRefs([refs.setFloating, forwardedRef]);
    const shouldHideUntilPositioned = typeof navigator === 'undefined' || !/jsdom/i.test(navigator.userAgent);

    return (
        <>
            {isOpen && (
                <Floater.FocusManager context={floatingContext}>
                    <Floater.FloatingList elementsRef={elementsRef} labelsRef={labelsRef} >
                        <div
                            ref={mergedRef}
                            style={{
                                ...floatingStyles,
                                ...style,
                                visibility: !isPositioned && shouldHideUntilPositioned
                                    ? 'hidden'
                                    : (style?.visibility || floatingStyles.visibility)
                            }}
                            className={className}
                            data-state={isOpen ? 'open' : 'closed'}
                            data-positioned={isPositioned ? '' : undefined}
                            {...getFloatingProps()}
                            {...props}
                        >

                            {children}

                        </div>
                    </Floater.FloatingList>
                </Floater.FocusManager>
            )}
        </>

    );
});

ComboboxPrimitiveContent.displayName = 'ComboboxPrimitiveContent';

export default ComboboxPrimitiveContent;
