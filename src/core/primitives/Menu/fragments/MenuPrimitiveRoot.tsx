import React, { useState, useRef, useContext, forwardRef, ElementRef, ComponentPropsWithoutRef } from 'react';
import MenuPrimitiveRootContext from '../contexts/MenuPrimitiveRootContext';
import Floater from '~/core/primitives/Floater';
import { useControllableState } from '~/core/hooks/useControllableState';
import { useRegisterDocumentOverlayOpen } from '~/core/hooks/useRegisterDocumentOverlayOpen';

export type MenuPrimitiveRootElement = ElementRef<'div'>;
export type MenuPrimitiveRootProps = {
    children: React.ReactNode
    className?: string
    open?: boolean
    onOpenChange?: (open: boolean) => void
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
  rtl?: boolean
} & ComponentPropsWithoutRef<'div'>;

type MenuComponentRootProps = MenuPrimitiveRootProps & {
    /** Internal: set by MenuPrimitive.Sub so the menu behaves as a submenu. */
    isSubmenu?: boolean
};

export const MenuComponentRoot = forwardRef<MenuPrimitiveRootElement, MenuComponentRootProps>(({ children, className, open, onOpenChange, defaultOpen = false, crossAxisOffset, mainAxisOffset, collisionBoundary = null, collisionPadding = 4, loop = true, placement = 'bottom-start', avoidCollision = true, rtl = false, isSubmenu = false, ...props }, ref) => {
    const [isOpen, setIsOpen] = useControllableState(
        open,
        defaultOpen,
        onOpenChange
    );
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
        onOpenChange: setIsOpen,
        strategy: 'fixed',
        transform: false,
        placement: isNested ? 'right-start' : placement,
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
        rtl,
        loop,
        onNavigate: setActiveIndex
    });
    const click = Floater.useClick(floatingContext, {});
    const hover = Floater.useHover(floatingContext, {
        enabled: isNested,
        delay: { open: 75 },
        handleClose: Floater.safePolygon({ blockPointerEvents: true })
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

    const values = {
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
        rtl,
        getRootTrigger
    };
    const tree = Floater.useFloatingTree();

    React.useEffect(() => {
        if (!tree) return;

        function handleTreeClick() {
            setIsOpen(false);
        }

        tree.events.on('click', handleTreeClick);

        return () => {
            tree.events.off('click', handleTreeClick);
        };
    }, [tree, nodeId, parentId]);

    return (

        <div ref={ref} className={className} data-tree="true" {...props}>

            <MenuPrimitiveRootContext.Provider value={values} >
                <Floater.FloatingNode id={nodeId}>
                    {children}
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
