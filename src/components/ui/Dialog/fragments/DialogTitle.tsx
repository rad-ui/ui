'use client';
import React, { forwardRef, useContext, useEffect } from 'react';
import { DialogContext } from '../context/DialogContext';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';
import Floater from '~/core/primitives/Floater';

type DialogTitleElement = React.ElementRef<typeof Primitive.h2>;
type PrimitiveHeadingProps = React.ComponentPropsWithoutRef<typeof Primitive.h2>;

export type DialogTitleProps = PrimitiveHeadingProps & {
    className?: string;
};

const DialogTitle = forwardRef<DialogTitleElement, DialogTitleProps>(({ children, className = '', id, ...props }, ref) => {
    const { rootClass, setTitleId } = useContext(DialogContext);
    const generatedId = Floater.useId();
    const resolvedId = id ?? generatedId;

    // Register this element's id so Dialog.Content can reference it via aria-labelledby.
    useEffect(() => {
        setTitleId(resolvedId);
        return () => setTitleId(undefined);
    }, [resolvedId, setTitleId]);

    return (
        <Primitive.h2 ref={ref} id={resolvedId} className={clsx(rootClass && `${rootClass}-title`, className)} {...props}>
            {children}
        </Primitive.h2>
    );
});

DialogTitle.displayName = 'DialogTitle';

export default DialogTitle;
