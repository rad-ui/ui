'use client';

import React, { forwardRef } from 'react';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';
import DrawerProviderContext from '../context/DrawerProviderContext';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';

export type DrawerIndentProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;

/** Wraps the app's main UI. Gets `data-active` while any drawer in the nearest `Drawer.Provider` is open, so CSS can scale or dim it. */
const DrawerIndent = forwardRef<HTMLDivElement, DrawerIndentProps>(({ className, ...props }, ref) => {
    const provider = React.useContext(DrawerProviderContext);
    const rootClass = useComponentClass('', 'Drawer');
    const active = Boolean(provider?.active);
    return (
        <Primitive.div
            ref={ref}
            className={clsx(rootClass && `${rootClass}-indent`, className) || undefined}
            data-active={active ? '' : undefined}
            data-slot="drawer-indent"
            {...props}
        />
    );
});

DrawerIndent.displayName = 'DrawerIndent';

export default DrawerIndent;
