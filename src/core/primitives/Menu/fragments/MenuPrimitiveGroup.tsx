import React, { forwardRef } from 'react';
import Primitive from '~/core/primitives/Primitive';
import { MenuGroupContext } from '../contexts/MenuItemStateContexts';

export type MenuPrimitiveGroupProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;

/** Groups related items; a GroupLabel inside names the group for screen readers. */
const MenuPrimitiveGroup = forwardRef<HTMLDivElement, MenuPrimitiveGroupProps>(({ children, ...props }, ref) => {
    const labelId = React.useId();
    const [hasLabel, setHasLabel] = React.useState(false);
    const contextValue = React.useMemo(() => ({ labelId, setHasLabel }), [labelId]);
    return (
        <MenuGroupContext.Provider value={contextValue}>
            <Primitive.div ref={ref} role="group" aria-labelledby={hasLabel ? labelId : undefined} {...props}>
                {children}
            </Primitive.div>
        </MenuGroupContext.Provider>
    );
});

MenuPrimitiveGroup.displayName = 'MenuPrimitiveGroup';

export default MenuPrimitiveGroup;
