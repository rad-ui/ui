import React, {useContext} from 'react';
import CheckboxGroupContext from '../context/CheckboxGroupContext';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';

export type CheckboxGroupContentProps = {
    children: React.ReactNode
    className?: string
}

const CheckboxGroupContent = ({children, className = ''}: CheckboxGroupContentProps) => {
    const {rootClass} = useContext(CheckboxGroupContext);
    return(
        <Primitive.label className={clsx(`${rootClass}-label`, className)}> 
            {children}
        </Primitive.label>
    )
}

export default CheckboxGroupContent