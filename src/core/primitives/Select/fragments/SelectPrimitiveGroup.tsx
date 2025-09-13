import React from 'react';

export type SelectPrimitiveGroupProps = {
    children: React.ReactNode,
    className?: string,
}

const SelectPrimitiveGroup = React.forwardRef<
    React.ElementRef<'div'>,
    SelectPrimitiveGroupProps & React.ComponentPropsWithoutRef<'div'>
>(({ children, className, ...props }, forwardedRef) => {
    return (
        <div className={className} ref={forwardedRef} {...props}>
            {children}
        </div>
    );
});

SelectPrimitiveGroup.displayName = 'SelectPrimitiveGroup';

export default SelectPrimitiveGroup;
