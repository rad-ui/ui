import React from 'react';
import CollapsibleContent from './fragments/CollapsibleContent';
import CollapsibleHeader from './fragments/CollapsibleHeader';
import CollapsibleItem from './fragments/CollapsibleItem';
import CollapsibleRoot from './fragments/CollapsibleRoot';
import CollapsibleTrigger from './fragments/CollapsibleTrigger';

// Empty props type - only supporting fragment exports for now
export type CollapsibleProps = React.HTMLAttributes<HTMLDivElement> & {
    children?: React.ReactNode;
};

// Minimal implementation - we're not supporting direct usage yet
const Collapsible = ({ children, ...props }: CollapsibleProps) => {
    console.warn('Direct usage of Collapsible is not supported yet. Please use Collapsible.Root, Collapsible.Header, etc. instead.');
    return <div {...props}>{children}</div>;
};

// Export fragments via direct assignment pattern
Collapsible.Root = CollapsibleRoot;
Collapsible.Header = CollapsibleHeader;
Collapsible.Trigger = CollapsibleTrigger;
Collapsible.Content = CollapsibleContent;
Collapsible.Item = CollapsibleItem;

export default Collapsible;
