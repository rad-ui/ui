import React, { PropsWithChildren, useContext } from 'react';
import RadioGroupContext from '../context/RadioGroupContext';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import RadioGroupPrimitiveItemContext from '../context/RadioGroupPrimitiveItemContext';

type RadioGroupPrimitiveItemProps = PropsWithChildren<{
    value: string;
    disabled?: boolean
    children?: React.ReactNode;
    required?: boolean
    className?: string
}>;

const RadioGroupPrimitiveItem = ({ value, children, disabled, required = false, className = '', ...props }: RadioGroupPrimitiveItemProps) => {
    const context = useContext(RadioGroupContext);
    if (!context) {
        throw new Error('RadioGroup.Item must be used within a RadioGroup.Root');
    }
    const { groupDisabled, name, selectedValue, setSelectedValue } = context;

    const itemSelected = value === selectedValue;
    return (
        

        <RovingFocusGroup.Item >
            <button 
                disabled={groupDisabled || disabled}
                onClick={() => setSelectedValue(value)}
                onFocus={() => setSelectedValue(value)}
                aria-disabled={groupDisabled || disabled}
                aria-checked={value === selectedValue}
                aria-required={required}
                className={className}
                {...props}
            >
                <RadioGroupPrimitiveItemContext.Provider value={{ itemSelected }}>
                    {children}
                </RadioGroupPrimitiveItemContext.Provider>
            </button>
        </RovingFocusGroup.Item>

        
    );
};

export default RadioGroupPrimitiveItem;
