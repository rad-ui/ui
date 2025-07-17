import React from 'react';
import CheckboxCardsItemContext from '../context/CheckboxCardsItemContext';
import CheckboxCardsRootContext from '../context/CheckboxCardsRootContext';

export type CheckboxCardsItemProps ={
    children: React.ReactNode
    value: string
}
const CheckboxCardsItem = ({ children, value, ...props }: CheckboxCardsItemProps) => {
    const { rootClass } = React.useContext(CheckboxCardsRootContext);
    const [checked, setChecked] = React.useState(false);

    const handleClick = (e: React.MouseEvent) => {
            e.preventDefault();
    
            setChecked(!checked);
        };

    return <div className={`${rootClass}-item`} {...props} onClick={handleClick}>
        <CheckboxCardsItemContext.Provider value={{ value, checked, setChecked }}>
            {children}
        </CheckboxCardsItemContext.Provider>

    </div>;
};

export default CheckboxCardsItem;
