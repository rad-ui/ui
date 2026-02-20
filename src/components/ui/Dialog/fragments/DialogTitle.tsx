'use client';
import React, { forwardRef, useContext } from 'react';
import { DialogContext } from '../context/DialogContext';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';

type DialogTitleElement = React.ElementRef<typeof Primitive.h2>;
type PrimitiveHeadingProps = React.ComponentPropsWithoutRef<typeof Primitive.h2>;

export type DialogTitleProps = PrimitiveHeadingProps & {
    className?: string;
};

const DialogTitle = forwardRef<DialogTitleElement, DialogTitleProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass } = useContext(DialogContext);
    return (
        <Primitive.h2 ref={ref} className={clsx(`${rootClass}-title`, className)} {...props}>
            {children}
        </Primitive.h2>
    );
});

DialogTitle.displayName = 'DialogTitle';

export default DialogTitle;
