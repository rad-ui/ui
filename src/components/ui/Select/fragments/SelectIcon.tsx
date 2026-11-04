'use client';
import clsx from 'clsx';
import React, { useContext } from 'react';
import { ChevronDown } from 'lucide-react';
import Primitive from '~/core/primitives/Primitive';
import { SelectRootContext } from '../contexts/SelectRootContext';

export type SelectIconProps = React.ComponentPropsWithoutRef<typeof Primitive.span>;

/** A decorative icon inside Select.Trigger; defaults to a chevron. Hidden from screen readers. */
const SelectIcon = React.forwardRef<HTMLSpanElement, SelectIconProps>(({ className, children, ...props }, ref) => {
    const { rootClass } = useContext(SelectRootContext);
    return (
        <Primitive.span
            ref={ref}
            aria-hidden="true"
            className={clsx(rootClass ? `${rootClass}-icon` : undefined, className) || undefined}
            data-slot="select-icon"
            {...props}
        >
            {children ?? <ChevronDown width={16} height={16} />}
        </Primitive.span>
    );
});

SelectIcon.displayName = 'SelectIcon';

export default SelectIcon;
