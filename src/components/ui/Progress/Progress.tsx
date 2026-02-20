import React, { forwardRef } from 'react';
import ProgressRoot, {
    ProgressRootElement,
    ProgressRootProps
} from './fragments/ProgressRoot';
import ProgressIndicator from './fragments/ProgressIndicator';

export const COMPONENT_NAME = 'Progress';

export type ProgressProps = ProgressRootProps;
type ProgressComponent = React.ForwardRefExoticComponent<
    ProgressProps & React.RefAttributes<ProgressRootElement>
> & {
    Root: typeof ProgressRoot;
    Indicator: typeof ProgressIndicator;
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

export default Progress;
