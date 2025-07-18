import React from 'react';
import CheckboxGroupItemContext from '../context/CheckboxGroupItemContext';
import CheckboxGroupRootContext from '../context/CheckboxGroupRootContext';

export type CheckboxGroupItemProps ={
    children: React.ReactNode
    value: string
}
const CheckboxGroupItem = ({ children, value, ...props }: CheckboxGroupItemProps) => {
    const { rootClass } = React.useContext(CheckboxGroupRootContext);
    const [checked, setChecked] = React.useState(false);
    return <div className={`${rootClass}-item`}>
        <CheckboxGroupItemContext.Provider value={{ value, checked, setChecked }}>
            {children}
        </CheckboxGroupItemContext.Provider>

    </div>;
};

export default CheckboxGroupItem;
