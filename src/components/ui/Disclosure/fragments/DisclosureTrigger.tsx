import React, { useContext } from "react"
import clsx from "clsx";
import { DisclosureContext } from "../contexts/DisclosureContext";
import { DisclosureItemContext } from "../contexts/DisclosureItemContext";

export type DisclosureTriggerProps = {
    children: React.ReactNode;
    className?: string;
    index: number; 
}

const DisclosureTrigger = ({ children, className, index }:DisclosureTriggerProps) => {
       
         const { activeItem, setActiveItem, rootClass, focusNextItem, focusPrevItem } = useContext(DisclosureContext)
         const { itemValue, handleBlurEvent, handleClickEvent, handleFocusEvent} = useContext(DisclosureItemContext)

         const handleDisclosure = () => {
              
                setActiveItem(activeItem === itemValue ? null : itemValue)
                handleClickEvent();
                }
                
         const onFocusHandler = () => {
            handleFocusEvent()
         }    
         
   return(
     
       <button
        type='button'
        className={clsx(`${rootClass}-trigger`, className)}
        onClick={handleDisclosure}
        onBlur={handleBlurEvent}
        onFocus={onFocusHandler}
        onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
                     e.preventDefault()
                        focusNextItem()
                     }
        
                     if (e.key === 'ArrowUp') {
                        e.preventDefault()
                        focusPrevItem()
                     }
        }}
        aria-expanded={activeItem === itemValue}
        aria-controls={`content-${index}`}
        aria-haspopup='true'
        >

         {children} 
       </button>
           
   )
}

export default DisclosureTrigger