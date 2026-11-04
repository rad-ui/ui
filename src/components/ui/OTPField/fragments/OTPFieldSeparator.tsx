'use client';

import React, { forwardRef, ElementRef, ComponentPropsWithoutRef, useContext } from 'react';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';
import OTPFieldContext from '../contexts/OTPFieldContext';

export type OTPFieldSeparatorElement = ElementRef<typeof Primitive.div>;
export type OTPFieldSeparatorProps = ComponentPropsWithoutRef<typeof Primitive.div> & {
    orientation?: 'horizontal' | 'vertical';
};

/** A visual break between groups of slots, such as the dash in "123-456". Not announced as a slot. */
const OTPFieldSeparator = forwardRef<OTPFieldSeparatorElement, OTPFieldSeparatorProps>(({ className, orientation = 'vertical', ...props }, ref) => {
    const context = useContext(OTPFieldContext);
    return (
        <Primitive.div
            ref={ref}
            role="separator"
            aria-orientation={orientation}
            className={clsx(context?.rootClass ? `${context.rootClass}-separator` : undefined, className) || undefined}
            data-orientation={orientation}
            data-slot="otp-field-separator"
            {...props}
        />
    );
});

OTPFieldSeparator.displayName = 'OTPFieldSeparator';

export default OTPFieldSeparator;
