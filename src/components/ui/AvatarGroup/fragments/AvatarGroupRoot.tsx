import React from 'react';
import { clsx } from 'clsx';
import { customClassSwitcher } from '~/core/customClassSwitcher';

type AvatarGroupRootProps = {
    customRootClass?: string | '';
    children: React.ReactNode;
    className?: string;
}

const AvatarGroupRoot = ({ customRootClass = '', children, className, ...props }: AvatarGroupRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, 'AvatarGroup');
    return (
        <div className={clsx(rootClass, className)} {...props}>
            {children}
        </div>
    );
};

export default AvatarGroupRoot;
