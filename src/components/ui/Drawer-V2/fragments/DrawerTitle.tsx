'use client';
import React, { forwardRef, useContext } from 'react';
import clsx from 'clsx';
import { DrawerContext } from '../context/DrawerContext';
import Primitive from '~/core/primitives/Primitive';

type DrawerTitleElement = React.ElementRef<typeof Primitive.h2>;
type PrimitiveHeadingProps = React.ComponentPropsWithoutRef<typeof Primitive.h2>;

export type DrawerTitleProps = PrimitiveHeadingProps & {
    className?: string;
};

const DrawerTitle = forwardRef<DrawerTitleElement, DrawerTitleProps>(({
    children,
    className = '',
    ...props
}, ref) => {
    const { rootClass } = useContext(DrawerContext);

    return (
        <Primitive.h2
            ref={ref}
            className={clsx(rootClass && `${rootClass}-title`, className)}
            {...props}
        >
            {children}
        </Primitive.h2>
    );
});

DrawerTitle.displayName = 'DrawerTitle';

export default DrawerTitle;
