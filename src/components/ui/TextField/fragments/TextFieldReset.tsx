import React from 'react';
import clsx from 'clsx';
import TextFieldContext from '../contexts/TextFieldContext';

export type TextFieldResetProps = React.ComponentPropsWithoutRef<'button'>;

const TextFieldReset = React.forwardRef<HTMLButtonElement, TextFieldResetProps>(({ className = '', type = 'button', onClick, children, ...props }, ref) => {
    const { rootClass, clearInput, inputRef, hasValue, isLocked } = React.useContext(TextFieldContext);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);

        if (event.defaultPrevented || inputRef.current?.disabled || inputRef.current?.readOnly) {
            return;
        }

        clearInput();
    };

    // Nothing to clear, or the value cannot be changed (disabled / read-only input).
    if (!hasValue || isLocked) {
        return null;
    }

    return (
        <button
            ref={ref}
            type={type}
            className={clsx(rootClass && `${rootClass}-reset`, className)}
            data-slot="text-field-reset"
            onClick={handleClick}
            {...props}
        >
            {children}
        </button>
    );
});

TextFieldReset.displayName = 'TextFieldReset';

export default TextFieldReset;
