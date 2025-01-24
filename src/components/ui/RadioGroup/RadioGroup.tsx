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

        </RadioGroupRoot>
    );
};

RadioGroup.Root = RadioGroupRoot;
RadioGroup.Item = RadioGroupItem;

export default RadioGroup;
