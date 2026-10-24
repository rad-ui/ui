'use client';
import React from 'react';
import { clsx } from 'clsx';
import Primitive from '~/core/primitives/Primitive';
import ToolbarRootContext from '../context/ToolbarRootContext';
import ToolbarGroupContext from '../context/ToolbarGroupContext';

const COMPONENT_NAME = 'ToolbarGroup';

export type ToolbarGroupProps = React.ComponentPropsWithoutRef<typeof Primitive.div> & {
  /** Disables every button, link and toggle item inside the group. */
  disabled?: boolean;
};

/** Groups related toolbar items (name it with aria-label). Arrow keys still move across groups. */
const ToolbarGroup = React.forwardRef<React.ElementRef<'div'>, ToolbarGroupProps>(
    ({ className = '', disabled = false, ...props }, ref) => {
        const context = React.useContext(ToolbarRootContext);
        if (!context) throw new Error('Toolbar.Group must be used within Toolbar.Root');
        const { rootClass, orientation } = context;
        const groupContext = React.useMemo(() => ({ disabled }), [disabled]);

        return (
            <ToolbarGroupContext.Provider value={groupContext}>
                <Primitive.div
                    ref={ref}
                    role="group"
                    data-slot="toolbar-group"
                    data-orientation={orientation}
                    data-disabled={disabled ? '' : undefined}
                    className={clsx(rootClass && `${rootClass}-group`, className)}
                    {...props}
                />
            </ToolbarGroupContext.Provider>
        );
    }
);

ToolbarGroup.displayName = COMPONENT_NAME;

export default ToolbarGroup;
