import React from 'react';

export type TextAreaInputProps = React.ComponentPropsWithoutRef<'textarea'> & {
    /** Called with the new text whenever it changes, after `onChange`. */
    onValueChange?: (value: string, event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const TextAreaInput = React.forwardRef<React.ElementRef<'textarea'>, TextAreaInputProps>(
    ({ children, placeholder = '', value, defaultValue, onChange, onValueChange, ...props }, ref) => {
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
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                    onChange?.(event);
                    onValueChange?.(event.currentTarget.value, event);
                }}
            />
        );
    }
);

TextAreaInput.displayName = 'TextAreaInput';

export default TextAreaInput;
