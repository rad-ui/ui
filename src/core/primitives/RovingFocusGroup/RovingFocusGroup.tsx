import React from 'react';
import RovingFocusRoot from "./fragments/RovingFocusRoot"
import RovingFocusItem from './fragments/RovingFocusItem';

export interface RovingFocusGroupItems {
    title: string;
    content: React.ReactNode;
}

export interface RovingFocusGroupProps {
    items: RovingFocusGroupItems[];
  }


function RovingFocusGroup({items}: RovingFocusGroupProps ) {
    
    return (
        <RovingFocusRoot>
            {items.map((item) => {
                return (
                    <RovingFocusItem>
                    {item.title}
                    {item.content}
                    </RovingFocusItem>
                )
            })}
       </RovingFocusRoot>
            
    );
}

export default RovingFocusGroup;