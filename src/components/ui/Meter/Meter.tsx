import React, { forwardRef } from 'react';
import MeterRoot, {
    MeterRootElement,
    MeterRootProps
} from './fragments/MeterRoot';
import MeterIndicator from './fragments/MeterIndicator';

export const COMPONENT_NAME = 'Meter';

export type MeterProps = MeterRootProps;
type MeterComponent = React.ForwardRefExoticComponent<
    MeterProps & React.RefAttributes<MeterRootElement>
> & {
    Root: typeof MeterRoot;
    Indicator: typeof MeterIndicator;
};

const Meter = forwardRef<MeterRootElement, MeterProps>((props, ref) => {
    return <MeterRoot ref={ref} {...props} />;
}) as MeterComponent;

Meter.displayName = COMPONENT_NAME;
Meter.Root = MeterRoot;
Meter.Indicator = MeterIndicator;

export type { MeterRootProps } from './fragments/MeterRoot';
export type { MeterIndicatorProps } from './fragments/MeterIndicator';

// Named part exports let React Server Components use `import * as Meter from '@radui/ui/Meter'`;
// property access on the default export is undefined across the client boundary.
export {
    MeterRoot as Root,
    MeterIndicator as Indicator
};

export default Meter;
