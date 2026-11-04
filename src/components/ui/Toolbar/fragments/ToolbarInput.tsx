'use client';
import React from 'react';
import { clsx } from 'clsx';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import ToolbarRootContext from '../context/ToolbarRootContext';
import ToolbarGroupContext from '../context/ToolbarGroupContext';

const COMPONENT_NAME = 'ToolbarInput';

export type ToolbarInputProps = React.ComponentPropsWithoutRef<'input'> & {
    /** Keep a disabled input in the arrow-key order, read-only and announced as disabled. Defaults to false. */
    focusableWhenDisabled?: boolean;
};

/**
 * A text field inside the toolbar, such as a search or a zoom level. It's one
 * stop in the toolbar's arrow-key navigation: ArrowLeft/ArrowRight move the
 * caret, and leave the field once the caret reaches its start or end.
 */
const ToolbarInput = React.forwardRef<HTMLInputElement, ToolbarInputProps>(
    ({ className = '', type = 'text', disabled: disabledProp, focusableWhenDisabled = false, readOnly, ...props }, ref) => {
        const group = React.useContext(ToolbarGroupContext);
        const context = React.useContext(ToolbarRootContext);
        if (!context) throw new Error('Toolbar.Input must be used within Toolbar.Root');
        const { rootClass } = context;
        const disabled = disabledProp ?? (group.disabled || undefined);
        const softDisabled = Boolean(disabled && focusableWhenDisabled);

        return (
            <RovingFocusGroup.Item>
                <input
                    ref={ref}
                    type={type}
                    className={clsx(rootClass && `${rootClass}-input`, className)}
                    data-slot="toolbar-input"
                    disabled={softDisabled ? undefined : disabled}
                    readOnly={softDisabled || readOnly}
                    aria-disabled={softDisabled ? true : undefined}
                    data-disabled={disabled ? '' : undefined}
                    {...props}
                />
            </RovingFocusGroup.Item>
        );
    }
);

ToolbarInput.displayName = COMPONENT_NAME;

export default ToolbarInput;
