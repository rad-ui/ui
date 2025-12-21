import React from 'react';

export type ComboboxPrimitiveGroupProps = {
    children: React.ReactNode,
    className?: string,
}

const ComboboxPrimitiveGroup = React.forwardRef<
    React.ElementRef<'div'>,
    ComboboxPrimitiveGroupProps & React.ComponentPropsWithoutRef<'div'>
>(({ children, className, ...props }, forwardedRef) => {
    return (
        <div className={className} ref={forwardedRef} {...props}>
            {children}
        </div>
    );
});

ComboboxPrimitiveGroup.displayName = 'ComboboxPrimitiveGroup';

export default ComboboxPrimitiveGroup;
