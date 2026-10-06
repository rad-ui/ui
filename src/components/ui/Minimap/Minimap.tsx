'use client';

import MinimapRoot from './fragments/MinimapRoot';
import MinimapItem from './fragments/MinimapItem';
import MinimapTrack from './fragments/MinimapTrack';
import MinimapLine from './fragments/MinimapLine';
import MinimapContent from './fragments/MinimapContent';
import MinimapBubble from './fragments/MinimapBubble';
import MinimapProvider from './fragments/MinimapProvider';
import MinimapWaypoint from './fragments/MinimapWaypoint';

const MinimapComponent = () => {
    console.warn('Direct usage of Minimap is not supported. Please use Minimap.Root, Minimap.Item instead.');
    return null;
};

type MinimapComponentType = typeof MinimapComponent & {
    Root: typeof MinimapRoot;
    Item: typeof MinimapItem;
    Track: typeof MinimapTrack;
    Line: typeof MinimapLine;
    Content: typeof MinimapContent;
    Bubble: typeof MinimapBubble;
    Provider: typeof MinimapProvider;
    Waypoint: typeof MinimapWaypoint;
};

const Minimap = Object.assign(MinimapComponent, {
    Root: MinimapRoot,
    Item: MinimapItem,
    Track: MinimapTrack,
    Line: MinimapLine,
    Content: MinimapContent,
    Bubble: MinimapBubble,
    Provider: MinimapProvider,
    Waypoint: MinimapWaypoint
}) as MinimapComponentType;

export type { MinimapRootProps } from './fragments/MinimapRoot';
export type { MinimapItemProps } from './fragments/MinimapItem';
export type { MinimapTrackProps } from './fragments/MinimapTrack';
export type { MinimapLineProps } from './fragments/MinimapLine';
export type { MinimapContentProps } from './fragments/MinimapContent';
export type { MinimapBubbleProps } from './fragments/MinimapBubble';
export type { MinimapProviderProps } from './fragments/MinimapProvider';
export type { MinimapWaypointProps } from './fragments/MinimapWaypoint';
// Named part exports let React Server Components use `import * as Minimap from '@radui/ui/Minimap'`;
// property access on the default export is undefined across the client boundary.
export {
    MinimapRoot as Root,
    MinimapItem as Item,
    MinimapTrack as Track,
    MinimapLine as Line,
    MinimapContent as Content,
    MinimapBubble as Bubble,
    MinimapProvider as Provider,
    MinimapWaypoint as Waypoint
};

export default Minimap;
