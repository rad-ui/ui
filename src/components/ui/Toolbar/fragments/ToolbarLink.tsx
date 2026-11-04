'use client';
import React from 'react';
import { clsx } from 'clsx';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import Link, { LinkProps } from '~/components/ui/Link/Link';
import ToolbarRootContext from '../context/ToolbarRootContext';
import ToolbarGroupContext from '../context/ToolbarGroupContext';

const COMPONENT_NAME = 'ToolbarLink';

export type ToolbarLinkProps = LinkProps & {
  asChild?: boolean;
};

const ToolbarLink = React.forwardRef<React.ElementRef<typeof Link>, ToolbarLinkProps>(
    ({ className = '', asChild = false, href = '#', onClick, ...props }, ref) => {
        const group = React.useContext(ToolbarGroupContext);
        const context = React.useContext(ToolbarRootContext);
        if (!context) throw new Error('Toolbar.Link must be used within Toolbar.Root');
        const { rootClass } = context;

        return (
            <RovingFocusGroup.Item role="link">
                <Link
                    ref={ref}
                    asChild={asChild}
                    href={href}
                    className={clsx(rootClass && `${rootClass}-link`, className)}
                    {...props}
                    // Links can't be natively disabled: mark them and ignore activation.
                    aria-disabled={group.disabled || props['aria-disabled'] || undefined}
                    data-disabled={group.disabled ? '' : undefined}
                    onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
                        if (group.disabled) {
                            event.preventDefault();
                            return;
                        }
                        onClick?.(event);
                    }}
                />
            </RovingFocusGroup.Item>
        );
    }
);

ToolbarLink.displayName = COMPONENT_NAME;

export default ToolbarLink;
