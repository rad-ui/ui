'use client';

import React from 'react';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';
import { useCommandContext } from '../context/CommandContext';

type CommandEmptyElement = React.ElementRef<typeof Primitive.div>;
export type CommandEmptyProps = React.ComponentPropsWithoutRef<typeof Primitive.div> & {
    forceMount?: boolean;
};

const CommandEmpty = React.forwardRef<CommandEmptyElement, CommandEmptyProps>(({ className, forceMount = false, ...props }, forwardedRef) => {
    const { rootClass, visibleItemCount } = useCommandContext();
    const visible = forceMount || visibleItemCount === 0;

    if (!visible && !forceMount) {
        return null;
    }

    return (
        <Primitive.div
            ref={forwardedRef}
            className={clsx(rootClass && `${rootClass}-empty`, className)}
            data-slot="command-empty"
            role="status"
            hidden={!visible}
            {...props}
        />
    );
});

CommandEmpty.displayName = 'CommandEmpty';

export default CommandEmpty;
