'use client';
import React, { forwardRef, useContext } from 'react';
import clsx from 'clsx';
import { DrawerContext } from '../context/DrawerContext';
import Primitive from '~/core/primitives/Primitive';

type DrawerDescriptionElement = React.ElementRef<typeof Primitive.p>;
type PrimitiveParagraphProps = React.ComponentPropsWithoutRef<typeof Primitive.p>;

export type DrawerDescriptionProps = PrimitiveParagraphProps & {
    className?: string;
};

const DrawerDescription = forwardRef<DrawerDescriptionElement, DrawerDescriptionProps>(({
    children,
    className = '',
    ...props
}, ref) => {
    const { rootClass } = useContext(DrawerContext);

    return (
        <Primitive.p
            ref={ref}
            className={clsx(rootClass && `${rootClass}-description`, className)}
            {...props}
        >
            {children}
        </Primitive.p>
    );
});

DrawerDescription.displayName = 'DrawerDescription';

export default DrawerDescription;
