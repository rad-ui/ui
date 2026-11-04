import React, { forwardRef } from 'react';
import Primitive from '~/core/primitives/Primitive';
import useLayoutEffect from '~/core/hooks/useLayoutEffect';
import { MenuGroupContext } from '../contexts/MenuItemStateContexts';

export type MenuPrimitiveGroupLabelProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;

/** A heading for a menu Group. It isn't focusable or selectable. */
const MenuPrimitiveGroupLabel = forwardRef<HTMLDivElement, MenuPrimitiveGroupLabelProps>(({ id, ...props }, ref) => {
    const group = React.useContext(MenuGroupContext);
    const setHasLabel = group?.setHasLabel;
    useLayoutEffect(() => {
        if (!setHasLabel) return;
        setHasLabel(true);
        return () => setHasLabel(false);
    }, [setHasLabel]);
    return <Primitive.div ref={ref} id={id ?? group?.labelId} role="presentation" {...props} />;
});

MenuPrimitiveGroupLabel.displayName = 'MenuPrimitiveGroupLabel';

export default MenuPrimitiveGroupLabel;
