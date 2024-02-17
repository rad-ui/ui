import React, {useContext} from 'react';

import {ToggleContext} from '../contexts/toggleContext';


const ToggleItem = ({children, ...props}:any) => {
    const value = useContext(ToggleContext);

    console.log(value);

    return <div>item</div>;
};

export default ToggleItem;
