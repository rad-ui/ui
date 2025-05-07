import React from 'react';
import { clsx } from 'clsx';
import { customClassSwitcher } from '~/core/customClassSwitcher';
import { AvatarGroupContext } from '../contexts/AvatarGroupContext';

type AvatarGroupRootProps = {
    customRootClass?: string | '';
    color?: string;
    size?: string;
    variant?: string;
    children: React.ReactNode;
    className?: string;
}

const COMPONENT_NAME = 'AvatarGroup';

const AvatarGroupRoot = ({ customRootClass = '', color = '', size = '', variant = '', children, className, ...props }: AvatarGroupRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    return (
        <AvatarGroupContext.Provider value={{ color, size, variant, rootClass }}>
            <div className={clsx(rootClass, className)} {...props}>
                {children}
            </div>
        </AvatarGroupContext.Provider>
    );
};

export default AvatarGroupRoot;
