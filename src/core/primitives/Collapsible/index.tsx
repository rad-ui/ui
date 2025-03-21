import React from 'react';
import CollapsibleRoot from './fragments/CollapsibleRoot';
import CollapsibleContent from './fragments/CollapsibleContent';
import CollapsibleTrigger from './fragments/CollapsibleTrigger';

// Re-export component types
export type { CollapsibleRootProps } from './fragments/CollapsibleRoot';
export type { CollapsibleContentProps } from './fragments/CollapsibleContent';
export type { CollapsibleTriggerProps } from './fragments/CollapsibleTrigger';

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
CollapsiblePrimitive.Root = CollapsibleRoot;
CollapsiblePrimitive.Content = CollapsibleContent;
CollapsiblePrimitive.Trigger = CollapsibleTrigger;

export default CollapsiblePrimitive;
