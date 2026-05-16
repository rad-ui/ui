'use client';

import React from 'react';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';
import { useCommandContext } from '../context/CommandContext';

type CommandListElement = React.ElementRef<typeof Primitive.div>;
export type CommandListProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;

const CommandList = React.forwardRef<CommandListElement, CommandListProps>(({ className, ...props }, forwardedRef) => {
    const { rootClass, listId, label } = useCommandContext();

    return (
        <Primitive.div
            ref={forwardedRef}
            id={listId}
            className={clsx(rootClass && `${rootClass}-list`, className)}
            data-slot="command-list"
            role="listbox"
            aria-label={label}
            {...props}
        />
    );
});

CommandList.displayName = 'CommandList';

export default CommandList;
