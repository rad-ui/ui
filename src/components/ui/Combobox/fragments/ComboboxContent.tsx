'use client';
import React, { useContext } from 'react';
import ComboboxPrimitive from '~/core/primitives/Combobox/ComboboxPrimitive';
import { ComboboxRootContext } from '../contexts/ComboboxRootContext';

type ComboboxContentElement = React.ElementRef<typeof ComboboxPrimitive.Content>;
type ComboboxContentProps = React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Content> & {
    customRootClass?: string;
};

const ComboboxContent = React.forwardRef<ComboboxContentElement, ComboboxContentProps>(({ customRootClass, children, position = 'popper', ...props }, forwardedRef) => {
    const { rootClass } = useContext(ComboboxRootContext);

    return (
        <ComboboxPrimitive.Content
            className={`${rootClass}-content`}
            position={position}
            data-position={position}
            ref={forwardedRef}
            {...props}
        >
            {children}
        </ComboboxPrimitive.Content>
    );
});

ComboboxContent.displayName = 'ComboboxContent';

export default ComboboxContent;
