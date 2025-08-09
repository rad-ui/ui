'use client';

import MinimapRoot from './fragments/MinimapRoot';
import MinimapItem from './fragments/MinimapItem';
import MinimapTrack from './fragments/MinimapTrack';
import MinimapLine from './fragments/MinimapLine';
import MinimapContent from './fragments/MinimapContent';
import MinimapBubble from './fragments/MinimapBubble';
import MinimapProvider from './fragments/MinimapProvider';
import MinimapWaypoint from './fragments/MinimapWaypoint';

const Minimap = () => {
    console.warn('Direct usage of Minimap is not supported. Please use Minimap.Root, Minimap.Item instead.');
    return null;
};

Minimap.Root = MinimapRoot;
Minimap.Item = MinimapItem;
Minimap.Track = MinimapTrack;
Minimap.Line = MinimapLine;
Minimap.Content = MinimapContent;
Minimap.Bubble = MinimapBubble;
Minimap.Provider = MinimapProvider;
Minimap.Waypoint = MinimapWaypoint;

export default Minimap;
