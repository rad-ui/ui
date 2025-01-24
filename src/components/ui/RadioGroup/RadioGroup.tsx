import React, { DetailedHTMLProps, InputHTMLAttributes, PropsWithChildren } from 'react';

import RadioGroupRoot from './fragments/RadioGroupRoot';
import RadioGroupItem from './fragments/RadioGroupItem';

export type RadioGroupProps = {
    children?: React.ReactNode;
    className: string;
    customRootClass: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & PropsWithChildren

const RadioGroup = ({ className = '', customRootClass = '', children, ...props }:RadioGroupProps) => {
    return (
        <RadioGroupRoot className={className} customRootClass={customRootClass} {...props}>
            <RadioGroupItem value='radio1'>
                Radio 1
            </RadioGroupItem>
            <RadioGroupItem value='radio2'>
                Radio 2
            </RadioGroupItem>
            <RadioGroupItem value='radio3'>
                Radio 3
            </RadioGroupItem>
        </RadioGroupRoot>
    );
};

export default RadioGroup;
