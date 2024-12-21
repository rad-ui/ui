import clsx from 'clsx';
import React, { useContext } from 'react';
import { CollapsibleContext } from '../contexts/CollapsibleContext';

type CollapsibleContentProps = {
    children: React.ReactNode;
    className?: string;
    state: boolean
}

const CollapsibleContent: React.FC<CollapsibleContentProps> = ({children,className='',state}:CollapsibleContentProps) => {
  
    const {rootClass} = useContext(CollapsibleContext)
  
    return (
      <div
        className={clsx(`${rootClass}-content`, className)}
        aria-hidden={!state}
        style={{
          overflow: "hidden",
          height: (state) ? "auto" : "0",
        }}
      >
        {children}
      </div>
    );
}

export default CollapsibleContent