'use client';

import React from 'react';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';
import { composeRefs } from '~/core/utils/mergeProps';
import { useCommandContext } from '../context/CommandContext';
import { useCommandGroupContext } from '../context/CommandGroupContext';

type CommandItemElement = React.ElementRef<typeof Primitive.div>;

export type CommandItemProps = React.HTMLAttributes<HTMLDivElement> & {
    value?: string;
    keywords?: string[];
    onSelect?: (value: string) => void;
    disabled?: boolean;
    forceMount?: boolean;
};

const CommandItem = React.forwardRef<CommandItemElement, CommandItemProps>(({
    children,
    className,
    value,
    keywords,
    onSelect,
    disabled = false,
    forceMount = false,
    onMouseMove,
    onClick,
    ...props
}, forwardedRef) => {
    const {
        registerItem,
        setActiveItemId,
        getItemState,
        rootClass
    } = useCommandContext();
    const groupId = useCommandGroupContext();
    const localId = React.useId();
    const itemRef = React.useRef<HTMLDivElement | null>(null);
    const normalizedKeywords = React.useMemo(() => keywords ?? [], [keywords]);

    const inferredValue = React.useMemo(() => {
        if (typeof value === 'string' && value.length > 0) {
            return value;
        }

        if (typeof children === 'string' || typeof children === 'number') {
            return String(children);
        }

        return localId;
    }, [children, localId, value]);

    React.useEffect(() => {
        return registerItem({
            id: localId,
            value: inferredValue,
            keywords: normalizedKeywords,
            disabled,
            forceMount,
            groupId,
            ref: itemRef,
            onSelect
        });
    }, [disabled, forceMount, groupId, inferredValue, localId, normalizedKeywords, onSelect, registerItem]);

    const { active, visible, selected } = getItemState(localId);

    if (!visible && !forceMount) {
        return null;
    }

    return (
        <Primitive.div
            ref={composeRefs(itemRef, forwardedRef)}
            className={clsx(rootItemClassName(rootClass), className)}
            data-slot="command-item"
            data-disabled={disabled ? '' : undefined}
            data-selected={selected ? '' : undefined}
            data-value={inferredValue}
            role="option"
            aria-disabled={disabled || undefined}
            aria-selected={selected}
            tabIndex={disabled ? -1 : 0}
            hidden={!visible}
            onMouseMove={(event: React.MouseEvent<HTMLDivElement>) => {
                if (!disabled) {
                    setActiveItemId(localId);
                }
                onMouseMove?.(event);
            }}
            onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                if (!disabled) {
                    setActiveItemId(localId);
                    onSelect?.(inferredValue);
                }
                onClick?.(event);
            }}
            onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
                if (disabled) {
                    return;
                }

                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onSelect?.(inferredValue);
                }
            }}
            {...props}
        >
            {children}
        </Primitive.div>
    );
});

const rootItemClassName = (rootClass: string) => rootClass ? `${rootClass}-item` : undefined;

CommandItem.displayName = 'CommandItem';

export default CommandItem;
