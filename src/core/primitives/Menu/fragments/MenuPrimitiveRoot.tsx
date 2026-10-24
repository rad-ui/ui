import React, { useState, useRef, useContext, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import MenuPrimitiveRootContext from '../contexts/MenuPrimitiveRootContext';
import Floater from '~/core/primitives/Floater';
import { useControllableState } from '~/core/hooks/useControllableState';
import { useRegisterDocumentOverlayOpen } from '~/core/hooks/useRegisterDocumentOverlayOpen';
import { useDirection } from '~/core/hooks/useDirection';
import { useTransitionStatus } from '~/core/hooks/useTransitionStatus';
import { callOpenChange, createOpenChangeDetails, fromFloatingReason, OpenChangeDetails, OpenChangeReason } from '~/core/utils/openChangeDetails';

const noop = () => {};
import type { PopupHandle } from '~/core/utils/popupHandle';
import useIsomorphicLayoutEffect from '~/core/hooks/useLayoutEffect';

export type MenuPrimitiveRootElement = ElementRef<'div'>;
export type MenuPrimitiveRootProps = {
    /** Content, or a function of the payload passed by the trigger that opened it (with `handle`). */
    children: React.ReactNode | ((state: { payload: unknown }) => React.ReactNode)
    /** Connects detached triggers made with `createHandle()`; the menu anchors to whichever opened it. */
    handle?: PopupHandle<any>
    className?: string
    open?: boolean
    /** Called with the next open state; a two-parameter handler also gets details (`reason`, `event`, `cancel()`). */
    onOpenChange?: (open: boolean, details: OpenChangeDetails) => void
    defaultOpen?: boolean
    crossAxisOffset?: number
    mainAxisOffset?: number
    collisionBoundary?: Element | null | Array<Element | null>
    collisionPadding?: number
    loop?: boolean
    placement?: | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end';
  avoidCollision?: boolean
  /** @deprecated Use `dir="rtl"`. */
  rtl?: boolean
  /** Reading direction. In `rtl`, ArrowLeft/ArrowRight open and close submenus and submenus open on the left. Submenus inherit it. */
  dir?: 'ltr' | 'rtl'
  /** Also open the menu while the pointer rests on its trigger. Clicking still toggles it. */
  openOnHover?: boolean
  /** With `openOnHover`, ms the pointer rests before opening. */
  hoverOpenDelay?: number
  /** With `openOnHover`, ms after the pointer leaves before closing. */
  hoverCloseDelay?: number
  /**
   * While open, block the rest of the page: an outside press only closes the menu, page
   * scroll is locked and outside content is hidden from assistive technology.
   */
  modal?: boolean
  /** Called after the open or close animations finish (at once when there are none). */
  onOpenChangeComplete?: (open: boolean) => void
} & Omit<ComponentPropsWithoutRef<'div'>, 'dir' | 'children'>;

type MenuComponentRootProps = MenuPrimitiveRootProps & {
    /** Internal: set by MenuPrimitive.Sub so the menu behaves as a submenu. */
    isSubmenu?: boolean
};

export const MenuComponentRoot = forwardRef<MenuPrimitiveRootElement, MenuComponentRootProps>(({ children, className, open, onOpenChange, defaultOpen = false, crossAxisOffset, mainAxisOffset, collisionBoundary = null, collisionPadding = 4, loop = true, placement = 'bottom-start', avoidCollision = true, rtl = false, dir, isSubmenu = false, openOnHover = false, hoverOpenDelay = 100, hoverCloseDelay = 0, handle, modal = false, onOpenChangeComplete, ...props }, ref) => {
    const resolvedDir = useDirection(dir);
    const isRtl = rtl || resolvedDir === 'rtl';
    const direction: 'ltr' | 'rtl' | undefined = isRtl ? 'rtl' : resolvedDir;
    const [isOpen, setOpenState] = useControllableState(
        open,
        defaultOpen,
        noop
    );
    // onOpenChange is called here with details; the state hook only stores the value.
    const onOpenChangeRef = React.useRef(onOpenChange);
    onOpenChangeRef.current = onOpenChange;
    const isOpenRef = React.useRef(Boolean(isOpen));
    isOpenRef.current = Boolean(isOpen);
    const setIsOpen = React.useCallback((nextOpenOrUpdater: React.SetStateAction<boolean>, reason: OpenChangeReason = 'none', event?: Event) => {
        const nextOpen = typeof nextOpenOrUpdater === 'function' ? nextOpenOrUpdater(isOpenRef.current) : nextOpenOrUpdater;
        const details = createOpenChangeDetails(reason, event);
        callOpenChange(onOpenChangeRef.current, nextOpen, details);
        if (details.isCanceled) return;
        setOpenState(nextOpen);
    }, [setOpenState]);

    useRegisterDocumentOverlayOpen(isOpen);

    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [maxHeight, setMaxHeight] = useState<number | undefined>(undefined);

    const listRef = useRef([]);
    const elementsRef = useRef([]);
    const labelsRef = useRef([]);
    const virtualItemRef = useRef(null);

    const nodeId = Floater.useFloatingNodeId();
    const parentId = Floater.useFloatingParentNodeId();
    // A menu can live inside another floating element's tree (e.g. a Dialog or
    // Popover), so "nested" means "is a submenu", not "has a floating parent".
    const isNested = isSubmenu;

    const effectiveCrossAxisOffset = crossAxisOffset ?? 0;
    const effectiveMainAxisOffset =
        mainAxisOffset !== undefined ? mainAxisOffset : isNested ? 14 : 4;
    const boundary = Array.isArray(collisionBoundary) ? collisionBoundary : [collisionBoundary];
    const filteredBoundary = boundary.filter((item): item is Element => item != null);
    const hasCustomCollisionBoundary = filteredBoundary.length > 0;
    const sharedDetectOverflowOptions = hasCustomCollisionBoundary
        ? {
            boundary: filteredBoundary,
            altBoundary: true
        }
        : {};
    const flipOptions = {
        mainAxis: avoidCollision,
        crossAxis: avoidCollision && !isNested,
        padding: collisionPadding,
        ...sharedDetectOverflowOptions
    };
    const shiftOptions = {
        padding: collisionPadding,
        crossAxis: !isNested,
        ...sharedDetectOverflowOptions
    };
    const sizeOptions = {
        padding: collisionPadding,
        ...sharedDetectOverflowOptions
    };

    const { refs, floatingStyles, context: floatingContext } = Floater.useFloating({
        open: isOpen,
        nodeId,
        onOpenChange: (nextOpen, event, reason) => {
            setIsOpen(nextOpen, fromFloatingReason(reason), event);
            if (!nextOpen) handle?.close();
        },
        strategy: 'fixed',
        transform: false,
        // Submenus open toward the inline end: right in LTR, left in RTL.
        placement: isNested ? (isRtl ? 'left-start' : 'right-start') : placement,
        middleware: [
            Floater.offset({
                mainAxis: effectiveMainAxisOffset,
                crossAxis: effectiveCrossAxisOffset
            }),
            ...(avoidCollision ? [
                Floater.flip(flipOptions),
                Floater.shift(shiftOptions)
            ] : []),
            ...(!isNested ? [Floater.size({
                ...sizeOptions,
                apply({ availableHeight, elements }) {
                    setMaxHeight(availableHeight);
                    elements.floating.style.maxHeight = `${availableHeight}px`;
                },
            })] : []),
        ],
        whileElementsMounted: Floater.autoUpdate
    });

    const listNavigation = Floater.useListNavigation(floatingContext, {
        listRef: elementsRef,
        activeIndex,
        nested: isNested,
        rtl: isRtl,
        loop,
        onNavigate: setActiveIndex
    });
    const click = Floater.useClick(floatingContext, {});
    const hover = Floater.useHover(floatingContext, {
        enabled: isNested || openOnHover,
        delay: isNested ? { open: 75 } : { open: hoverOpenDelay, close: hoverCloseDelay },
        // Lets the pointer travel from the trigger into the menu without it closing.
        handleClose: Floater.safePolygon({ blockPointerEvents: isNested })
    });
    // Submenus let Escape bubble so the whole menu closes; the top-level menu
    // does not, so Escape inside a menu never also closes a host Dialog/Popover.
    const dismiss = Floater.useDismiss(floatingContext, {
        bubbles: isNested
    });
    const typeahead = Floater.useTypeahead(floatingContext, {
        listRef: labelsRef,
        onMatch: isOpen ? setActiveIndex : undefined,
        activeIndex
    });

    // Wires aria-haspopup/aria-expanded/aria-controls on the trigger (role="menuitem"
    // for nested sub triggers) and role="menu" + aria-labelledby on the content.
    const role = Floater.useRole(floatingContext, { role: 'menu' });

    const { getReferenceProps, getFloatingProps, getItemProps } = Floater.useInteractions([
        dismiss,
        click,
        listNavigation,
        hover,
        typeahead,
        role
    ]);

    const parentMenuContext = useContext(MenuPrimitiveRootContext);
    const getRootTrigger = React.useCallback((): Element | null => {
        if (isNested && parentMenuContext) return parentMenuContext.getRootTrigger();
        return refs.domReference.current;
    }, [isNested, parentMenuContext, refs.domReference]);

    const transition = useTransitionStatus(isOpen, () => refs.floating.current, onOpenChangeComplete);

    const values = {
        transitionMounted: transition.mounted,
        transitionStatus: transition.status,
        isOpen,
        setIsOpen,
        refs,
        floatingStyles,
        maxHeight,
        getReferenceProps,
        getFloatingProps,
        getItemProps,
        activeIndex,
        setActiveIndex,
        listRef,
        elementsRef,
        labelsRef,
        virtualItemRef,
        nodeId,
        isNested,
        floatingContext,
        rtl: isRtl,
        dir: direction,
        getRootTrigger,
        modal: modal && !isNested
    };
    // A handle lets detached triggers open this menu and anchor it.
    const subscribeHandle = React.useCallback((listener: () => void) => handle?.subscribe(listener) ?? (() => {}), [handle]);
    const handleState = React.useSyncExternalStore(subscribeHandle, () => handle?.getState(), () => handle?.getState());
    const handleOpen = handleState?.open;
    const handleTrigger = handleState?.trigger ?? null;
    useIsomorphicLayoutEffect(() => {
        if (!handle) return;
        if (handleTrigger) refs.setReference(handleTrigger);
        if (handleOpen !== undefined && handleOpen !== isOpenRef.current) setIsOpen(handleOpen);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handle, handleOpen, handleTrigger]);

    const tree = Floater.useFloatingTree();

    React.useEffect(() => {
        if (!tree) return;

        function handleTreeClick() {
            setIsOpen(false, 'item-press');
            handle?.close();
        }

        tree.events.on('click', handleTreeClick);

        return () => {
            tree.events.off('click', handleTreeClick);
        };
    }, [tree, nodeId, parentId]);

    return (

        <div ref={ref} className={className} data-tree="true" dir={direction} {...props}>

            <MenuPrimitiveRootContext.Provider value={values} >
                <Floater.FloatingNode id={nodeId}>
                    {typeof children === 'function' ? children({ payload: handleState?.payload }) : children}
                </Floater.FloatingNode>
            </MenuPrimitiveRootContext.Provider>

        </div>
    );
});

MenuComponentRoot.displayName = 'MenuComponentRoot';

const MenuPrimitiveRoot = forwardRef<MenuPrimitiveRootElement, MenuPrimitiveRootProps>(({ children, className, open, onOpenChange, defaultOpen = false, crossAxisOffset, mainAxisOffset, collisionBoundary, collisionPadding, ...props }, ref) => {
    // Join an existing floating tree (e.g. when rendered inside a Dialog or
    // Popover) so the host knows the menu is its child: Escape and outside
    // presses inside the menu then only close the menu, not the host.
    const floatingTree = Floater.useFloatingTree();
    const menu = (
        <MenuComponentRoot ref={ref} className={className} open={open} onOpenChange={onOpenChange} defaultOpen={defaultOpen} crossAxisOffset={crossAxisOffset} mainAxisOffset={mainAxisOffset} collisionBoundary={collisionBoundary} collisionPadding={collisionPadding} {...props}>
            {children}
        </MenuComponentRoot>
    );

    if (floatingTree) {
        return menu;
    }

    return (
        <Floater.FloatingTree>
            {menu}
        </Floater.FloatingTree>
    );
});

MenuPrimitiveRoot.displayName = 'MenuPrimitiveRoot';
export default MenuPrimitiveRoot;
