import clsx from 'clsx';
import React, { Dispatch, SetStateAction } from 'react';
import { customClassSwitcher } from '~/core';
import { CollapsibleContext } from '../contexts/CollapsibleContext';




const COMPONENT_NAME = 'Collapsible'

export type CollapsibleRootProps = {
  children: React.ReactNode;
  customRootClass?: string;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
};

const CollapsibleRoot = ({children, customRootClass, open, onOpenChange}: CollapsibleRootProps) => {

    const rootClass = customClassSwitcher(customRootClass,COMPONENT_NAME)
  
    return (
    <CollapsibleContext.Provider
    value={{
        rootClass,
        open,
        onOpenChange
    }}
    ><div className={clsx(`${rootClass}-root`)}>
        {children}</div></CollapsibleContext.Provider>
  )
}

export default CollapsibleRoot