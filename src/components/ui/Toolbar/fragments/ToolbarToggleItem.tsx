'use client';
import React from 'react';
import { clsx } from 'clsx';
import TogglePrimitive from '~/core/primitives/Toggle';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import ToolbarToggleGroupContext from '../context/ToolbarToggleGroupContext';

const COMPONENT_NAME = 'ToolbarToggleItem';

export type ToolbarToggleItemProps = React.ComponentPropsWithoutRef<typeof TogglePrimitive> & {
  value: any;
};

const ToolbarToggleItem = React.forwardRef<React.ElementRef<typeof TogglePrimitive>, ToolbarToggleItemProps>(
  ({ value, disabled = false, className = '', ...props }, ref) => {
    const context = React.useContext(ToolbarToggleGroupContext);
    if (!context) throw new Error('Toolbar.ToggleItem must be used within Toolbar.ToggleGroup');

    const isPressed = context.value.includes(value);
    const isDisabled = disabled || context.disabled;

    const handlePressedChange = (pressed: boolean) => {
      if (isDisabled) return;
      if (context.type === 'single') {
        context.setValue(pressed ? [value] : []);
        return;
      }

      if (pressed) {
        context.setValue([...context.value, value]);
        return;
      }

      context.setValue(context.value.filter((item) => item !== value));
    };

    return (
      <RovingFocusGroup.Item>
        <TogglePrimitive
          ref={ref}
          pressed={isPressed}
          disabled={isDisabled}
          onPressedChange={handlePressedChange}
          className={clsx(`${context.rootClass}-toggle-item`, className)}
          {...props}
        />
      </RovingFocusGroup.Item>
    );
  }
);

ToolbarToggleItem.displayName = COMPONENT_NAME;

export default ToolbarToggleItem;
