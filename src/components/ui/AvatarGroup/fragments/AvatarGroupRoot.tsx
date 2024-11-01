import React from 'react';

import { customClassSwitcher } from '~/core/customClassSwitcher';

type AvatarGroupRootProps = {
    customRootClass?: string | '';
    children: React.ReactNode;
    className?: string;
}

const AvatarGroupRoot = ({ customRootClass = '', children, className, ...props }: AvatarGroupRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, 'AvatarGroup');
    return (
        <div className={`${rootClass} ${className}`} {...props}>
            {children}
        </div>
    );
};

export default AvatarGroupRoot;
