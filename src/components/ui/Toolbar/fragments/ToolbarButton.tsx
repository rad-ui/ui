'use client';
import React from 'react';
import { clsx } from 'clsx';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import Button, { ButtonProps } from '~/components/ui/Button/Button';
import ToolbarRootContext from '../context/ToolbarRootContext';

const COMPONENT_NAME = 'ToolbarButton';

const ToolbarButton = React.forwardRef<React.ElementRef<typeof Button>, ButtonProps>(
  ({ className = '', ...props }, ref) => {
    const context = React.useContext(ToolbarRootContext);
    if (!context) throw new Error('Toolbar.Button must be used within Toolbar.Root');
    const { rootClass } = context;

    return (
      <RovingFocusGroup.Item>
        <Button ref={ref} className={clsx(`${rootClass}-button`, className)} {...props} />
      </RovingFocusGroup.Item>
    );
  }
);

ToolbarButton.displayName = COMPONENT_NAME;

export default ToolbarButton;
