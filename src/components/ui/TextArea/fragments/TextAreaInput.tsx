import React from 'react';

export type TextAreaInputProps = React.ComponentPropsWithoutRef<'textarea'>;

const TextAreaInput = React.forwardRef<React.ElementRef<'textarea'>, TextAreaInputProps>(
    ({ children, placeholder = '', ...props }, ref) => (
        <textarea
            ref={ref}
            placeholder={placeholder}
            defaultValue={typeof children === 'string' ? children : undefined}
            {...props}
        />
    )
);

TextAreaInput.displayName = 'TextAreaInput';

export default TextAreaInput;
