import clsx from 'clsx';
import React, { useContext } from 'react';
import { CollapsibleContext } from '../contexts/CollapsibleContext';
import CollapsiblePrimitive from '~/core/primitives/Collapsible';

type CollapsibleContentProps = {
    children: React.ReactNode;
    className?: string;

}

const CollapsibleContent = ({ children, className = '' }:CollapsibleContentProps) => {
    const { rootClass } = useContext(CollapsibleContext);
    const contentClass = rootClass ? `${rootClass}-content` : '';
    return (
        <CollapsiblePrimitive.Content className={clsx(contentClass, className)}>{children}</CollapsiblePrimitive.Content>
    );
};

export default CollapsibleContent;
