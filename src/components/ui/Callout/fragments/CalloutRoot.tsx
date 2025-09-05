import React from 'react';
import { customClassSwitcher } from '~/core';
import clsx from 'clsx';
import CalloutContext from '../contexts/CalloutContext';
import Primitive from '~/core/primitives/Primitive';
import { useCreateDataAttribute, useComposeAttributes, useCreateDataAccentColorAttribute } from '~/core/hooks/createDataAttribute';

const COMPONENT_NAME = 'Callout';

type CalloutRootElement = React.ElementRef<typeof Primitive.div>;
type PrimitiveDivProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;

type CalloutRootProps = PrimitiveDivProps & {
    color?: string;
    variant?: string;
    size?: string;
    customRootClass?: string;
};

const CalloutRoot = React.forwardRef<CalloutRootElement, CalloutRootProps>(
    (
        { children, asChild = false, className = '', color = '', variant = '', size = '', customRootClass = '', ...props },
        ref
    ) => {
        const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
        const dataAttributes = useCreateDataAttribute('callout', { variant, size });
        const accentAttributes = useCreateDataAccentColorAttribute(color);
        const composedAttributes = useComposeAttributes(dataAttributes(), accentAttributes());

        return (
            <CalloutContext.Provider value={{ rootClass }}>
                <Primitive.div
                    ref={ref}
                    asChild={asChild}
                    className={clsx(rootClass, className)}
                    {...composedAttributes()}
                    {...props}
                >
                    {children}
                </Primitive.div>
            </CalloutContext.Provider>
        );
    }
);

CalloutRoot.displayName = COMPONENT_NAME;

export default CalloutRoot;
