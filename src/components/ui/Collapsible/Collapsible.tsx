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
    console.warn('Direct usage of Collapsible is not supported. Please use Collapsible.Root, Collapsible.Trigger, etc. instead.');
    return null;
};

Collapsible.Root = CollapsibleRoot;
Collapsible.Trigger = CollapsibleTrigger;
Collapsible.Content = CollapsibleContent;

export type { CollapsibleRootProps } from './fragments/CollapsibleRoot';
export type { CollapsibleTriggerProps } from './fragments/CollapsibleTrigger';
export type { CollapsibleContentProps } from './fragments/CollapsibleContent';
// Named part exports let React Server Components use `import * as Collapsible from '@radui/ui/Collapsible'`;
// property access on the default export is undefined across the client boundary.
export {
    CollapsibleRoot as Root,
    CollapsibleTrigger as Trigger,
    CollapsibleContent as Content
};

export default Collapsible;
