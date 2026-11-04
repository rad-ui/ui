'use client';
import React from 'react';
import { clsx } from 'clsx';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import ButtonPrimitive from '~/core/primitives/Button';
import ToolbarRootContext from '../context/ToolbarRootContext';
import ToolbarGroupContext from '../context/ToolbarGroupContext';

const COMPONENT_NAME = 'ToolbarButton';

export type ToolbarButtonProps = React.ComponentPropsWithoutRef<typeof ButtonPrimitive> & {
  asChild?: boolean;
  /**
   * Keep a disabled button in the arrow-key order (it announces as disabled and ignores presses),
   * so users can still find it. Defaults to false.
   */
  focusableWhenDisabled?: boolean;
};

const ToolbarButton = React.forwardRef<React.ElementRef<typeof ButtonPrimitive>, ToolbarButtonProps>(
    ({ className = '', asChild = false, type = 'button', disabled: disabledProp, focusableWhenDisabled = false, onClick, onKeyDown, ...props }, ref) => {
        const group = React.useContext(ToolbarGroupContext);
        const context = React.useContext(ToolbarRootContext);
        if (!context) throw new Error('Toolbar.Button must be used within Toolbar.Root');
        const { rootClass } = context;
        const disabled = disabledProp ?? (group.disabled || undefined);
        // Focusable while disabled: no native `disabled` (it would leave the arrow-key order),
        // so presses are blocked here instead.
        const softDisabled = Boolean(disabled && focusableWhenDisabled);

        return (
            <RovingFocusGroup.Item>
                <ButtonPrimitive
                    ref={ref}
                    className={clsx(rootClass && `${rootClass}-button`, className)}
                    asChild={asChild}
                    type={asChild ? undefined : type}
                    disabled={softDisabled ? undefined : disabled}
                    aria-disabled={softDisabled ? true : undefined}
                    data-disabled={disabled ? '' : undefined}
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                        if (softDisabled) {
                            event.preventDefault();
                            return;
                        }
                        onClick?.(event);
                    }}
                    onKeyDown={(event: React.KeyboardEvent<HTMLButtonElement>) => {
                        if (softDisabled && (event.key === 'Enter' || event.key === ' ')) {
                            event.preventDefault();
                            return;
                        }
                        onKeyDown?.(event);
                    }}
                    {...props}
                />
            </RovingFocusGroup.Item>
        );
    }
);

ToolbarButton.displayName = COMPONENT_NAME;

export default ToolbarButton;
