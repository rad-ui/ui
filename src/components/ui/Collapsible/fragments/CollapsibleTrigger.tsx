import clsx from 'clsx';
import React, { useContext } from 'react';
import Primitive from '~/core/primitives/Primitive';
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
    const { rootClass, open, onOpenChange, disabled } = useContext(CollapsibleContext);

    const toggleCollapse = () => onOpenChange && !disabled && onOpenChange((p) => (!p));
    return (
        <Primitive.button
            className={clsx(`${rootClass}-trigger`, className)}
            role={'button'}
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleCollapse();
                }
            }}
            aria-expanded={open}
            onClick={toggleCollapse}
            {...props}

        >
            {children}
        </Primitive.button>
    );
};

export default CollapsibleTrigger;
