import React from 'react';
import { customClassSwitcher } from '~/core';
import clsx from 'clsx';

const COMPONENT_NAME = 'TextArea';

export type TextAreaRootProps = React.ComponentPropsWithoutRef<'div'> & {
    customRootClass?: string;
};

const TextAreaRoot = React.forwardRef<React.ElementRef<'div'>, TextAreaRootProps>(
    ({ children, customRootClass = '', className = '', ...props }, ref) => {
        const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

        return (
            <div ref={ref} className={clsx(rootClass, className)} {...props}>
                {children}
            </div>
        );
    }
);

TextAreaRoot.displayName = COMPONENT_NAME;

export default TextAreaRoot;
