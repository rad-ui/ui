'use client';

import React from 'react';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';
import { useCommandContext } from '../context/CommandContext';

type CommandSeparatorElement = React.ElementRef<typeof Primitive.div>;
export type CommandSeparatorProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;

const CommandSeparator = React.forwardRef<CommandSeparatorElement, CommandSeparatorProps>(({ className, ...props }, forwardedRef) => {
    const { rootClass, registerSeparator, getSeparatorVisible } = useCommandContext();
    const separatorId = React.useId();

    React.useEffect(() => {
        return registerSeparator(separatorId);
    }, [registerSeparator, separatorId]);

    const visible = getSeparatorVisible(separatorId);

    if (!visible) {
        return null;
    }

    return (
        <Primitive.div
            ref={forwardedRef}
            className={clsx(rootClass && `${rootClass}-separator`, className)}
            data-slot="command-separator"
            role="separator"
            {...props}
        />
    );
});

CommandSeparator.displayName = 'CommandSeparator';

export default CommandSeparator;
