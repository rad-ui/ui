import React, { PropsWithChildren } from 'react';
import { customClassSwitcher } from '~/core';
import { clsx } from 'clsx';

const COMPONENT_NAME = 'RadioGroup';

type RadioGroupRootProps = PropsWithChildren<{
    className?: string;
    customRootClass?: string;
}>;

const RadioGroupRoot = ({ children, className, customRootClass = '' }: RadioGroupRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);

    return <div className={clsx(rootClass, className)}>{children}</div>;
};

export default RadioGroupRoot;
