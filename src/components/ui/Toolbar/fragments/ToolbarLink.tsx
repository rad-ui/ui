'use client';
import React from 'react';
import { clsx } from 'clsx';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import Link, { LinkProps } from '~/components/ui/Link/Link';
import ToolbarRootContext from '../context/ToolbarRootContext';

const COMPONENT_NAME = 'ToolbarLink';

const ToolbarLink = React.forwardRef<React.ElementRef<typeof Link>, LinkProps>(
  ({ className = '', ...props }, ref) => {
    const context = React.useContext(ToolbarRootContext);
    if (!context) throw new Error('Toolbar.Link must be used within Toolbar.Root');
    const { rootClass } = context;

    return (
      <RovingFocusGroup.Item role="link">
        <Link ref={ref} className={clsx(`${rootClass}-link`, className)} {...props} />
      </RovingFocusGroup.Item>
    );
  }
);

ToolbarLink.displayName = COMPONENT_NAME;

export default ToolbarLink;
