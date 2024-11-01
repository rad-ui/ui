import React from 'react';

import AvatarGroupContext from '../contexts/AvatarGroupContext';
import { customClassSwitcher } from '~/core/customClassSwitcher';

type AvatarGroupRootProps = {
    customRootClass?: string | '';
    children: React.ReactNode;
    className?: string;
}

const AvatarGroupRoot = ({ customRootClass = '', children, className }: AvatarGroupRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, 'AvatarGroup');
    return (
        <div className={rootClass}>
            <AvatarGroupContext.Provider value={{}}>
                {children}
            </AvatarGroupContext.Provider>
        </div>
    );
};

export default AvatarGroupRoot;
