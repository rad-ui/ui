'use client';
import React, { forwardRef, useContext, useEffect } from 'react';
import clsx from 'clsx';
import { DrawerContext } from '../context/DrawerContext';
import Primitive from '~/core/primitives/Primitive';
import Floater from '~/core/primitives/Floater';

type DrawerDescriptionElement = React.ElementRef<typeof Primitive.p>;
type PrimitiveParagraphProps = React.ComponentPropsWithoutRef<typeof Primitive.p>;

export type DrawerDescriptionProps = PrimitiveParagraphProps & {
    className?: string;
    id?: string;
};

const DrawerDescription = forwardRef<DrawerDescriptionElement, DrawerDescriptionProps>(({
    children,
    className = '',
    id,
    ...props
}, ref) => {
    const { rootClass, setDescriptionId } = useContext(DrawerContext);
    const generatedId = Floater.useId();
    const descId = (props as any).id ?? id ?? generatedId;

    useEffect(() => {
        setDescriptionId(descId);
        return () => setDescriptionId(undefined);
    }, [setDescriptionId, descId]);

    return (
        <Primitive.p
            ref={ref}
            id={descId}
            className={clsx(rootClass && `${rootClass}-description`, className)}
            {...props}
        >
            {children}
        </Primitive.p>
    );
});

DrawerDescription.displayName = 'DrawerDescription';

export default DrawerDescription;
