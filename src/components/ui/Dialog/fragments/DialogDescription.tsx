'use client';

import React, { forwardRef, useContext } from 'react';
import { DialogContext } from '../context/DialogContext';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';

type DialogDescriptionElement = React.ElementRef<typeof Primitive.p>;
type PrimitiveParagraphProps = React.ComponentPropsWithoutRef<typeof Primitive.p>;

export type DialogDescriptionProps = PrimitiveParagraphProps & { className?: string };

const DialogDescription = forwardRef<DialogDescriptionElement, DialogDescriptionProps>(({ children, className = '', ...props }, ref) => {
    const { rootClass } = useContext(DialogContext);
    return (
        <Primitive.p ref={ref} className={clsx(`${rootClass}-description`, className)} {...props}>
            {children}
        </Primitive.p>
    );
});

DialogDescription.displayName = 'DialogDescription';

export default DialogDescription;
