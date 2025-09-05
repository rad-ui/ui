import React, { useState, useRef } from 'react';
import MenuPrimitiveRootContext from '../contexts/MenuPrimitiveRootContext';
import Floater from '~/core/primitives/Floater';
import { useControllableState } from '~/core/hooks/useControllableState';

export type MenuPrimitiveRootProps = {
    children: React.ReactNode
    className?: string
    open?: boolean
    onOpenChange?: (open: boolean) => void
    defaultOpen?: boolean
    crossAxisOffset?: number
    mainAxisOffset?: number
}

export const MenuComponentRoot = React.forwardRef<HTMLDivElement, MenuPrimitiveRootProps>(({ children, className, open, onOpenChange, defaultOpen = false, crossAxisOffset = 0, mainAxisOffset = 0, ...props }, forwardedRef) => {
    const [isOpen, setIsOpen] = useControllableState(
        open,
        defaultOpen,
        onOpenChange
    );

    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const listRef = useRef([]);
    const elementsRef = useRef([]);
    const labelsRef = useRef([]);
    const virtualItemRef = useRef(null);

    const nodeId = Floater.useFloatingNodeId();
    const parentId = Floater.useFloatingParentNodeId();
    const isNested = parentId != null;

    const { refs, floatingStyles, context: floatingContext } = Floater.useFloating({
        open: isOpen,
        nodeId,
        onOpenChange: setIsOpen,
        placement: isNested ? 'right-start' : 'bottom-start',
        middleware: [
            Floater.flip({
                mainAxis: true
            }),
            Floater.offset({
                mainAxis: mainAxisOffset,
                crossAxis: crossAxisOffset
            })
        ],
        whileElementsMounted: Floater.autoUpdate
    });

    const listNavigation = Floater.useListNavigation(floatingContext, {
        listRef: elementsRef,
        activeIndex,
        nested: isNested,
        onNavigate: setActiveIndex
    });
    const click = Floater.useClick(floatingContext, {});
    const hover = Floater.useHover(floatingContext, {
        enabled: isNested,
        delay: { open: 75 },
        handleClose: Floater.safePolygon({ blockPointerEvents: true })
    });
    const dismiss = Floater.useDismiss(floatingContext, {
        bubbles: true
    });
    const typeahead = Floater.useTypeahead(floatingContext, {
        listRef: labelsRef,
        onMatch: isOpen ? setActiveIndex : undefined,
        activeIndex
    });

    const { getReferenceProps, getFloatingProps, getItemProps } = Floater.useInteractions([
        dismiss,
        click,
        listNavigation,
        hover,
        typeahead
    ]);

    const values = {
        isOpen,
        setIsOpen,
        refs,
        floatingStyles,
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
        floatingContext
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

        <div ref={forwardedRef} className={className} data-tree="true" {...props}>

            <MenuPrimitiveRootContext.Provider value={values} >
                <Floater.FloatingNode id={nodeId}>
                    {children}
                </Floater.FloatingNode>
            </MenuPrimitiveRootContext.Provider>

        </div>
    );
});

MenuComponentRoot.displayName = 'MenuComponentRoot';

const MenuPrimitiveRoot = React.forwardRef<HTMLDivElement, MenuPrimitiveRootProps>(({ children, className, open, onOpenChange, defaultOpen = false, crossAxisOffset, mainAxisOffset, ...props }, forwardedRef) => {
    return (
        <Floater.FloatingTree>
            <MenuComponentRoot ref={forwardedRef} className={className} open={open} onOpenChange={onOpenChange} defaultOpen={defaultOpen} crossAxisOffset={crossAxisOffset} mainAxisOffset={mainAxisOffset} {...props}>
                {children}
            </MenuComponentRoot>
        </Floater.FloatingTree>
    );
});

MenuPrimitiveRoot.displayName = 'MenuPrimitiveRoot';
export default MenuPrimitiveRoot;
