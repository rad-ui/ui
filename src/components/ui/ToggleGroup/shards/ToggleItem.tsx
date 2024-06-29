import React, {useContext} from 'react';

import {ToggleContext} from '../contexts/toggleContext';


const ToggleItem = ({children, value=null, ...props}:any) => {
    const toggleContext = useContext(ToggleContext);


    const type = toggleContext?.type;

    const isActive = toggleContext?.activeToggles?.includes(value);

    const handleToggleSelect = () => {
        let activeToggleArray = toggleContext?.activeToggles || [];

        // For Single Case
        if (type === 'single') {
            if (isActive) {
                toggleContext?.setActiveToggles([]);
                return;
            } else {
                toggleContext?.setActiveToggles([value]);
                return;
            }
        }

        // For Multiple Case
        if (type === 'multiple') {
            if (isActive) {
                activeToggleArray = activeToggleArray.filter((item: any) => item !== value);
            } else {
                activeToggleArray = [...activeToggleArray, value]; // Using spread operator to create a new array
            }
        }

        toggleContext?.setActiveToggles(activeToggleArray);
        console.log(toggleContext?.activeToggles);
    };


    return <div
        className={`${isActive?'bg-blue-600':''}`} onClick={() => {
            handleToggleSelect();
        }}>{children}</div>;
};

export default ToggleItem;
