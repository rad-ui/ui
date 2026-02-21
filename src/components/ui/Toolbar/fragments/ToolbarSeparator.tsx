'use client';
import React from 'react';
import { clsx } from 'clsx';
import Separator, { SeparatorProps } from '~/components/ui/Separator/Separator';
import ToolbarRootContext from '../context/ToolbarRootContext';

const COMPONENT_NAME = 'ToolbarSeparator';

const ToolbarSeparator = React.forwardRef<React.ElementRef<typeof Separator>, SeparatorProps>(
  ({ className = '', orientation, ...props }, ref) => {
    const context = React.useContext(ToolbarRootContext);
    if (!context) throw new Error('Toolbar.Separator must be used within Toolbar.Root');
    const { rootClass, orientation: rootOrientation } = context;
    const separatorOrientation = orientation ?? (rootOrientation === 'horizontal' ? 'vertical' : 'horizontal');

    return (
      <Separator
        ref={ref}
        {...props}
        decorative
        orientation={separatorOrientation}
        className={clsx(`${rootClass}-separator`, className)}
      />
    );
  }
);

ToolbarSeparator.displayName = COMPONENT_NAME;

export default ToolbarSeparator;
