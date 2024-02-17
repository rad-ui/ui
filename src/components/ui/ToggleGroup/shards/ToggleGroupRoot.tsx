import React from 'react';


import {ToggleContext} from '../contexts/toggleContext';

const ToggleGroupRoot = ({children}:any) => {
    return (
        <div className="toggle-group">
            <ToggleContext.Provider value={'bcd'}>
                {children}
            </ToggleContext.Provider>
        </div>
    );
};

export default ToggleGroupRoot;
