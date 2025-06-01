'use client';

import DialogPrimitiveRoot from './fragments/DialogPrimitiveRoot';
import DialogPrimitiveAction from './fragments/DialogPrimitiveAction';
import DialogPrimitiveCancel from './fragments/DialogPrimitiveCancel';
import DialogPrimitiveContent from './fragments/DialogPrimitiveContent';
import DialogPrimitiveTrigger from './fragments/DialogPrimitiveTrigger';
import DialogPrimitiveOverlay from './fragments/DialogPrimitiveOverlay';
import DialogPrimitivePortal from './fragments/DialogPrimitivePortal';

const DialogPrimitive = {
    Root: DialogPrimitiveRoot,
    Action: DialogPrimitiveAction,
    Cancel: DialogPrimitiveCancel,
    Content: DialogPrimitiveContent,
    Trigger: DialogPrimitiveTrigger,
    Overlay: DialogPrimitiveOverlay,
    Portal: DialogPrimitivePortal
};

export default DialogPrimitive;
