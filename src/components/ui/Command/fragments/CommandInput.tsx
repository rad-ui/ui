'use client';

import React from 'react';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';
import { useCommandContext } from '../context/CommandContext';

type CommandInputElement = React.ElementRef<typeof Primitive.input>;

export type CommandInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> & {
    value?: string;
    onValueChange?: (value: string) => void;
};

const CommandInput = React.forwardRef<CommandInputElement, CommandInputProps>(({
    className,
    value,
    onValueChange,
    onKeyDown,
    ...props
}, forwardedRef) => {
    const {
        rootClass,
        label,
        listId,
        inputId,
        search,
        setSearch,
        moveActive,
        moveToBoundary,
        selectActiveItem
    } = useCommandContext();

    const currentValue = value ?? search;

    return (
        <Primitive.input
            ref={forwardedRef}
            type="text"
            id={inputId}
            className={clsx(rootClass && `${rootClass}-input`, className)}
            data-slot="command-input"
            role="combobox"
            aria-autocomplete="list"
            aria-controls={listId}
            aria-expanded="true"
            aria-label={label}
            value={currentValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const nextValue = event.currentTarget.value;
                if (value === undefined) {
                    setSearch(nextValue);
                }
                onValueChange?.(nextValue);
            }}
            onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                if (event.key === 'ArrowDown') {
                    event.preventDefault();
                    moveActive(1);
                }

                if (event.key === 'ArrowUp') {
                    event.preventDefault();
                    moveActive(-1);
                }

                if (event.key === 'Home') {
                    event.preventDefault();
                    moveToBoundary('start');
                }

                if (event.key === 'End') {
                    event.preventDefault();
                    moveToBoundary('end');
                }

                if (event.key === 'Enter') {
                    event.preventDefault();
                    selectActiveItem();
                }

                onKeyDown?.(event);
            }}
            {...props}
        />
    );
});

CommandInput.displayName = 'CommandInput';

export default CommandInput;
