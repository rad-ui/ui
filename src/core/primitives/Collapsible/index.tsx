import React from 'react';
import CollapsiblePrimitiveRoot from './fragments/CollapsiblePrimitiveRoot';
import CollapsiblePrimitiveContent from './fragments/CollapsiblePrimitiveContent';
import CollapsiblePrimitiveTrigger from './fragments/CollapsiblePrimitiveTrigger';

// Re-export component types
export type { CollapsiblePrimitiveRootProps } from './fragments/CollapsiblePrimitiveRoot';
export type { CollapsiblePrimitiveContentProps } from './fragments/CollapsiblePrimitiveContent';
export type { CollapsiblePrimitiveTriggerProps } from './fragments/CollapsiblePrimitiveTrigger';

// Empty props type - only supporting fragment exports
export type CollapsiblePrimitiveProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
};

// Empty implementation - we don't support direct usage
const CollapsiblePrimitive = () => {
    console.warn('Direct usage of CollapsiblePrimitive is not supported. Please use CollapsiblePrimitive.Root, CollapsiblePrimitive.Content, etc. instead.');
    return null;
};

// Export fragments via direct assignment pattern
CollapsiblePrimitive.Root = CollapsiblePrimitiveRoot;
CollapsiblePrimitive.Content = CollapsiblePrimitiveContent;
CollapsiblePrimitive.Trigger = CollapsiblePrimitiveTrigger;

export default CollapsiblePrimitive;
