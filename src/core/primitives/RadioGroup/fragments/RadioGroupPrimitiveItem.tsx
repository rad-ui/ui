import React, { useContext } from 'react';
import RadioGroupContext from '../context/RadioGroupContext';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import RadioGroupPrimitiveItemContext from '../context/RadioGroupPrimitiveItemContext';
import ButtonPrimitive from '~/core/primitives/Button';

export type RadioGroupPrimitiveItemElement = React.ElementRef<typeof ButtonPrimitive>;

export type RadioGroupPrimitiveItemProps = React.ComponentPropsWithoutRef<typeof ButtonPrimitive> & {
    value: string;
};

const RadioGroupPrimitiveItem = React.forwardRef<RadioGroupPrimitiveItemElement, RadioGroupPrimitiveItemProps>(
    ({ value, children, disabled, required = false, className = '', asChild = false, ...props }, ref) => {
        const context = useContext(RadioGroupContext);
        if (!context) {
            throw new Error('RadioGroup.Item must be used within a RadioGroup.Root');
        }
        const { groupDisabled, selectedValue, setSelectedValue } = context;

        const itemSelected = value === selectedValue;
        return (

            <RadioGroupPrimitiveItemContext.Provider value={{ itemSelected }}>
                <RovingFocusGroup.Item role="radio">
                    <ButtonPrimitive
                        ref={ref}
                        role="radio"
                        type="button"
                        disabled={groupDisabled || disabled}
                        onClick={() => setSelectedValue(value)}
                        onFocus={() => setSelectedValue(value)}
                        aria-disabled={groupDisabled || disabled}
                        aria-checked={itemSelected}
                        data-state={itemSelected ? 'checked' : 'unchecked'}
                        data-disabled={groupDisabled || disabled ? '' : undefined}
                        aria-required={required}
                        asChild={asChild}
                        className={className}
                        {...props}
                    >
                        {children}
                    </ButtonPrimitive>
                </RovingFocusGroup.Item>
            </RadioGroupPrimitiveItemContext.Provider>

        );
    }
);

RadioGroupPrimitiveItem.displayName = 'RadioGroupPrimitiveItem';

export default RadioGroupPrimitiveItem;
