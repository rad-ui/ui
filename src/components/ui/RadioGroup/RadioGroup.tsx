import React, { DetailedHTMLProps, InputHTMLAttributes, PropsWithChildren } from 'react';
import { customClassSwitcher } from '~/core';
import RadioPrimitive from '~/core/primitives/Radio';
const COMPONENT_NAME = 'RadioGroup';
import React, { DetailedHTMLProps, InputHTMLAttributes, PropsWithChildren } from 'react';
import { clsx } from 'clsx';
import { customClassSwitcher } from '~/core';
import RadioPrimitive from '~/core/primitives/Radio';
const COMPONENT_NAME = 'RadioGroup';

export type RadioGroupProps = {

    children?: React.ReactNode;
    className: string;
    customRootClass: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & PropsWithChildren

const RadioGroup = ({ children, type = 'radio', className = '', customRootClass = '', ...props }:RadioGroupProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    return (
        <div className={clsx(rootClass, className)} role='radiogroup'>
            <RadioPrimitive
                type={type}
                {...props}>

                {children}
            </RadioPrimitive>
        </div>
    );
};

export default RadioGroup;
