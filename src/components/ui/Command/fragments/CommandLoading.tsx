'use client';

import React from 'react';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';
import { useCommandContext } from '../context/CommandContext';

type CommandLoadingElement = React.ElementRef<typeof Primitive.div>;
export type CommandLoadingProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;

const CommandLoading = React.forwardRef<CommandLoadingElement, CommandLoadingProps>(({ className, ...props }, forwardedRef) => {
    const { rootClass } = useCommandContext();

    return (
        <Primitive.div
            ref={forwardedRef}
            className={clsx(rootClass && `${rootClass}-loading`, className)}
            data-slot="command-loading"
            aria-live="polite"
            aria-busy="true"
            {...props}
        />
    );
});

CommandLoading.displayName = 'CommandLoading';

export default CommandLoading;
