import React, { PropsWithChildren, ReactNode, useState } from 'react';
import ButtonPrimitive from '~/core/primitives/Button';

/*
 * CHECKLIST
 *
 * Add rtl and ltr support
 * Support animations
 * Support basic poitioning of button
 * Add title to collapsible
 *
 * */

export type CollapsibleProps = { open?: boolean, title?: string, trigger?: ReactNode} & PropsWithChildren;

const ExpandIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
    </svg>
);

const CollapseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" />
    </svg>
);

const Collapsible = ({ children, title, trigger, ...props }: CollapsibleProps) => {
    const [open, setOpen] = useState(props.open ?? true);

    const toggleCollapse = () => setOpen((p) => !p);

    return (
        <article>
            <span style={{ display: 'flex', alignItems: 'center' }}>
                {title && <p>{title}</p>}
                {
                    trigger ||
                    <ButtonPrimitive style={{ marginInlineStart: 'auto' }} onClick={toggleCollapse}>{open ? <CollapseIcon/> : <ExpandIcon/>}</ButtonPrimitive>
                }
            </span>

            <div
                aria-hidden={!open}
                style={{
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    height: (props.open ?? open) ? 'auto' : '0',
                    transition: 'all'
                }}>
                {children}
            </div>

        </article>
    );
};

export default Collapsible;
