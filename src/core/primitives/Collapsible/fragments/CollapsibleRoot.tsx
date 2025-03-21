import React, { useState } from 'react';
import Primitive from '~/core/primitives/Primitive';

export interface CollapsibleRootProps {
  /**
   * Whether the collapsible is open by default (uncontrolled)
   */
  defaultOpen?: boolean;
  /**
   * Controls the open state (controlled)
   */
  open?: boolean;
  /**
   * Callback fired when the open state changes
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Content to be rendered inside the collapsible
   */
  children?: React.ReactNode;
  /**
   * Disables the collapsible
   */
  disabled?: boolean;
  /**
   * CSS class name for custom styling
   */
  className?: string;
  /**
   * Additional props to be spread on the root element
   */
  [key: string]: any;
}

const CollapsibleRoot = ({
    children,
    defaultOpen = false,
    open: controlledOpen,
    onOpenChange,
    disabled = false,
    ...props
}: CollapsibleRootProps) => {
    const [uncontrolledOpen, setUncontrolledOpen] = useState<boolean>(defaultOpen);
    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

    const toggleCollapsible = () => {
        if (disabled) return;

        const newOpenState = !isOpen;
        if (!isControlled) {
            setUncontrolledOpen(newOpenState);
        }
        onOpenChange?.(newOpenState);
    };

    return (
        <Primitive.div
            {...props}
            data-state={isOpen ? 'open' : 'closed'}
            data-disabled={disabled ? '' : undefined}
        >
            {children}
        </Primitive.div>
    );
};

export default CollapsibleRoot;
