import CopyPrimitiveRoot from './fragments/CopyPrimitiveRoot';
import CopyTrigger from './fragments/CopyPrimitiveTrigger';
import CopyFeedback from './fragments/CopyPrimitiveFeedback';

const CopyPrimitive = {
    Root: CopyPrimitiveRoot,
    Trigger: CopyTrigger,
    Feedback: CopyFeedback
} as const;

export default CopyPrimitive;
