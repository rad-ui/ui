import clsx from 'clsx';
import React from 'react';
import { customClassSwitcher } from '~/core';
import { CollapsibleContext } from '../contexts/CollapsibleContext';
import CollapsiblePrimitive from '~/core/primitives/Collapsible';

const COMPONENT_NAME = 'Collapsible';

type CollapsibleRootProps = {
    children: React.ReactNode;
    className?: string;
    transitionDuration?: number;
    disabled?: boolean;
    customRootClass?: string;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
};

const CollapsibleRoot = ({ children, className = '', transitionDuration = 0, disabled, customRootClass, open, defaultOpen, onOpenChange }: CollapsibleRootProps) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    return <CollapsibleContext.Provider value={{ rootClass }}>
        <CollapsiblePrimitive.Root className={clsx(rootClass, className)} defaultOpen={defaultOpen} open={open} onOpenChange={onOpenChange} disabled={disabled} transitionDuration={transitionDuration}>{children}</CollapsiblePrimitive.Root>
    </CollapsibleContext.Provider>;
};

export default CollapsibleRoot;
