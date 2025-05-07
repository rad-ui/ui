import CalloutRoot from './fragments/CalloutRoot';
import CalloutIcon from './fragments/CalloutIcon';
import CalloutText from './fragments/CalloutText';
const COMPONENT_NAME = 'Callout';

const Callout = () => {
    console.warn('Direct usage of Accordion is not supported. Please use Accordion.Root, Accordion.Item, etc. instead.');
    return null;
};

Callout.displayName = COMPONENT_NAME;

// Callout Exports
Callout.Root = CalloutRoot;
Callout.Icon = CalloutIcon;
Callout.Text = CalloutText;

export default Callout;
