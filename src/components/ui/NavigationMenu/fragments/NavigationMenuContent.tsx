import React, { useEffect } from 'react'
import NavigationMenuRootContext from '../contexts/NavigationMenuRootContext';
import NavigationMenuItemContext from '../contexts/NavigationMenyItemContext';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import clsx from 'clsx';


const NavigationMenuContent = ({children, className}:any) => {
    const {itemOpen} = React.useContext(NavigationMenuItemContext);
    const {rootClass} = React.useContext(NavigationMenuRootContext);
    const contentRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!contentRef.current) return
        if ( contentRef.current.children[0].children[0]) {
          contentRef.current.children[0]?.children[0].firstChild.focus();
        }
      }, [itemOpen]);

   if (!itemOpen) return null
    return (

        <div ref={contentRef} className={clsx(`${rootClass}-content`, className)} data-state={itemOpen ? 'open' : 'closed'}>
            <RovingFocusGroup.Root>
                <RovingFocusGroup.Group >
            {children}
                </RovingFocusGroup.Group>
            </RovingFocusGroup.Root>
        </div>
    )
}

export default NavigationMenuContent