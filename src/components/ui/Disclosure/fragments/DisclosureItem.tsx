import React, { useContext, useState,useEffect } from "react";
import { clsx } from "clsx";
import { DisclosureContext } from "../contexts/DisclosureContext";

export type DisclosureItemProps = {
    children: React.ReactNode;
    className?: string;
    value?: number;
}

const DisclosureItem = ({children, value, className='' }:DisclosureItemProps) => {
    

    return ( 
     
     <div>
        {children}
     </div>
    )
}

export default DisclosureItem