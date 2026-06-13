'use client';

import React, { forwardRef } from 'react';
import Primitive from '~/core/primitives/Primitive';

export type DialogPrimitiveFooterProps = React.ComponentPropsWithoutRef<typeof Primitive.div> & {
    asChild?: boolean;
};

const DialogPrimitiveFooter = forwardRef<HTMLDivElement, DialogPrimitiveFooterProps>(({ children, asChild = false, ...props }, ref) => {
    return (
        <Primitive.div ref={ref} asChild={asChild} {...props}>
            {children}
        </Primitive.div>
    );
});

DialogPrimitiveFooter.displayName = 'DialogPrimitiveFooter';

export default DialogPrimitiveFooter;
