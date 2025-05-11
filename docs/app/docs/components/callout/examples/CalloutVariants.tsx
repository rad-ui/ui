"use client";
import Callout from '@radui/ui/Callout';
import Text from "@radui/ui/Text";
import Separator from '@radui/ui/Separator';

import { BookmarkIcon } from './CalloutExample';
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
        {calloutVariants.map((variant,idx) => {
          console.log(variant);
          return <span key={idx}>
            <Callout.Root variant={variant} color="red">
              <Callout.Icon>
                <BookmarkIcon />
              </Callout.Icon>
              <Callout.Text>
                Seems like there's been an error. Please try again.
              </Callout.Text>
            </Callout.Root>
            <Separator orientation="horizontal" style={{ marginTop: 20 }} />
            <TooltipWrapper label={calloutStyleDescription[variant]} placement="bottom">
              <Text className="text-gray-800 font-light inline-block cursor-help">
                {variant}
              </Text>
            </TooltipWrapper>
          </span>
        })}
      </div>
    </div>
  );
};

export default CalloutVariants;