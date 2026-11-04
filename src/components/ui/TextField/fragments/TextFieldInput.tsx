import React from 'react';
import clsx from 'clsx';
import { composeRefs } from '~/core';
import TextFieldContext from '../contexts/TextFieldContext';

export type TextFieldInputProps = React.ComponentPropsWithoutRef<'input'> & {
    /** Called with the new text whenever it changes, after `onChange`. */
    onValueChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextFieldInput = React.forwardRef<HTMLInputElement, TextFieldInputProps>(({ className = '', type = 'text', onChange, onValueChange, onInput, value, defaultValue, ...props }, ref) => {
    const { rootClass, inputRef, setHasValue, setIsLocked } = React.useContext(TextFieldContext);
    const isLocked = Boolean(props.disabled || props.readOnly);

    React.useEffect(() => {
        setIsLocked(isLocked);
    }, [isLocked, setIsLocked]);

    React.useEffect(() => {
        if (value !== undefined) {
            setHasValue(String(value).length > 0);
            return;
        }

        if (defaultValue !== undefined) {
            setHasValue(String(defaultValue).length > 0);
        }
    }, [defaultValue, setHasValue, value]);

    const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
        setHasValue(event.currentTarget.value.length > 0);
        onInput?.(event);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHasValue(event.currentTarget.value.length > 0);
        onChange?.(event);
        onValueChange?.(event.currentTarget.value, event);
    };

    return <input ref={composeRefs(ref, inputRef)} type={type} className={clsx(rootClass && `${rootClass}-input`, className)} data-slot="text-field-input" value={value} defaultValue={defaultValue} onInput={handleInput} onChange={handleChange} {...props} />;
});

TextFieldInput.displayName = 'TextFieldInput';

export default TextFieldInput;
