'use client';

import React from 'react';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';
import { useCommandContext } from '../context/CommandContext';

type CommandShortcutElement = React.ElementRef<typeof Primitive.span>;
export type CommandShortcutProps = React.ComponentPropsWithoutRef<typeof Primitive.span>;

const CommandShortcut = React.forwardRef<CommandShortcutElement, CommandShortcutProps>(({ className, ...props }, forwardedRef) => {
    const { rootClass } = useCommandContext();

    return (
        <Primitive.span
            ref={forwardedRef}
            className={clsx(rootClass && `${rootClass}-shortcut`, className)}
            data-slot="command-shortcut"
            {...props}
        />
    );
});

CommandShortcut.displayName = 'CommandShortcut';

export default CommandShortcut;
