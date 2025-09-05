import React, { ComponentPropsWithoutRef, ElementRef } from 'react';
import Primitive from '../../Primitive';
import RadioGroupContext from '../context/RadioGroupContext';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import useControllableState from '~/core/hooks/useControllableState';

export type RadioGroupPrimitiveRootElement = ElementRef<typeof Primitive.div>;

export type RadioGroupPrimitiveRootProps = ComponentPropsWithoutRef<typeof Primitive.div> & {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    orientation?: 'horizontal' | 'vertical' | 'both';
    loop?: boolean;
    dir?: 'ltr' | 'rtl';
};

const RadioGroupPrimitiveRoot = React.forwardRef<
    RadioGroupPrimitiveRootElement,
    RadioGroupPrimitiveRootProps
>(
    (
        {
            value,
            defaultValue = '',
            onValueChange,
            children,
            disabled: groupDisabled = false,
            required = false,
            name = '',
            orientation = 'horizontal',
            loop = false,
            dir = 'ltr',
            ...props
        },
        forwardedRef
    ) => {
        const [selectedValue, setSelectedValue] = useControllableState(
            value,
            defaultValue,
            onValueChange
        );

        const sendItems = {
            selectedValue,
            setSelectedValue,
            groupDisabled,
        };

        return (
            <Primitive.div
                ref={forwardedRef}
                {...props}
                aria-required={required}
                role="radiogroup"
                aria-disabled={groupDisabled}
            >
                <RovingFocusGroup.Root dir={dir} orientation={orientation} loop={loop}>
                    <RadioGroupContext.Provider value={sendItems}>
                        <RovingFocusGroup.Group>{children}</RovingFocusGroup.Group>
                    </RadioGroupContext.Provider>
                </RovingFocusGroup.Root>
                <input
                    type="radio"
                    hidden
                    name={name}
                    value={selectedValue}
                    disabled={groupDisabled}
                    required={required}
                />
            </Primitive.div>
        );
    }
);

RadioGroupPrimitiveRoot.displayName = 'RadioGroupPrimitiveRoot';

export default RadioGroupPrimitiveRoot;

