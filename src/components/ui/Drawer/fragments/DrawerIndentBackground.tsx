'use client';

import React, { forwardRef } from 'react';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';
import DrawerProviderContext from '../context/DrawerProviderContext';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';

export type DrawerIndentBackgroundProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;

/** A layer behind `Drawer.Indent` (render it first). Gets `data-active` while any drawer is open, for the backdrop the page shrinks against. */
const DrawerIndentBackground = forwardRef<HTMLDivElement, DrawerIndentBackgroundProps>(({ className, ...props }, ref) => {
    const provider = React.useContext(DrawerProviderContext);
    const rootClass = useComponentClass('', 'Drawer');
    const active = Boolean(provider?.active);
    return (
        <Primitive.div
            ref={ref}
            className={clsx(rootClass && `${rootClass}-indent-background`, className) || undefined}
            data-active={active ? '' : undefined}
            data-slot="drawer-indent-background"
            {...props}
        />
    );
});

DrawerIndentBackground.displayName = 'DrawerIndentBackground';

export default DrawerIndentBackground;
