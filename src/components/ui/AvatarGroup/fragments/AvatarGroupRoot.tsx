import React from 'react';
import { clsx } from 'clsx';
import { customClassSwitcher } from '~/core/customClassSwitcher';
import { AvatarGroupContext } from '../contexts/AvatarGroupContext';
import { useCreateDataAttribute, useComposeAttributes } from '~/core/hooks/createDataAttribute';
export type AvatarGroupRootProps = {
    customRootClass?: string | '';
    size?: string;
    variant?: string;
    children: React.ReactNode;
    className?: string;
}

const COMPONENT_NAME = 'AvatarGroup';

const AvatarGroupRoot = ({ customRootClass = '', size = '', variant = '', children, className = '', ...props }: AvatarGroupRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    const dataAttributes = useCreateDataAttribute('avatar', { variant, size });
    const composedAttributes = useComposeAttributes(dataAttributes());

    return (
        <AvatarGroupContext.Provider value={{ size, variant, rootClass }}>
            <div className={clsx(rootClass, className)} {...composedAttributes()} {...props}>
                {children}
            </div>
        </AvatarGroupContext.Provider>
    );
};

export default AvatarGroupRoot;
