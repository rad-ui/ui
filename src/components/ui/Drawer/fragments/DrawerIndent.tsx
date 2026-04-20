'use client';

import React, { forwardRef, useContext } from 'react';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import DrawerProviderContext from '../context/DrawerProviderContext';

type DrawerIndentElement = React.ElementRef<typeof Primitive.div>;
type PrimitiveDivProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;

export type DrawerIndentProps = PrimitiveDivProps & {
    className?: string;
    customRootClass?: string;
};

const DrawerIndent = forwardRef<DrawerIndentElement, DrawerIndentProps>(({
    children,
    className = '',
    customRootClass = '',
    ...props
}, ref) => {
    const rootClass = useComponentClass(customRootClass, 'Drawer');
    const { active } = useContext(DrawerProviderContext);

    return (
        <Primitive.div
            ref={ref}
            className={clsx(rootClass && `${rootClass}-indent`, className)}
            data-active={active ? '' : undefined}
            {...props}
        >
            {children}
        </Primitive.div>
    );
});

DrawerIndent.displayName = 'DrawerIndent';

export default DrawerIndent;
