import React from 'react';
import Primitive from '../../Primitive';
import RadioGroupContext from '../context/RadioGroupContext';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import useControllableState from '~/core/hooks/useControllableState';

export type RadioGroupPrimitiveRootElement = React.ElementRef<typeof Primitive.div>;

export type RadioGroupPrimitiveRootProps = React.ComponentPropsWithoutRef<typeof Primitive.div> & {
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

const RadioGroupPrimitiveRoot = React.forwardRef<RadioGroupPrimitiveRootElement, RadioGroupPrimitiveRootProps>(
    ({ value, defaultValue = '', onValueChange, children, disabled: groupDisabled = false, required = false, name = '', orientation = 'horizontal', loop = true, dir = 'ltr', ...props }, ref) => {
        const [selectedValue, setSelectedValue] = useControllableState(
            value,
            defaultValue,
            onValueChange
        );

        const sendItems = {
            selectedValue,
            setSelectedValue,
            groupDisabled
        };

        return (
            <RadioGroupContext.Provider value={sendItems}>
                <RovingFocusGroup.Root dir={dir} orientation={orientation} loop={loop} asChild>
                    <Primitive.div ref={ref} {...props} aria-required={required} role='radiogroup' aria-disabled={groupDisabled} data-disabled={groupDisabled ? '' : undefined}>
                        <RovingFocusGroup.Group>
                            <div>{children}</div>
                        </RovingFocusGroup.Group>
                        {name && (
                            <>
                                <input
                                    type='hidden'
                                    name={name}
                                    value={selectedValue}
                                    disabled={groupDisabled}
                                />
                                {required && selectedValue !== '' && (
                                    <input
                                        type='radio'
                                        name={name}
                                        value={selectedValue}
                                        checked
                                        onChange={() => {}}
                                        disabled={groupDisabled}
                                        required
                                        aria-hidden='true'
                                        tabIndex={-1}
                                        style={{
                                            position: 'absolute',
                                            width: 0,
                                            height: 0,
                                            opacity: 0,
                                            pointerEvents: 'none',
                                            margin: 0
                                        }}
                                    />
                                )}
                            </>
                        )}
                    </Primitive.div>
                </RovingFocusGroup.Root>
            </RadioGroupContext.Provider>
        )
        ;
    }
);

RadioGroupPrimitiveRoot.displayName = 'RadioGroupPrimitiveRoot';

export default RadioGroupPrimitiveRoot;
