import React from 'react';
import { customClassSwitcher } from '~/core';
import clsx from 'clsx';
import { useCreateDataAttribute } from '~/core/hooks/createDataAttribute';

const COMPONENT_NAME = 'TextArea';

export type TextAreaRootProps = React.ComponentPropsWithoutRef<'div'> & {
    customRootClass?: string;
    variant?: string;
    size?: string;
    resize?: 'none' | 'vertical' | 'horizontal' | 'both';
};

const TextAreaRoot = React.forwardRef<React.ElementRef<'div'>, TextAreaRootProps>(
    ({ children, customRootClass = '', className = '', variant = '', size = '', resize = 'both', ...props }, ref) => {
        const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
        const dataAttributes = useCreateDataAttribute('textarea', { variant, size, resize });

        return (
            <div ref={ref} className={clsx(rootClass, className)} {...props} {...dataAttributes()}>
                {children}
            </div>
        );
    }
);

TextAreaRoot.displayName = COMPONENT_NAME;

export default TextAreaRoot;
