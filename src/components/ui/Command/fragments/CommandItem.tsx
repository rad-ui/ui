'use client';

import React from 'react';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';
import { composeRefs } from '~/core/utils/mergeProps';
import { isActivationKey } from '~/core/utils/keyboard';
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
    onKeyDown,
    ...props
}, forwardedRef) => {
    const {
        registerItem,
        updateItem,
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

        // Fall back to the rendered text so items with icons or markup still filter by what users see.
        const text = getNodeText(children).trim();
        return text.length > 0 ? text : localId;
    }, [children, localId, value]);

    // Keep the latest onSelect without re-registering: re-registration on every parent render would
    // move the item to the end of the registration order and break separator visibility.
    const onSelectRef = React.useRef(onSelect);
    onSelectRef.current = onSelect;
    const handleSelect = React.useCallback((selectedValue: string) => {
        onSelectRef.current?.(selectedValue);
    }, []);

    const itemRecord = React.useMemo(() => ({
        id: localId,
        value: inferredValue,
        keywords: normalizedKeywords,
        disabled,
        forceMount,
        groupId,
        ref: itemRef,
        onSelect: handleSelect
    }), [disabled, forceMount, groupId, handleSelect, inferredValue, localId, normalizedKeywords]);

    const itemRecordRef = React.useRef(itemRecord);
    itemRecordRef.current = itemRecord;

    React.useEffect(() => {
        return registerItem(itemRecordRef.current);
    }, [localId, registerItem]);

    const isFirstRecordRef = React.useRef(true);
    React.useEffect(() => {
        if (isFirstRecordRef.current) {
            isFirstRecordRef.current = false;
            return;
        }
        updateItem(localId, itemRecord);
    }, [itemRecord, localId, updateItem]);

    const { active, visible, selected } = getItemState(localId);

    if (!visible && !forceMount) {
        return null;
    }

    return (
        <Primitive.div
            ref={composeRefs(itemRef, forwardedRef)}
            id={localId}
            className={clsx(rootItemClassName(rootClass), className)}
            data-slot="command-item"
            data-disabled={disabled ? '' : undefined}
            data-selected={selected ? '' : undefined}
            data-value={inferredValue}
            role="option"
            aria-disabled={disabled || undefined}
            aria-selected={selected}
            // Focus stays in Command.Input (aria-activedescendant), so options are not tab stops.
            tabIndex={-1}
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

                if (isActivationKey(event.key)) {
                    event.preventDefault();
                    onSelect?.(inferredValue);
                }
                onKeyDown?.(event);
            }}
            {...props}
        >
            {children}
        </Primitive.div>
    );
});

function getNodeText(node: React.ReactNode): string {
    if (typeof node === 'string' || typeof node === 'number') {
        return String(node);
    }

    if (Array.isArray(node)) {
        return node.map(getNodeText).join(' ');
    }

    if (React.isValidElement(node)) {
        return getNodeText((node.props as { children?: React.ReactNode }).children);
    }

    return '';
}

const rootItemClassName = (rootClass: string) => rootClass ? `${rootClass}-item` : undefined;

CommandItem.displayName = 'CommandItem';

export default CommandItem;
