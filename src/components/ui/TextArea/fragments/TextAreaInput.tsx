import React from 'react';

export type TextAreaInputProps = React.ComponentPropsWithoutRef<'textarea'>;

const TextAreaInput = React.forwardRef<React.ElementRef<'textarea'>, TextAreaInputProps>(
    ({ children, placeholder = '', value, defaultValue, ...props }, ref) => {
        // String children are a legacy shorthand for `defaultValue`; never combine them
        // with `value`/`defaultValue` (React warns about mixing controlled and uncontrolled).
        const childDefaultValue = value === undefined && defaultValue === undefined && typeof children === 'string'
            ? children
            : undefined;

        return (
            <textarea
                ref={ref}
                placeholder={placeholder}
                value={value}
                defaultValue={defaultValue ?? childDefaultValue}
                {...props}
            />
        );
    }
);

TextAreaInput.displayName = 'TextAreaInput';

export default TextAreaInput;
