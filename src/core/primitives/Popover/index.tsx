'use client';

import PopoverPrimitiveRoot from './fragments/PopoverPrimitiveRoot';
import PopoverPrimitiveTrigger from './fragments/PopoverPrimitiveTrigger';
import PopoverPrimitiveAnchor from './fragments/PopoverPrimitiveAnchor';
import PopoverPrimitivePortal from './fragments/PopoverPrimitivePortal';
import PopoverPrimitiveContent from './fragments/PopoverPrimitiveContent';
import PopoverPrimitiveClose from './fragments/PopoverPrimitiveClose';
import PopoverPrimitiveArrow from './fragments/PopoverPrimitiveArrow';

const PopoverPrimitive = {
    Root: PopoverPrimitiveRoot,
    Trigger: PopoverPrimitiveTrigger,
    Anchor: PopoverPrimitiveAnchor,
    Portal: PopoverPrimitivePortal,
    Content: PopoverPrimitiveContent,
    Close: PopoverPrimitiveClose,
    Arrow: PopoverPrimitiveArrow
};

export default PopoverPrimitive;
