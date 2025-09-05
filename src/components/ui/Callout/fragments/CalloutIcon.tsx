import React, { useContext } from 'react';
import CalloutContext from '../contexts/CalloutContext';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';

const COMPONENT_NAME = 'CalloutIcon';

type CalloutIconElement = React.ElementRef<typeof Primitive.span>;
type PrimitiveSpanProps = React.ComponentPropsWithoutRef<typeof Primitive.span>;

type CalloutIconProps = PrimitiveSpanProps;

const CalloutIcon = React.forwardRef<CalloutIconElement, CalloutIconProps>(
    ({ children, className = '', ...props }, ref) => {
        const { rootClass } = useContext(CalloutContext);

        return (
            <Primitive.span
                ref={ref}
                className={clsx(`${rootClass}-icon`, className)}
                {...props}
            >
                {children}
            </Primitive.span>
        );
    }
);

CalloutIcon.displayName = COMPONENT_NAME;

export default CalloutIcon;
