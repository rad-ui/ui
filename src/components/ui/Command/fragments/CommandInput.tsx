'use client';

import React from 'react';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';
import { KEYBOARD_KEYS } from '~/core/utils/keyboard';
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
                if (event.key === KEYBOARD_KEYS.ARROW_DOWN) {
                    event.preventDefault();
                    moveActive(1);
                }

                if (event.key === KEYBOARD_KEYS.ARROW_UP) {
                    event.preventDefault();
                    moveActive(-1);
                }

                if (event.key === KEYBOARD_KEYS.HOME) {
                    event.preventDefault();
                    moveToBoundary('start');
                }

                if (event.key === KEYBOARD_KEYS.END) {
                    event.preventDefault();
                    moveToBoundary('end');
                }

                if (event.key === KEYBOARD_KEYS.ENTER) {
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
