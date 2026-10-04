'use client';

import React from 'react';
import clsx from 'clsx';
import Primitive from '~/core/primitives/Primitive';
import { useCommandContext } from '../context/CommandContext';
import { mergeRefs } from '~/core/utils/mergeRefs';

type CommandEmptyElement = React.ElementRef<typeof Primitive.div>;
export type CommandEmptyProps = React.ComponentPropsWithoutRef<typeof Primitive.div> & {
    forceMount?: boolean;
};

const CommandEmpty = React.forwardRef<CommandEmptyElement, CommandEmptyProps>(({ className, forceMount = false, children, ...props }, forwardedRef) => {
    const { rootClass, visibleItemCount, setEmptyAnnouncement } = useCommandContext();
    const visible = forceMount || visibleItemCount === 0;
    const elementRef = React.useRef<HTMLDivElement | null>(null);

    // The empty message is announced by the root's persistent live region, which sits outside
    // the listbox; this element stays presentational so it is a valid listbox child.
    React.useEffect(() => {
        const isEmpty = visibleItemCount === 0;
        setEmptyAnnouncement(isEmpty ? elementRef.current?.textContent?.trim() ?? '' : '');
    }, [visibleItemCount, children, setEmptyAnnouncement]);

    React.useEffect(() => () => setEmptyAnnouncement(''), [setEmptyAnnouncement]);

    if (!visible) return null;

    return (
        <Primitive.div
            ref={mergeRefs(forwardedRef, elementRef)}
            className={clsx(rootClass && `${rootClass}-empty`, className)}
            data-slot="command-empty"
            data-state="visible"
            role="presentation"
            aria-hidden="true"
            {...props}
        >
            {children}
        </Primitive.div>
    );
});

CommandEmpty.displayName = 'CommandEmpty';

export default CommandEmpty;
