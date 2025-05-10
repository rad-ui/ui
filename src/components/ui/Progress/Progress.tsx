import ProgressRoot from './fragments/ProgressRoot';
import ProgressIndicator from './fragments/ProgressIndicator';

export const COMPONENT_NAME = 'Progress';

function Progress() {
    console.warn('Direct usage of Progress is not supported. Please use Progress.Root, Progress.Indicator, etc. instead.');
    return null;
}

Progress.Root = ProgressRoot;
Progress.Indicator = ProgressIndicator;

export default Progress;
