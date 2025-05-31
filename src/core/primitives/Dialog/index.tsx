'use client';

import DialogPrimitiveRoot from './fragments/DialogPrimitiveRoot';
import DialogPrimitiveAction from './fragments/DialogPrimitiveAction';
import DialogPrimitiveCancel from './fragments/DialogPrimitiveCancel';
import DialogPrimitiveContent from './fragments/DialogPrimitiveContent';
import DialogPrimitiveTrigger from './fragments/DialogPrimitiveTrigger';
import DialogPrimitiveOverlay from './fragments/DialogPrimitiveOverlay';

const DialogPrimitive = {
    Root: DialogPrimitiveRoot,
    Action: DialogPrimitiveAction,
    Cancel: DialogPrimitiveCancel,
    Content: DialogPrimitiveContent,
    Trigger: DialogPrimitiveTrigger,
    Overlay: DialogPrimitiveOverlay
};

export default DialogPrimitive;
