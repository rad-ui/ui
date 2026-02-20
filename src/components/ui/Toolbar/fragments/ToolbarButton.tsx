'use client';
import React from 'react';
import { clsx } from 'clsx';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import ButtonPrimitive from '~/core/primitives/Button';
import ToolbarRootContext from '../context/ToolbarRootContext';

const COMPONENT_NAME = 'ToolbarButton';

export type ToolbarButtonProps = React.ComponentPropsWithoutRef<typeof ButtonPrimitive> & {
  asChild?: boolean;
};

const ToolbarButton = React.forwardRef<React.ElementRef<typeof ButtonPrimitive>, ToolbarButtonProps>(
  ({ className = '', asChild = false, type = 'button', ...props }, ref) => {
    const context = React.useContext(ToolbarRootContext);
    if (!context) throw new Error('Toolbar.Button must be used within Toolbar.Root');
    const { rootClass } = context;

    return (
      <RovingFocusGroup.Item>
        <ButtonPrimitive
          ref={ref}
          className={clsx(`${rootClass}-button`, className)}
          asChild={asChild}
          type={asChild ? undefined : type}
          {...props}
        />
      </RovingFocusGroup.Item>
    );
  }
);

ToolbarButton.displayName = COMPONENT_NAME;

export default ToolbarButton;
