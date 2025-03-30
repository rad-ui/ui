import CollapsibleRoot from './fragments/CollapsibleRoot';
import CollapsibleTrigger from './fragments/CollapsibleTrigger';
import CollapsibleContent from './fragments/CollapsibleContent';

/*
 * CHECKLIST
 *
 * Add rtl and ltr support
 * Support animations
 * Support basic poitioning of button
 * Add title to collapsible
 *
 * */

const Collapsible = () => {
    console.warn('Direct usage of Tabs is not supported. Please use Tabs.Root, Tabs.List, etc. instead.');
    return null;
};

Collapsible.Root = CollapsibleRoot;
Collapsible.Trigger = CollapsibleTrigger;
Collapsible.Content = CollapsibleContent;

export default Collapsible;
