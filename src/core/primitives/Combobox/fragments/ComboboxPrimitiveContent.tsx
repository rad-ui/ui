'use client';
import React, { useContext } from 'react';
import { ComboboxPrimitiveContext } from '../contexts/ComboboxPrimitiveContext';
import Floater from '~/core/primitives/Floater';
import { ComboboxPrimitivePortalContext } from '../contexts/ComboboxPrimitivePortalContext';

export type ComboboxPrimitiveContentProps = {
    children: React.ReactNode;
    className?: string;
    position?: string;
    forceMount?: boolean;
    [key: string]: any;
}

function getPlacementState(placement: string) {
    const [side, align = 'center'] = placement.split('-');
    const crossAxisOrigin = align === 'start' ? 'left' : align === 'end' ? 'right' : 'center';
    const mainAxisOrigin = align === 'start' ? 'top' : align === 'end' ? 'bottom' : 'center';

    switch (side) {
    case 'top':
        return { side, align, transformOrigin: `${crossAxisOrigin} bottom` };
    case 'bottom':
        return { side, align, transformOrigin: `${crossAxisOrigin} top` };
    case 'left':
        return { side, align, transformOrigin: `right ${mainAxisOrigin}` };
    case 'right':
        return { side, align, transformOrigin: `left ${mainAxisOrigin}` };
    default:
        return { side: 'bottom', align: 'center', transformOrigin: 'center top' };
    }
}

const ComboboxPrimitiveContent = React.forwardRef<
    React.ElementRef<'div'>,
    ComboboxPrimitiveContentProps & React.ComponentPropsWithoutRef<'div'>
>(({ children, className, forceMount = false, style, ...props }, forwardedRef) => {
    const { forceMount: portalForceMount } = useContext(ComboboxPrimitivePortalContext);
    const {
        isOpen,
        elementsRef,
        labelsRef,
        floatingContext,
        refs,
        middlewareData,
        placedPlacement,
        getFloatingProps,
        floatingStyles,
        isPositioned
    } = useContext(ComboboxPrimitiveContext);
    const mergedRef = Floater.useMergeRefs([refs.setFloating, forwardedRef]);
    const shouldHideUntilPositioned = typeof navigator === 'undefined' || !/jsdom/i.test(navigator.userAgent);
    const placementState = getPlacementState(placedPlacement);
    const shouldRender = isOpen || forceMount || portalForceMount;

    if (!shouldRender) {
        return null;
    }

    const content = (
        <div
            ref={mergedRef}
            style={{
                ...floatingStyles,
                ...style,
                '--rad-ui-floating-transform-origin': placementState.transformOrigin,
                visibility: !isOpen
                    ? 'hidden'
                    : !isPositioned && shouldHideUntilPositioned
                        ? 'hidden'
                        : middlewareData.hide?.referenceHidden
                            ? 'hidden'
                            : (style?.visibility || floatingStyles.visibility),
                pointerEvents: !isOpen
                    ? 'none'
                    : middlewareData.hide?.referenceHidden
                        ? 'none'
                        : style?.pointerEvents
            }}
            className={className}
            data-state={isOpen ? 'open' : 'closed'}
            data-side={placementState.side}
            data-align={placementState.align}
            data-positioned={isPositioned ? '' : undefined}
            aria-hidden={!isOpen ? 'true' : undefined}
            {...getFloatingProps()}
            {...props}
        >
            {children}
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
        <Floater.FocusManager context={floatingContext}>
            <Floater.FloatingList elementsRef={elementsRef} labelsRef={labelsRef} >
                {content}
            </Floater.FloatingList>
        </Floater.FocusManager>
    );
});

ComboboxPrimitiveContent.displayName = 'ComboboxPrimitiveContent';

export default ComboboxPrimitiveContent;
