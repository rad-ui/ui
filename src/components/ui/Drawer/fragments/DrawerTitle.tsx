'use client';
import React, { forwardRef, useContext, useEffect } from 'react';
import clsx from 'clsx';
import { DrawerContext } from '../context/DrawerContext';
import Primitive from '~/core/primitives/Primitive';
import Floater from '~/core/primitives/Floater';

type DrawerTitleElement = React.ElementRef<typeof Primitive.h2>;
type PrimitiveHeadingProps = React.ComponentPropsWithoutRef<typeof Primitive.h2>;

export type DrawerTitleProps = PrimitiveHeadingProps & {
    className?: string;
    id?: string;
};

const DrawerTitle = forwardRef<DrawerTitleElement, DrawerTitleProps>(({
    children,
    className = '',
    id,
    ...props
}, ref) => {
    const { rootClass, setTitleId } = useContext(DrawerContext);
    const generatedId = Floater.useId();
    const titleIdLocal = (props as any).id ?? id ?? generatedId;

    useEffect(() => {
        setTitleId(titleIdLocal);
        return () => setTitleId(undefined);
    }, [setTitleId, titleIdLocal]);

    return (
        <Primitive.h2
            ref={ref}
            id={titleIdLocal}
            className={clsx(rootClass && `${rootClass}-title`, className)}
            {...props}
        >
            {children}
        </Primitive.h2>
    );
});

DrawerTitle.displayName = 'DrawerTitle';

export default DrawerTitle;
