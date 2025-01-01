import CollapsibleContent from './fragments/CollapsibleContent';
import CollapsibleHeader from './fragments/CollapsibleHeader';
import CollapsibleItem from './fragments/CollapsibleItem';
import CollapsibleRoot from './fragments/CollapsibleRoot';
import CollapsibleTrigger from './fragments/CollapsibleTrigger';

const CollapsibleComponent = {
    Root: CollapsibleRoot,
    Header: CollapsibleHeader,
    Trigger: CollapsibleTrigger,
    Content: CollapsibleContent,
    Item: CollapsibleItem
} as const;

export default CollapsibleComponent;
