import React from 'react';
import clsx from 'clsx';
import { useComponentClass } from '~/components/ui/Theme/useComponentClass';
import TextFieldContext from '../contexts/TextFieldContext';

const COMPONENT_NAME = 'TextField';

export type TextFieldRootProps = React.ComponentPropsWithoutRef<'div'> & {
    className?: string;
    customRootClass?: string;
};

const TextFieldRoot = React.forwardRef<HTMLDivElement, TextFieldRootProps>(({ className = '', customRootClass = '', children, ...props }, ref) => {
    const rootClass = useComponentClass(customRootClass, COMPONENT_NAME);
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const [hasValue, setHasValue] = React.useState(false);

    const clearInput = React.useCallback(() => {
        const input = inputRef.current;

        if (!input) {
            return;
        }

        const valueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
        valueSetter?.call(input, '');
        input.dispatchEvent(new Event('input', { bubbles: true }));
        setHasValue(false);
        input.focus();
    }, []);

    return (
        <TextFieldContext.Provider value={{ rootClass, inputRef, clearInput, hasValue, setHasValue }}>
            <div ref={ref} className={clsx(rootClass, className)} {...props}>
                {children}
            </div>
        </TextFieldContext.Provider>
    );
});

TextFieldRoot.displayName = COMPONENT_NAME;

export default TextFieldRoot;
