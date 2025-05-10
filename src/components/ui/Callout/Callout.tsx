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

export default Callout;
