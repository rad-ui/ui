'use client';

import ScrollAreaRoot from './fragments/ScrollAreaRoot';
import ScrollAreaViewport from './fragments/ScrollAreaViewport';
import ScrollAreaScrollbar from './fragments/ScrollAreaScrollbar';
import ScrollAreaThumb from './fragments/ScrollAreaThumb';
import ScrollAreaCorner from './fragments/ScrollAreaCorner';

// Empty implementation - we don't support direct usage
const ScrollArea = () => {
    console.warn('Direct usage of ScrollArea is not supported. Please use ScrollArea.Root and ScrollArea.Viewport instead.');
    return null;
};

// Export fragments via direct assignment pattern
ScrollArea.Root = ScrollAreaRoot;
ScrollArea.Viewport = ScrollAreaViewport;
ScrollArea.Scrollbar = ScrollAreaScrollbar;
ScrollArea.Thumb = ScrollAreaThumb;
ScrollArea.Corner = ScrollAreaCorner;

export default ScrollArea;
