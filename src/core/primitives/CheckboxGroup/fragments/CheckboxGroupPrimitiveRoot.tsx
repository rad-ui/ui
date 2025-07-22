import React from 'react';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import { useControllableState } from '~/core/hooks/useControllableState';
import CheckboxGroupPrimitiveContext from '../context/CheckboxGroupPrimitiveContext';

export type CheckboxGroupPrimitiveRootProps = {
    children: React.ReactNode;
    className?: string
    name?: string;
    required?: boolean;
    disabled?: boolean;
    dir?: 'ltr' | 'rtl';
    orientation?: 'horizontal' | 'vertical' | 'both';
    loop?: boolean;
    defaultValue?: string[];
    value?: string[];
    onValueChange?: (value: string[]) => void;
}

const CheckboxGroupPrimitiveRoot = ({ dir, orientation, loop, defaultValue = [], value, onValueChange, children, name, required, disabled, className = '', ...props }: CheckboxGroupPrimitiveRootProps) => {
    const [checkedValues, setCheckedValues] = useControllableState(
        value,
        defaultValue,
        onValueChange
    );

    return (
        <div className={className} {...props}>
            <RovingFocusGroup.Root dir={dir} orientation={orientation} loop={loop}>
                <CheckboxGroupPrimitiveContext.Provider value={{ checkedValues, setCheckedValues, name, required, disabled }}>
                    <RovingFocusGroup.Group>
                        {children}
                    </RovingFocusGroup.Group>
                </CheckboxGroupPrimitiveContext.Provider>
            </RovingFocusGroup.Root>
        </div>
    );
};

export default CheckboxGroupPrimitiveRoot;
