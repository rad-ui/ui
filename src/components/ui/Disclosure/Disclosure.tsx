import React from "react";
import DisclosureRoot from "./fragments/DisclosureRoot";
import DisclosureItem from "./fragments/DisclosureItem";
import DisclosureTrigger from "./fragments/DisclosureTrigger";
import DisclosureContent from "./fragments/DisclosureContent";

export type DisclosureProps = {

     items:{title:string, content: React.ReactNode}[]
}

const Disclosure = ({items}:DisclosureProps) => {
    return(
        
        <DisclosureRoot>
            {items.map((item,index) => (
                 <DisclosureItem key={index} value={index}>
                    <DisclosureTrigger>
                       {item.title}  
                    </DisclosureTrigger>
                    <DisclosureContent> 
                       {item.content}
                    </DisclosureContent>
                 </DisclosureItem>
            
            ))}
            
        </DisclosureRoot>
    )
}
 
Disclosure.Root = DisclosureRoot

export default Disclosure;