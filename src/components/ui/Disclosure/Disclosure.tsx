import React from "react";
import DisclosureRoot from "./fragments/DisclosureRoot";
import DisclosureItem from "./fragments/DisclosureItem";
import DisclosureTrigger from "./fragments/DisclosureTrigger";
import DisclosureContent from "./fragments/DisclosureContent";

export type DisclosureProps = {

     items:{question:string,answer: string}[]
}

const Disclosure = ({items}:DisclosureProps) => {
    return(
        
        <DisclosureRoot>
            {items.map((item,index) => (
                 <DisclosureItem key={index}>
                    <DisclosureTrigger>
                       {item.question}
                    </DisclosureTrigger>
                    <DisclosureContent>
                       {item.answer}
                    </DisclosureContent>
                 </DisclosureItem>
            
            ))}
            
        </DisclosureRoot>
    )
}
 
Disclosure.Root = DisclosureRoot

export default Disclosure;