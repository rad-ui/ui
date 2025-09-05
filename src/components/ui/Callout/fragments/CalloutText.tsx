import React, { useContext } from 'react';
import CalloutContext from '../contexts/CalloutContext';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';

const COMPONENT_NAME = 'CalloutText';

type CalloutTextElement = React.ElementRef<typeof Primitive.p>;
type PrimitivePProps = React.ComponentPropsWithoutRef<typeof Primitive.p>;

type CalloutTextProps = PrimitivePProps;

const CalloutText = React.forwardRef<CalloutTextElement, CalloutTextProps>(
    ({ children, className = '', ...props }, ref) => {
        const { rootClass } = useContext(CalloutContext);

        return (
            <Primitive.p
                ref={ref}
                className={clsx(`${rootClass}-text`, className)}
                {...props}
            >
                {children}
            </Primitive.p>
        );
    }
);

CalloutText.displayName = COMPONENT_NAME;

export default CalloutText;
