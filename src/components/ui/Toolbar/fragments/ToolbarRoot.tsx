'use client';
import React from 'react';
import { clsx } from 'clsx';
import { customClassSwitcher } from '~/core';
import Primitive from '~/core/primitives/Primitive';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import ToolbarRootContext from '../context/ToolbarRootContext';

const COMPONENT_NAME = 'Toolbar';

export type ToolbarRootProps = React.ComponentPropsWithoutRef<'div'> & {
  orientation?: 'horizontal' | 'vertical';
  loop?: boolean;
  dir?: 'ltr' | 'rtl';
  customRootClass?: string;
  asChild?: boolean;
};

const ToolbarRoot = React.forwardRef<HTMLDivElement, ToolbarRootProps>(
  (
    {
      orientation = 'horizontal',
      loop = false,
      dir = 'ltr',
      className = '',
      customRootClass = '',
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const rootClass = customClassSwitcher(customRootClass, COMPONENT_NAME);
    const context = React.useMemo(() => ({ rootClass, orientation, dir }), [rootClass, orientation, dir]);
    const dataAttributes: Record<string, string> = {
      'data-orientation': orientation as string
    };

    return (
      <ToolbarRootContext.Provider value={context}>
        <RovingFocusGroup.Root orientation={orientation} loop={loop} dir={dir}>
          <RovingFocusGroup.Group>
            <Primitive.div
              asChild={asChild}
              ref={ref}
              role="toolbar"
              aria-orientation={orientation === 'vertical' ? 'vertical' : undefined}
              dir={dir}
              className={clsx(rootClass, className)}
              {...dataAttributes}
              {...props}
            >
              {children}
            </Primitive.div>
          </RovingFocusGroup.Group>
        </RovingFocusGroup.Root>
      </ToolbarRootContext.Provider>
    );
  }
);

ToolbarRoot.displayName = COMPONENT_NAME;

export default ToolbarRoot;
