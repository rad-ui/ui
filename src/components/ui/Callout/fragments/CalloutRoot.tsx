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
    variant?: string; // Visual variant: 'outline' | 'soft' | 'default'
    intent?: string; // Semantic intent: 'destructive' | 'warning' | 'info' | etc.
    size?: string;
    customRootClass?: string;
};

const CalloutRoot = React.forwardRef<CalloutRootElement, CalloutRootProps>(
    (
        { children, asChild = false, className = '', color = '', variant = '', intent = '', size = '', customRootClass = '', ...props },
        ref
    ) => {
        const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

        // Backward compatibility: if variant is "destructive", treat it as intent
        // This allows existing code to continue working while migrating to intent/variant separation
        const normalizedIntent = intent || (variant === 'destructive' ? 'destructive' : '');
        const normalizedVariant = variant === 'destructive' ? '' : variant;

        const dataAttributes = useCreateDataAttribute('callout', { variant: normalizedVariant, intent: normalizedIntent, size });
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
