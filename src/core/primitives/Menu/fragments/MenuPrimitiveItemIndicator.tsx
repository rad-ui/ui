import React, { forwardRef } from 'react';
import Primitive from '~/core/primitives/Primitive';
import { MenuItemIndicatorContext } from '../contexts/MenuItemStateContexts';
import { stateData } from '~/core/utils/stateAttributes';

export type MenuPrimitiveItemIndicatorProps = React.ComponentPropsWithoutRef<typeof Primitive.span> & {
    /** Keep it rendered while unchecked, for animations or reserved space. */
    forceMount?: boolean;
};

/** Shows its children, such as a check icon, while the closest checkbox or radio item is checked. */
const MenuPrimitiveItemIndicator = forwardRef<HTMLSpanElement, MenuPrimitiveItemIndicatorProps>(
    ({ forceMount = false, children, ...props }, ref) => {
        const context = React.useContext(MenuItemIndicatorContext);
        const checked = Boolean(context?.checked);
        if (!checked && !forceMount) return null;
        return (
            <Primitive.span ref={ref} aria-hidden="true" {...stateData(checked ? 'checked' : 'unchecked')} {...props}>
                {children}
            </Primitive.span>
        );
    }
);

MenuPrimitiveItemIndicator.displayName = 'MenuPrimitiveItemIndicator';

export default MenuPrimitiveItemIndicator;
