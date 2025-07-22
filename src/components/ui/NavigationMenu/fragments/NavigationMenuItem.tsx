import React, { useEffect } from 'react'
import NavigationMenuItemContext from '../contexts/NavigationMenyItemContext';
import NavigationMenuRootContext from '../contexts/NavigationMenuRootContext';
import clsx from 'clsx';

const NavigationMenuItem = ({value, children, className}:any) => {
    const {isOpen, setIsOpen, rootClass} = React.useContext(NavigationMenuRootContext);

    const itemOpen = isOpen === value;
    

    const handleTrigger = () => {
        setIsOpen(itemOpen ? '' : value);
    }
    return (
        <NavigationMenuItemContext.Provider value={{itemOpen, handleTrigger}} >
        <div  onMouseEnter={handleTrigger} onMouseLeave={handleTrigger} className={clsx(`${rootClass}-item`, className)}>
            {children}
        </div>
        </NavigationMenuItemContext.Provider>
    )
}

export default NavigationMenuItem