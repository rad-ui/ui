import React, { useState, useId } from 'react';
import Primitive from '~/core/primitives/Primitive';
import { CollapsiblePrimitiveContext } from '../contexts/CollapsiblePrimitiveContext';

export type CollapsiblePrimitiveRootProps = {
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
};

const CollapsiblePrimitiveRoot = ({
    children,
    defaultOpen = false,
    open: controlledOpen,
    onOpenChange,
    disabled = false,
    ...props
}: CollapsiblePrimitiveRootProps) => {
    const [uncontrolledOpen, setUncontrolledOpen] = useState<boolean>(defaultOpen);
    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : uncontrolledOpen;
    const contentId = useId();

    const handleOpenChange = (open: boolean) => {
        if (disabled) return;

        if (!isControlled) {
            setUncontrolledOpen(open);
        }
        onOpenChange?.(open);
    };

    return (
        <CollapsiblePrimitiveContext.Provider
            value={{
                open: isOpen,
                onOpenChange: handleOpenChange,
                disabled,
                contentId
            }}
        >
            <Primitive.div
                {...props}
                data-state={isOpen ? 'open' : 'closed'}
                data-disabled={disabled ? '' : undefined}
            >
                {children}
            </Primitive.div>
        </CollapsiblePrimitiveContext.Provider>
    );
};

export default CollapsiblePrimitiveRoot;
