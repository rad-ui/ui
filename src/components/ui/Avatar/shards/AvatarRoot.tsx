import React from 'react';
// @ts-ignore
import {customClassSwitcher} from '~/core';

type AvatarRootProps = {
  children: React.ReactNode;
  customRootClass:string
};

const Root: React.FC<AvatarRootProps> = ({children, customRootClass=''}) => {
    const rootClass = customClassSwitcher(customRootClass, 'Avatar');
    return (
        <span className={`${rootClass}-root`}>
            {children}
        </span>
    );
};

export default Root;
