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
}
const MenuPrimitiveRoot = ({ children, className, open, onOpenChange, defaultOpen = false }: MenuPrimitiveRootProps) => {
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
    const item = Floater.useListItem();
    const tree = Floater.useFloatingTree();

    const { refs, floatingStyles, context: floatingContext } = Floater.useFloating({
        open: isOpen,
        nodeId,
        onOpenChange: setIsOpen,
        placement: isNested ? 'right-start' : 'bottom-start'
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
        floatingContext,
        item
    };

    if (parentId === null) {
    
    
    return (
        <Floater.FloatingTree>
        <div className={className}>
            
                <MenuPrimitiveRootContext.Provider value={values} >
                    <Floater.FloatingNode id={nodeId}>
                        {children}
                    </Floater.FloatingNode>
                </MenuPrimitiveRootContext.Provider>
            
        </div>
        </Floater.FloatingTree>
    );

    }
    return (
        <div className={className}>
            
                <MenuPrimitiveRootContext.Provider value={values} >
                    <Floater.FloatingNode id={nodeId}>
                        {children}
                    </Floater.FloatingNode>
                </MenuPrimitiveRootContext.Provider>
            
        </div>
    )
};
export default MenuPrimitiveRoot;
