import React, { useContext, useState } from "react";
import clsx from "clsx";
import { DisclosureContext } from "../contexts/DisclosureContext";


export type DisclosureContentProps = {
      children: React.ReactNode;
      className?: string
}

const DisclosureContent = ({children,className='' }:DisclosureContentProps) => {
      
      
     return(
          <div 
            // className={clsx(`${rootClass}-content`, className)}
            >
           {children}
         </div>
   )
}

export default DisclosureContent