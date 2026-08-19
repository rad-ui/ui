import { customClassSwitcher } from './customClassSwitcher';
import { composeRefs, mergeProps } from './utils/mergeProps';
import LiveRegion, { useAnnounce } from './utils/LiveRegion';

export { customClassSwitcher, composeRefs, mergeProps, LiveRegion, useAnnounce };
export type {
    LiveRegionElement,
    LiveRegionPoliteness,
    LiveRegionProps,
    UseAnnounceOptions,
    UseAnnounceReturn
} from './utils/LiveRegion';
