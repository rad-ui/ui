import React, { useContext, useState } from "react"
import { DisclosureContext } from "../contexts/DisclosureContext";
import clsx from "clsx";

export type DisclosureTriggerProps = {
    children: React.ReactNode;
    className?: string;
   
}

const DisclosureTrigger = ({children, className}:DisclosureTriggerProps) => {
       
        const onClickHandler = () => {
        
        }
   return(

     <button
       type='button'
    //    className={clsx(`${rootClass}-trigger`, className)}
       onClick={onClickHandler}
        >
        {children}
     </button>
   )
}

export default DisclosureTrigger