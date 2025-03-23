import React from 'react';
import CollapsibleContent from './fragments/CollapsibleContent';
import CollapsibleHeader from './fragments/CollapsibleHeader';
import CollapsibleItem from './fragments/CollapsibleItem';
import CollapsibleRoot from './fragments/CollapsibleRoot';
import CollapsibleTrigger from './fragments/CollapsibleTrigger';

// Empty props type - only supporting fragment exports
export type CollapsibleProps = React.HTMLAttributes<HTMLDivElement> & {
    children?: React.ReactNode;
};

// Empty implementation - we don't support direct usage
const Collapsible = () => {
    console.warn('Direct usage of Collapsible is not supported. Please use Collapsible.Root, Collapsible.Header, etc. instead.');
    return null;
};

// Export fragments via direct assignment pattern
Collapsible.Root = CollapsibleRoot;
Collapsible.Header = CollapsibleHeader;
Collapsible.Trigger = CollapsibleTrigger;
Collapsible.Content = CollapsibleContent;
Collapsible.Item = CollapsibleItem;

export default Collapsible;
