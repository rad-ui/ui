import React from 'react';
import CheckboxGroupPrimitive, { CheckboxGroupPrimitiveProps } from '~/core/primitives/CheckboxGroup/CheckboxGroupPrimitive';
import CheckboxCardsRootContext from '../context/CheckboxCardsRootContext';

export type CheckboxCardsItemProps ={
    children: React.ReactNode
}
const CheckboxCardsContent = ({ children, ...props }: CheckboxCardsItemProps) => {
    const { rootClass } = React.useContext(CheckboxCardsRootContext);

    return (
        <CheckboxGroupPrimitive.Content className={`${rootClass}-content`} {...props} >{children}</CheckboxGroupPrimitive.Content>
    );
};

export default CheckboxCardsContent;
