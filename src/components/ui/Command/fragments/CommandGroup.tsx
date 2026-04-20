'use client';

import React from 'react';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';
import { useCommandContext } from '../context/CommandContext';
import { CommandGroupContext } from '../context/CommandGroupContext';

type CommandGroupElement = React.ElementRef<typeof Primitive.div>;

export type CommandGroupProps = React.ComponentPropsWithoutRef<typeof Primitive.div> & {
    heading?: React.ReactNode;
    forceMount?: boolean;
};

const CommandGroup = React.forwardRef<CommandGroupElement, CommandGroupProps>(({
    children,
    className,
    heading,
    forceMount = false,
    ...props
}, forwardedRef) => {
    const { rootClass, getVisibleGroupItemCount } = useCommandContext();
    const groupId = React.useId();
    const headingId = React.useId();
    const visibleCount = getVisibleGroupItemCount(groupId);
    const visible = forceMount || visibleCount > 0;

    return (
        <CommandGroupContext.Provider value={groupId}>
            <Primitive.div
                ref={forwardedRef}
                className={clsx(rootClass && `${rootClass}-group`, className)}
                data-slot="command-group"
                role="presentation"
                hidden={!visible}
                {...props}
            >
                {heading ? (
                    <Primitive.div
                        className={rootClass ? `${rootClass}-group-heading` : undefined}
                        data-slot="command-group-heading"
                        id={headingId}
                    >
                        {heading}
                    </Primitive.div>
                ) : null}
                <Primitive.div
                    className={rootClass ? `${rootClass}-group-items` : undefined}
                    data-slot="command-group-items"
                    role="group"
                    aria-labelledby={heading ? headingId : undefined}
                >
                    {children}
                </Primitive.div>
            </Primitive.div>
        </CommandGroupContext.Provider>
    );
});

CommandGroup.displayName = 'CommandGroup';

export default CommandGroup;
