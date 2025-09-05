import React from 'react';

export type SelectPrimitiveGroupProps = React.ComponentPropsWithoutRef<'div'> & {
    children: React.ReactNode,
    className?: string,
}

const SelectPrimitiveGroup = React.forwardRef<React.ElementRef<'div'>, SelectPrimitiveGroupProps>(
    ({ children, className, ...props }, ref) => (
        <div className={className} ref={ref} {...props}>
            {children}
        </div>
    )
);

SelectPrimitiveGroup.displayName = 'SelectPrimitiveGroup';

export default SelectPrimitiveGroup;
