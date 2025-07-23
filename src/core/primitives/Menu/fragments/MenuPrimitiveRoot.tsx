import React, { useState, useRef } from 'react'
import MenuPrimitiveRootContext from '../contexts/MenuPrimitiveRootContext';
import Floater from '~/core/primitives/Floater';

const MenuPrimitiveRoot = ({ children, className }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
    const listRef = useRef([]);
    const elementsRef = useRef([]);
    const labelsRef = useRef([]);

      const {refs, floatingStyles, context} = Floater.useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
        placement: 'bottom-start',
      });

      const listNavigation = Floater.useListNavigation(context, {
    listRef: elementsRef,
    activeIndex,
    onNavigate: setActiveIndex,
  });
     const click = Floater.useClick(context)
      const dismiss = Floater.useDismiss(context);

      const {getReferenceProps, getFloatingProps, getItemProps} = Floater.useInteractions([
    dismiss,
    click,
    listNavigation
  ]);


    const values = { isOpen, setIsOpen, refs, floatingStyles, getReferenceProps, getFloatingProps, getItemProps, activeIndex, setActiveIndex, listRef, elementsRef, labelsRef };
    return (
        <div>
            <MenuPrimitiveRootContext.Provider value={values} >
                {children}
            </MenuPrimitiveRootContext.Provider>
        </div>
    )
}
export default MenuPrimitiveRoot