import React, { forwardRef } from 'react';
import MeterRoot, {
    MeterRootElement,
    MeterRootProps
} from './fragments/MeterRoot';
import MeterIndicator from './fragments/MeterIndicator';
import MeterLabel from './fragments/MeterLabel';
import MeterValue from './fragments/MeterValue';
import MeterTrack from './fragments/MeterTrack';

export const COMPONENT_NAME = 'Meter';

export type MeterProps = MeterRootProps;
type MeterComponent = React.ForwardRefExoticComponent<
    MeterProps & React.RefAttributes<MeterRootElement>
> & {
    Root: typeof MeterRoot;
    Indicator: typeof MeterIndicator;
    Label: typeof MeterLabel;
    Value: typeof MeterValue;
    Track: typeof MeterTrack;
};

const Meter = forwardRef<MeterRootElement, MeterProps>((props, ref) => {
    return <MeterRoot ref={ref} {...props} />;
}) as MeterComponent;

Meter.displayName = COMPONENT_NAME;
Meter.Root = MeterRoot;
Meter.Indicator = MeterIndicator;
Meter.Label = MeterLabel;
Meter.Value = MeterValue;
Meter.Track = MeterTrack;

export type { MeterRootProps } from './fragments/MeterRoot';
export type { MeterIndicatorProps } from './fragments/MeterIndicator';
export type { MeterLabelProps } from './fragments/MeterLabel';
export type { MeterValueProps } from './fragments/MeterValue';
export type { MeterTrackProps } from './fragments/MeterTrack';

// Named part exports let React Server Components use `import * as Meter from '@radui/ui/Meter'`;
// property access on the default export is undefined across the client boundary.
export {
    MeterRoot as Root,
    MeterIndicator as Indicator,
    MeterLabel as Label,
    MeterValue as Value,
    MeterTrack as Track
};

export default Meter;
