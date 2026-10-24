'use client';
import React from 'react';
import { clsx } from 'clsx';
import RovingFocusGroup from '~/core/utils/RovingFocusGroup';
import ToolbarRootContext from '../context/ToolbarRootContext';

const COMPONENT_NAME = 'ToolbarInput';

export type ToolbarInputProps = React.ComponentPropsWithoutRef<'input'>;

/**
 * A text field inside the toolbar, such as a search or a zoom level. It's one
 * stop in the toolbar's arrow-key navigation: ArrowLeft/ArrowRight move the
 * caret, and leave the field once the caret reaches its start or end.
 */
const ToolbarInput = React.forwardRef<HTMLInputElement, ToolbarInputProps>(
    ({ className = '', type = 'text', ...props }, ref) => {
        const context = React.useContext(ToolbarRootContext);
        if (!context) throw new Error('Toolbar.Input must be used within Toolbar.Root');
        const { rootClass } = context;

        return (
            <RovingFocusGroup.Item>
                <input
                    ref={ref}
                    type={type}
                    className={clsx(rootClass && `${rootClass}-input`, className)}
                    data-slot="toolbar-input"
                    {...props}
                />
            </RovingFocusGroup.Item>
        );
    }
);

ToolbarInput.displayName = COMPONENT_NAME;

export default ToolbarInput;
