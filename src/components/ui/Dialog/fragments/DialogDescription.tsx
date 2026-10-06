'use client';

import React, { forwardRef, useContext, useEffect } from 'react';
import { DialogContext } from '../context/DialogContext';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';
import Floater from '~/core/primitives/Floater';

type DialogDescriptionElement = React.ElementRef<typeof Primitive.p>;
type PrimitiveParagraphProps = React.ComponentPropsWithoutRef<typeof Primitive.p>;

export type DialogDescriptionProps = PrimitiveParagraphProps & { className?: string };

const DialogDescription = forwardRef<DialogDescriptionElement, DialogDescriptionProps>(({ children, className = '', id, ...props }, ref) => {
    const { rootClass, setDescriptionId } = useContext(DialogContext);
    const generatedId = Floater.useId();
    const resolvedId = id ?? generatedId;

    // Register this element's id so Dialog.Content can reference it via aria-describedby.
    useEffect(() => {
        setDescriptionId(resolvedId);
        return () => setDescriptionId(undefined);
    }, [resolvedId, setDescriptionId]);

    return (
        <Primitive.p ref={ref} id={resolvedId} className={clsx(rootClass && `${rootClass}-description`, className)} {...props}>
            {children}
        </Primitive.p>
    );
});

DialogDescription.displayName = 'DialogDescription';

export default DialogDescription;
