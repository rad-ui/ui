'use client';
import React, { useContext } from 'react';
import { ComboboxPrimitiveContext } from '../contexts/ComboboxPrimitiveContext';
import Floater from '~/core/primitives/Floater';
import { COMBOBOX_SEARCH_PART } from '../contexts/ComboboxSearchPart';

export type ComboboxPrimitiveContentProps = {
    children: React.ReactNode;
    className?: string;
    position?: string;
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
>(({ children, className, style, onKeyDownCapture, ...props }, forwardedRef) => {
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
        isPositioned,
        activeIndex,
        hasSearch,
        handleSelect,
        isTypingRef
    } = useContext(ComboboxPrimitiveContext);
    const mergedRef = Floater.useMergeRefs([refs.setFloating, forwardedRef]);
    const shouldHideUntilPositioned = typeof navigator === 'undefined' || !/jsdom/i.test(navigator.userAgent);
    const placementState = getPlacementState(placedPlacement);
    const isHiddenUntilPositioned = !isPositioned && shouldHideUntilPositioned;

    // Pointer-opening a list with a selection highlights that option but leaves focus on the list
    // container. Floating UI then treats Arrow keys as "nothing focused" and keeps resetting to the
    // same index, so move real focus onto the highlighted option before navigation runs (capture
    // phase, ahead of Floating UI's handler), and let Enter/Space select it directly.
    const handleContainerKeyDownCapture = (event: React.KeyboardEvent<HTMLDivElement>) => {
        onKeyDownCapture?.(event);
        if (event.defaultPrevented || hasSearch || event.target !== event.currentTarget || activeIndex === null) return;
        const activeElement = elementsRef.current[activeIndex];
        if (!activeElement) return;

        if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
            activeElement.focus({ preventScroll: true });
        } else if (event.key === 'Enter' || (event.key === ' ' && !isTypingRef.current)) {
            event.preventDefault();
            handleSelect(activeIndex);
        }
    };

    // APG combobox: the search input must not live inside role="listbox" (a listbox may only own
    // options/groups). When a search part is present the floating element becomes a plain popup and
    // the remaining children are wrapped in the listbox that the input controls. Leading search parts
    // render before the listbox, any later ones after it.
    const childArray = React.Children.toArray(children);
    const isSearchPart = (child: React.ReactNode) => React.isValidElement(child)
        && Boolean((child.type as { [COMBOBOX_SEARCH_PART]?: boolean })?.[COMBOBOX_SEARCH_PART]);
    const hasSearchPart = childArray.some(isSearchPart);
    const firstListIndex = childArray.findIndex((child) => !isSearchPart(child));
    const leadingSearch = hasSearchPart
        ? childArray.filter((child, index) => isSearchPart(child) && (firstListIndex === -1 || index < firstListIndex))
        : [];
    const trailingSearch = hasSearchPart
        ? childArray.filter((child, index) => isSearchPart(child) && firstListIndex !== -1 && index > firstListIndex)
        : [];
    const listChildren = hasSearchPart ? childArray.filter((child) => !isSearchPart(child)) : [];

    const floatingProps = (getFloatingProps as (userProps?: Record<string, unknown>) => Record<string, unknown>)({
        ...props,
        onKeyDownCapture: handleContainerKeyDownCapture,
        className,
        style: {
            ...floatingStyles,
            ...style,
            '--rad-ui-floating-transform-origin': placementState.transformOrigin,
            visibility: isHiddenUntilPositioned
                ? 'hidden'
                : middlewareData.hide?.referenceHidden
                    ? 'hidden'
                    : (style?.visibility || floatingStyles.visibility),
            pointerEvents: middlewareData.hide?.referenceHidden
                ? 'none'
                : style?.pointerEvents
        },
        'data-state': isOpen ? 'open' : 'closed',
        'data-side': placementState.side,
        'data-align': placementState.align,
        'data-positioned': isPositioned ? '' : undefined
    });
    const {
        id: listboxId,
        role: listboxRole,
        'aria-orientation': listboxOrientation,
        ...popupProps
    } = floatingProps as Record<string, any>;

    return (
        <>
            {isOpen && (
                // Tabbable detection ignores `visibility: hidden` content, so wait until the list is
                // positioned (and visible) before moving focus into it; otherwise focus lands on the
                // container instead of the search field or the selected option.
                <Floater.FocusManager context={floatingContext} disabled={isHiddenUntilPositioned}>
                    <Floater.FloatingList elementsRef={elementsRef} labelsRef={labelsRef} >
                        {hasSearchPart ? (
                            <div ref={mergedRef} {...popupProps} id={`${listboxId}-popup`}>
                                {leadingSearch}
                                <div
                                    id={listboxId}
                                    role={listboxRole}
                                    aria-orientation={listboxOrientation}
                                    data-slot="combobox-listbox"
                                >
                                    {listChildren}
                                </div>
                                {trailingSearch}
                            </div>
                        ) : (
                            <div
                                ref={mergedRef}
                                {...popupProps}
                                id={listboxId}
                                role={listboxRole}
                                aria-orientation={listboxOrientation}
                            >
                                {children}
                            </div>
                        )}
                    </Floater.FloatingList>
                </Floater.FocusManager>
            )}
        </>

    );
});

ComboboxPrimitiveContent.displayName = 'ComboboxPrimitiveContent';

export default ComboboxPrimitiveContent;
