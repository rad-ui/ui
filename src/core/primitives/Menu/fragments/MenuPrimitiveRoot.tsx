import React, { useState, useRef } from 'react'
import MenuPrimitiveRootContext from '../contexts/MenuPrimitiveRootContext';
import Floater from '~/core/primitives/Floater';

const MenuPrimitiveRoot = ({ children, className }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const listRef = useRef([]);
    const elementsRef = useRef([]);
    const labelsRef = useRef([]);
    const virtualItemRef = useRef(null);


    const nodeId = Floater.useFloatingNodeId();
     const parentId = Floater.useFloatingParentNodeId();
    const isNested = parentId != null;
    const { refs, floatingStyles, context } = Floater.useFloating({
        open: isOpen,
        nodeId,
        onOpenChange: setIsOpen,
        placement: isNested ? "right-start" : "bottom-start",
    });

    const listNavigation = Floater.useListNavigation(context, {
        listRef: elementsRef,
        activeIndex,
        virtualItemRef,
        nested: isNested,
        onNavigate: setActiveIndex,
    });
    const click = Floater.useClick(context)
    const dismiss = Floater.useDismiss(context, {
        bubbles: true,
    });

    const { getReferenceProps, getFloatingProps, getItemProps } = Floater.useInteractions([
        dismiss,
        click,
        listNavigation
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
        nodeId
    };


    return (
        <div >
            <Floater.FloatingTree>
            <MenuPrimitiveRootContext.Provider value={values} >
                <Floater.FloatingNode id={nodeId}>
                {children}
                </Floater.FloatingNode>
            </MenuPrimitiveRootContext.Provider>
            </Floater.FloatingTree>
        </div>
    )
}
export default MenuPrimitiveRoot