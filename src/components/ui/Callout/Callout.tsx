import CalloutRoot from './fragments/CalloutRoot';
import CalloutIcon from './fragments/CalloutIcon';
import CalloutText from './fragments/CalloutText';

const Callout = () => {
    console.warn('Direct usage of Callout is not supported. Please use Callout.Root, Callout.Icon, etc. instead.');
    return null;
};

// Callout Exports
Callout.Root = CalloutRoot;
Callout.Icon = CalloutIcon;
Callout.Text = CalloutText;

export type { CalloutRootProps } from './fragments/CalloutRoot';
export type { CalloutIconProps } from './fragments/CalloutIcon';
export type { CalloutTextProps } from './fragments/CalloutText';
// Named part exports let React Server Components use `import * as Callout from '@radui/ui/Callout'`;
// property access on the default export is undefined across the client boundary.
export {
    CalloutRoot as Root,
    CalloutIcon as Icon,
    CalloutText as Text
};

export default Callout;
