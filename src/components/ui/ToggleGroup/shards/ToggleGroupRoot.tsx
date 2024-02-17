import React, {useState} from 'react';


import {ToggleContext} from '../contexts/toggleContext';

const ToggleGroupRoot = ({type ="multiple", value=null,  children}:any) => {

    // value can be either a string or an array of strings
    // if its null, then no toggles are active
    
    const [activeToggles, setActiveToggles] = useState(value || []);


    return (
        <div className="toggle-group">
            <ToggleContext.Provider 
                value={{
                        activeToggles,
                        setActiveToggles,
                        type
                }}>
                    {children}
            </ToggleContext.Provider>
        </div>
    );
};

export default ToggleGroupRoot;
