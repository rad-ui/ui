import React from 'react';
import { customClassSwitcher } from '~/core';
import clsx from 'clsx';
import { useCreateDataAttribute, useComposeAttributes, useCreateDataAccentColorAttribute } from '~/core/hooks/createDataAttribute';

const COMPONENT_NAME = 'TextArea';

export type TextAreaRootProps = React.ComponentPropsWithoutRef<'div'> & {
    customRootClass?: string;
    detach?: boolean;
    variant?: string;
    size?: string;
    resize?: 'none' | 'vertical' | 'horizontal' | 'both';
    color?: string;
    radius?: string;
};

const TextAreaRoot = React.forwardRef<React.ElementRef<'div'>, TextAreaRootProps>(
    ({ children, customRootClass = '', detach = false, className = '', variant = '', size = '', resize = 'both', color = '', radius = '', ...props }, ref) => {
        const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME, detach);
        const dataAttributes = useCreateDataAttribute('textarea', { variant, size, resize, radius });
        const accentAttributes = useCreateDataAccentColorAttribute(color);
        const composedAttributes = useComposeAttributes(dataAttributes(), accentAttributes());

        return (
            <div ref={ref} className={clsx(rootClass, className)} {...props} {...composedAttributes()}>
                {children}
            </div>
        );
    }
);

TextAreaRoot.displayName = COMPONENT_NAME;

export default TextAreaRoot;
