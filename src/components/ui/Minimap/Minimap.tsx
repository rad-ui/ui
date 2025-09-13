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

export default Minimap;
