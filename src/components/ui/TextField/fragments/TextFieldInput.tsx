import React from 'react';
import clsx from 'clsx';
import { composeRefs } from '~/core';
import TextFieldContext from '../contexts/TextFieldContext';

export type TextFieldInputProps = React.ComponentPropsWithoutRef<'input'>;

const TextFieldInput = React.forwardRef<HTMLInputElement, TextFieldInputProps>(({ className = '', type = 'text', onChange, onInput, value, defaultValue, ...props }, ref) => {
    const { rootClass, inputRef, setHasValue } = React.useContext(TextFieldContext);

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
    };

    return <input ref={composeRefs(ref, inputRef)} type={type} className={clsx(rootClass && `${rootClass}-input`, className)} value={value} defaultValue={defaultValue} onInput={handleInput} onChange={handleChange} {...props} />;
});

TextFieldInput.displayName = 'TextFieldInput';

export default TextFieldInput;
