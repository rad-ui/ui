import Callout from '@radui/ui/Callout';
import Text from "@radui/ui/Text";
import Separator from '@radui/ui/Separator';

import { BookmarkIcon } from '../docs/codeUsage';
import TooltipWrapper from '@/components/ui/Tooltip';

const CalloutVariants = () => {
  const calloutVariants = ['soft', 'outline'];
  const calloutStyleDescription = {
    soft: 'Soft callout have a soft background color and a border.',
    outline: 'Outline callout have a border and a background color.',
  };

  return (
    <div>
      <div className="flex items-center gap-4">
        {calloutVariants.map((variant) => (
          <span key={variant}>
            <Callout variant={variant} className="space-x-2">
                <BookmarkIcon />
                <Text className="font-bold">Error</Text>
                <Text>Something went wrong. Please try again later.</Text>
            </Callout>
            <Separator orientation="horizontal" style={{ marginTop: 20 }} />
            <TooltipWrapper label={calloutStyleDescription[variant]} placement="bottom">
              <Text className="text-gray-800 font-light inline-block cursor-help">
                {variant}
              </Text>
            </TooltipWrapper>
          </span>
        ))}
      </div>
    </div>
  );
};

export default CalloutVariants;