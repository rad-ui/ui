'use client';
import React from 'react';
import { clsx } from 'clsx';
import useControllableState from '~/core/hooks/useControllableState';
import ToolbarRootContext from '../context/ToolbarRootContext';
import ToolbarToggleGroupContext, { ToolbarToggleGroupType } from '../context/ToolbarToggleGroupContext';

const COMPONENT_NAME = 'ToolbarToggleGroup';

export type ToolbarToggleGroupProps = React.ComponentPropsWithoutRef<'div'> & {
  type?: ToolbarToggleGroupType;
  value?: any;
  defaultValue?: any;
  onValueChange?: (value: any) => void;
  disabled?: boolean;
};

const ToolbarToggleGroup = React.forwardRef<HTMLDivElement, ToolbarToggleGroupProps>(
  (
    {
      type = 'single',
      value,
      defaultValue = [],
      onValueChange,
      disabled = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const toolbarContext = React.useContext(ToolbarRootContext);
    if (!toolbarContext) throw new Error('Toolbar.ToggleGroup must be used within Toolbar.Root');

    const [activeValues, setActiveValues] = useControllableState(value, defaultValue, onValueChange);
    const normalizedValue = React.useMemo(() => {
      if (!Array.isArray(activeValues)) {
        return activeValues ? [activeValues] : [];
      }
      return activeValues;
    }, [activeValues]);

    const contextValue = React.useMemo(
      () => ({
        type,
        value: normalizedValue,
        setValue: setActiveValues,
        rootClass: toolbarContext.rootClass,
        disabled
      }),
      [type, normalizedValue, setActiveValues, toolbarContext.rootClass, disabled]
    );

    return (
      <ToolbarToggleGroupContext.Provider value={contextValue}>
        <div
          ref={ref}
          {...props}
          role="group"
          className={clsx(`${toolbarContext.rootClass}-toggle-group`, className)}
        >
          {children}
        </div>
      </ToolbarToggleGroupContext.Provider>
    );
  }
);

ToolbarToggleGroup.displayName = COMPONENT_NAME;

export default ToolbarToggleGroup;
