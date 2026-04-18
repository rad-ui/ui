import React from 'react';
import clsx from 'clsx';
import TextFieldContext from '../contexts/TextFieldContext';

export type TextFieldSlotProps = React.ComponentPropsWithoutRef<'div'> & {
    side?: 'start' | 'end';
};

const TextFieldSlot = React.forwardRef<HTMLDivElement, TextFieldSlotProps>(({ children, className = '', side, ...props }, ref) => {
    const { rootClass, inputRef } = React.useContext(TextFieldContext);

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        props.onMouseDown?.(event);

        if (event.defaultPrevented) {
            return;
        }

        event.preventDefault();
        inputRef.current?.focus();
    };

    return <div ref={ref} role="presentation" className={clsx(rootClass && `${rootClass}-slot`, className)} data-text-field-slot={side} {...props} onMouseDown={handleMouseDown}>{children}</div>;
});

TextFieldSlot.displayName = 'TextFieldSlot';

export default TextFieldSlot;
