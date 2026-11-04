'use client';

import React, { forwardRef, useContext } from 'react';
import Floater from '~/core/primitives/Floater';
import MenuPrimitiveRootContext from '../contexts/MenuPrimitiveRootContext';

export type MenuPrimitiveArrowProps = Omit<React.ComponentPropsWithoutRef<typeof Floater.Arrow>, 'context'>;

/** An arrow pointing from the menu to its trigger. Render it inside the menu's Content. */
const MenuPrimitiveArrow = forwardRef<SVGSVGElement, MenuPrimitiveArrowProps>(({ width = 10, height = 5, ...props }, ref) => {
    const context = useContext(MenuPrimitiveRootContext);
    const setArrowNode = context?.setArrowNode;
    const mergedRef = Floater.useMergeRefs([ref, setArrowNode ?? null]);
    if (!context) return null;
    return (
        <Floater.Arrow
            ref={mergedRef}
            context={context.floatingContext}
            width={width}
            height={height}
            data-slot="menu-arrow"
            {...props}
        />
    );
});

MenuPrimitiveArrow.displayName = 'MenuPrimitiveArrow';

export default MenuPrimitiveArrow;
