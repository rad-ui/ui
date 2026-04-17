import React from 'react';
import Primitive from '../Primitive';

export type RadioPrimitiveElement = React.ElementRef<'input'>;

export type RadioPrimitiveProps = Omit<React.ComponentPropsWithoutRef<'input'>, 'onChange'> & {
    name: string;
    value: string;
    id: string;
    onChange?: () => void;
    asChild?: boolean;
    className?: string;
};

const RadioPrimitive = React.forwardRef<RadioPrimitiveElement, RadioPrimitiveProps>(
    ({ name, value, id, checked, required, onChange, disabled, asChild, className, ...props }, forwardedRef) => {
        return (
            <Primitive.input
                ref={forwardedRef}
                type="radio"
                checked={checked}
                name={name}
                tabIndex={-1}
                value={value}
                onChange={onChange}
                id={id}
                aria-disabled={disabled}
                disabled={disabled}
                required={required}
                aria-required={required}
                asChild={asChild}
                className={className}
                {...props}
            />
        );
    }
);

RadioPrimitive.displayName = 'RadioPrimitive';

export default RadioPrimitive;
