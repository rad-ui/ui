import React from 'react'
import NavigationMenuItemContext from '../contexts/NavigationMenyItemContext';
import NavigationMenuRootContext from '../contexts/NavigationMenuRootContext';
import clsx from 'clsx';

const NavigationMenuItem = ({value, children, className}:any) => {
    const {isOpen, setIsOpen, rootClass} = React.useContext(NavigationMenuRootContext);

    const itemOpen = isOpen === value;
    

    const handleTrigger = () => {
        setIsOpen(itemOpen ? '' : value);
    }

    const handleEscape = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Escape') setIsOpen('');
    }
    return (
        <NavigationMenuItemContext.Provider value={{itemOpen, handleTrigger}} >
        <div  onMouseEnter={handleTrigger} onMouseLeave={handleTrigger} className={clsx(`${rootClass}-item`, className)} onKeyDown={handleEscape}>
            {children}
        </div>
        </NavigationMenuItemContext.Provider>
    )
}

export default NavigationMenuItem