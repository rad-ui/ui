import React, { forwardRef } from 'react';
import ProgressRoot, {
    ProgressRootElement,
    ProgressRootProps
} from './fragments/ProgressRoot';
import ProgressIndicator from './fragments/ProgressIndicator';
import ProgressLabel from './fragments/ProgressLabel';
import ProgressValue from './fragments/ProgressValue';
import ProgressTrack from './fragments/ProgressTrack';

export const COMPONENT_NAME = 'Progress';

export type ProgressProps = ProgressRootProps;
type ProgressComponent = React.ForwardRefExoticComponent<
    ProgressProps & React.RefAttributes<ProgressRootElement>
> & {
    Root: typeof ProgressRoot;
    Indicator: typeof ProgressIndicator;
    Label: typeof ProgressLabel;
    Value: typeof ProgressValue;
    Track: typeof ProgressTrack;
};

const Progress = forwardRef<ProgressRootElement, ProgressProps>((props, ref) => {
    console.warn(
        'Direct usage of Progress is not supported. Please use Progress.Root, Progress.Indicator, etc. instead.'
    );
    return <ProgressRoot ref={ref} {...props} />;
}) as ProgressComponent;

Progress.displayName = COMPONENT_NAME;
Progress.Root = ProgressRoot;
Progress.Indicator = ProgressIndicator;
Progress.Label = ProgressLabel;
Progress.Value = ProgressValue;
Progress.Track = ProgressTrack;

export type { ProgressRootProps } from './fragments/ProgressRoot';
export type { ProgressIndicatorProps } from './fragments/ProgressIndicator';
export type { ProgressLabelProps } from './fragments/ProgressLabel';
export type { ProgressValueProps } from './fragments/ProgressValue';
export type { ProgressTrackProps } from './fragments/ProgressTrack';
// Named part exports let React Server Components use `import * as Progress from '@radui/ui/Progress'`;
// property access on the default export is undefined across the client boundary.
export {
    ProgressRoot as Root,
    ProgressIndicator as Indicator,
    ProgressLabel as Label,
    ProgressValue as Value,
    ProgressTrack as Track
};

export default Progress;
