import React from 'react';
import CheckboxGroupPrimitiveTriggerContext from '../context/CheckboxGroupPrimitiveTriggerContext';

export type CheckboxGroupPrimitiveContentProps = {
    children?: React.ReactNode
    className?: string
}
const CheckboxGroupPrimitiveContent = ({ children, className }: CheckboxGroupPrimitiveContentProps) => {
    const { isChecked } = React.useContext(CheckboxGroupPrimitiveTriggerContext);

    return <span className={className}>
        {isChecked ? children : null}
    </span>;
};

export default CheckboxGroupPrimitiveContent;
