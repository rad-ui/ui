import React from 'react'
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import NavigationMenuItemContext from '../contexts/NavigationMenyItemContext';
import NavigationMenuRootContext from '../contexts/NavigationMenuRootContext';
import clsx from 'clsx';

const NavigationMenuTrigger = ({children, className}:any) => {
    const {handleTrigger} = React.useContext(NavigationMenuItemContext);
    const {rootClass} = React.useContext(NavigationMenuRootContext);
    return (
        <RovingFocusGroup.Item>
            <button onClick={handleTrigger} className={clsx(`${rootClass}-trigger`, className)}>
                {children}
            </button>
        </RovingFocusGroup.Item>
    )
}

export default NavigationMenuTrigger