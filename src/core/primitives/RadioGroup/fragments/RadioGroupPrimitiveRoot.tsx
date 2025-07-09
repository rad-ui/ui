import React, { PropsWithChildren, useState } from 'react';
import Primitive from '../../Primitive';
import RadioGroupContext from '../context/RadioGroupContext';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';

type RadioGroupPrimitiveRootProps = PropsWithChildren<{
    className?: string;
    customRootClass?: string;
    defaultChecked?: string;
    onChange?: (item: string) => void;
    asChild?: boolean;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    orientation?: 'horizontal' | 'vertical' | 'both';
    loop?: boolean,
    dir?: 'ltr' | 'rtl';
}>;

const RadioGroupPrimitiveRoot = ({ children, defaultChecked = '', onChange, asChild = false, disabled: groupDisabled = false, required = false, name = '', orientation = 'horizontal', loop = true, dir = 'ltr', ...props }: RadioGroupPrimitiveRootProps) => {
    const [checkedItem, setCheckedItem] = useState(defaultChecked);

    const handleOnChange = (item: string) => {
        setCheckedItem(item);

        if (typeof onChange === 'function') {
            onChange(item);
        }
    };

    const sendItems = {
        checkedItem,
        setCheckedItem,
        onChange: handleOnChange,
        groupDisabled,
        name
    };

    return (
        <RovingFocusGroup.Root orientation={orientation} loop={loop} dir={dir}>
            <RadioGroupContext.Provider value={sendItems}>

                <Primitive.div {...props} aria-required={required} role='radiogroup' aria-disabled={groupDisabled} asChild>
                    <RovingFocusGroup.Group >
                        {children}
                    </RovingFocusGroup.Group>

                </Primitive.div>

            </RadioGroupContext.Provider>
        </RovingFocusGroup.Root>
    )
    ;
};

export default RadioGroupPrimitiveRoot;
