import clsx from 'clsx';
import React, { useContext } from 'react';
import CollapsiblePrimitive from '~/core/primitives/Collapsible';
import { CollapsibleContext } from '../contexts/CollapsibleContext';

type CollapsibleTriggerProps = {
    children?: React.ReactNode
    asChild?: boolean
    className?: string
    id?: string
    key?: string
    style?: React.CSSProperties
    index?: number
}

const CollapsibleTrigger = ({ children, className, ...props }: CollapsibleTriggerProps) => {
    const { rootClass } = useContext(CollapsibleContext);
    const triggerClass = rootClass ? `${rootClass}-trigger` : '';
    return <CollapsiblePrimitive.Trigger {...props} className={clsx(triggerClass, className)}>{children}</CollapsiblePrimitive.Trigger>;
};

export default CollapsibleTrigger;
